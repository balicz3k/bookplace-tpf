import { useState, useMemo } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { HostBooking, HostBookingFilters } from '../../models/HostModels';

import HostBookingFiltersComponent from "../../components/features/host/HostBookingFilters";
import HostBookingListItem from "../../components/features/host/HostBookingListItem";
import PaginationControls from "../../components/common/PaginationControls";

const OFFER_IMAGE_1 = new URL('../../assets/mockPhotos/offers/offer1/offer1_photo_0_1764289814_thumb.jpg', import.meta.url).href;
const OFFER_IMAGE_2 = new URL('../../assets/mockPhotos/offers/offer2/offer2_photo_0_1764289906_thumb.jpg', import.meta.url).href;

const MOCK_BOOKINGS: HostBooking[] = [
    {
        id: '1',
        offerId: '101',
        offerTitle: 'Wiślane tarasy luxury',
        offerThumbnailUrl: OFFER_IMAGE_1,
        guestName: 'Mark Johnson',
        guestEmail: 'mark@example.com',
        guestProfilePictureUrl: undefined,
        checkInDate: '2026-10-12',
        checkOutDate: '2026-10-15',
        totalPrice: 1500,
        status: 'upcoming',
        guestsCount: 2,
        paymentStatus: 'paid',
        createdAt: '2026-05-01',
    },
    {
        id: '2',
        offerId: '102',
        offerTitle: 'Cozy Studio Old Town',
        offerThumbnailUrl: OFFER_IMAGE_2,
        guestName: 'Sarah Connor',
        guestEmail: 'sarah@sky.net',
        guestProfilePictureUrl: undefined,
        checkInDate: '2026-09-20',
        checkOutDate: '2026-09-22',
        totalPrice: 800,
        status: 'past', // Na screenie jest "Completed" (mapowane na past)
        guestsCount: 1,
        paymentStatus: 'paid',
        createdAt: '2026-04-15',
    }
];

const PAGE_SIZE = 6;

export default function HostBookingsPage() {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);

    const [filters, setFilters] = useState<HostBookingFilters>({
        status: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
    });

    // --- LOGIKA FILTROWANIA I PAGINACJI ---
    const filteredBookings = useMemo(() => {
        let result = [...MOCK_BOOKINGS];

        if (filters.status !== 'all') {
            result = result.filter((b) => b.status === filters.status);
        }

        result.sort((a, b) => {
            const dateA = new Date(a.checkInDate).getTime();
            const dateB = new Date(b.checkInDate).getTime();
            return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return result;
    }, [filters]);

    const totalPages = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE));
    const paginatedBookings = useMemo(
        () => filteredBookings.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE),
        [filteredBookings, pageNumber],
    );

    const handleStatusChange = (_event: any, newStatus: string | null) => {
        if (newStatus !== null) {
            setFilters((prev) => ({ ...prev, status: newStatus as HostBookingFilters['status'] }));
            setPageNumber(1);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}>
            {/* Nagłówek zgodnie ze screenem */}
            <Box sx={{ mt: 5, mb: 3 }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, fontSize: "2.2rem", color: '#1a1a1a', mb: 0.5 }}
                >
                    Bookings
                </Typography>
                <Typography
                    sx={{ fontWeight: 400, fontSize: "1.1rem", color: 'text.secondary', mb: 3 }}>
                    List of bookings for your offers
                </Typography>
            </Box>
            
            {/* Filtry (Przyciski: All, Upcoming, Past, Canceled) */}
            <Box sx={{ mb: 4 }}>
                <HostBookingFiltersComponent
                    filters={filters}
                    onStatusChange={handleStatusChange}
                />
            </Box>

            {filteredBookings.length === 0 ? (
                <Alert severity="info" sx={{ borderRadius: 3 }}>
                    No bookings found in this category.
                </Alert>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Mapowanie elementów listy */}
                    {paginatedBookings.map((booking) => (
                        <Box 
                            key={booking.id}
                            sx={{
                                background: '#fff',
                                borderRadius: '16px',
                                border: '1px solid #edf2f7',
                                transition: '0.2s',
                                '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
                            }}
                        >
                            <HostBookingListItem
                                booking={booking}
                                navigate={navigate}
                            />
                        </Box>
                    ))}

                    {/* Informacja o liczbie wyników i paginacja */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing {(paginatedBookings.length === 0 ? 0 : (pageNumber - 1) * PAGE_SIZE + 1)} - {Math.min(pageNumber * PAGE_SIZE, filteredBookings.length)} of {filteredBookings.length} results
                        </Typography>
                        <PaginationControls
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            isLoading={false}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

