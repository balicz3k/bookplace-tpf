import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Button,
    CardMedia,
    Stack,
    useTheme
} from '@mui/material';
import { Edit, Visibility, Star, LocationOn } from '@mui/icons-material';
import type { HostOfferSummary } from '../../../models/OfferModels';

interface HostOfferCardProps {
    offer: HostOfferSummary;
    onEdit: (id: number) => void;
    onView: (id: number) => void;
    onReviews: (id: number) => void;
}


export default function HostOfferCard({ offer, onEdit, onView, onReviews }: HostOfferCardProps) {
    const theme = useTheme();
    const [randomRating] = React.useState(() => parseFloat((Math.random() * (5.0 - 3.0) + 3.0).toFixed(1)));

    const getImageUrl = () => {
        if (offer.coverPhoto?.thumbnailUrl) {
            return offer.coverPhoto.thumbnailUrl;
        }
        return 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E';
    };

    const isActive = offer.status === 'Active';

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={getImageUrl()}
                    alt={offer.title}
                    sx={{ objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Chip
                        label={offer.status}
                        size="small"
                        color={isActive ? 'success' : 'default'}
                        sx={{
                            fontWeight: 700,
                            bgcolor: isActive ? 'rgba(237, 247, 237, 0.9)' : 'rgba(245, 245, 245, 0.9)',
                            color: isActive ? 'success.main' : 'text.secondary',
                            backdropFilter: 'blur(4px)',
                        }}
                    />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 10, left: 10 }}>
                    <Chip
                        label={offer.offerType.name}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '0.7rem'
                        }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3, mr: 1 }}>
                        {offer.title}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ bgcolor: 'grey.100', borderRadius: 5, px: 1.25, py: 0.5, ml: 2 }}>
                        <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.75, fontWeight: 700 }}>
                            {randomRating.toFixed(1)}
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
                    <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary" noWrap>
                        {offer.fullAddress}
                    </Typography>
                </Stack>

                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800, mb: 2 }}>
                    ${offer.pricePerNight.toLocaleString('en-US')} <Typography component="span" variant="caption" color="text.secondary">/ night</Typography>
                </Typography>

                <Stack direction="row" spacing={1} mt="auto" flexWrap="wrap">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => onEdit(offer.id)}
                        startIcon={<Edit sx={{ fontSize: 16 }}/>}
                        sx={{
                            flex: 1,
                            borderRadius: 20,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                            minWidth: 'auto', 
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onView(offer.id)}
                        startIcon={<Visibility sx={{ fontSize: 16 }}/>}
                        sx={{
                            flex: 1,
                            borderRadius: 20,
                            textTransform: 'none',
                            fontWeight: 600,
                            minWidth: 'auto',
                        }}
                    >
                        View
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => onReviews(offer.id)}
                        startIcon={<Star sx={{ fontSize: 16 }}/>}
                        sx={{
                            flex: 1,
                            borderRadius: 20,
                            textTransform: 'none',
                            fontWeight: 600,
                            bgcolor: theme.palette.secondary.main, 
                            color: theme.palette.getContrastText(theme.palette.secondary.main), 
                            boxShadow: 'none',
                            minWidth: 'auto',
                            '&:hover': {
                                bgcolor: theme.palette.secondary.dark,
                            },
                        }}
                    >
                        Reviews
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}