export type HostBookingStatus = 'upcoming' | 'past' | 'canceled';

export interface HostBooking {
  id: string;
  offerId: string;
  offerTitle: string;
  offerThumbnailUrl?: string;
  guestName: string;
  guestEmail: string;
  guestProfilePictureUrl?: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: HostBookingStatus;
  guestsCount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

export interface HostBookingFilters {
  status: 'all' | HostBookingStatus;
  sortBy: 'date' | 'price';
  sortOrder: 'asc' | 'desc';
}
