import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ga from './utils/ga';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/features/auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import OfferPage from './pages/OfferPage';
import BookingCheckoutPage from './pages/booking/BookingCheckoutPage';
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailsPage from './pages/booking/BookingDetailsPage';
import HostDashboardPage from './pages/host/HostDashboardPage';
import HostBookingsPage from './pages/host/HostBookingsPage';
import HostCalendarPage from './pages/host/HostCalendarPage';
import HostOffersPage from './pages/host/HostOffersPage';
import HostInboxPage from './pages/host/HostInboxPage';
import AddOfferPage from './pages/host/AddOfferPage';
import HeaderHostNavigation from './components/common/header/HeaderHostNavigation';
import InboxPage from './pages/InboxPage';
import AnalyticsListener from './components/AnalyticsListener';

export default function App() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
    if (measurementId) {
      ga.initialize(measurementId);
    }
  }, []);

  return (
    <>
      <AnalyticsListener />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout showSearch={true}>
              <SearchPage />
            </MainLayout>
          }
        />
        <Route
          path="/offer/:offerId"
          element={
            <MainLayout showSearch={true}>
              <OfferPage />
            </MainLayout>
          }
        />
        <Route
          path="/booking/checkout"
          element={
            <MainLayout>
              <BookingCheckoutPage />
            </MainLayout>
          }
        />
        <Route
          path="/booking/confirmation"
          element={
            <MainLayout>
              <BookingConfirmationPage />
            </MainLayout>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <MainLayout>
              <MyBookingsPage />
            </MainLayout>
          }
        />
        <Route
          path="/my-bookings/:bookingId"
          element={
            <MainLayout>
              <BookingDetailsPage />
            </MainLayout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/inbox"
            element={
              <MainLayout>
                <InboxPage />
              </MainLayout>
            }
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Host']} />}>
          <Route
            path="/host/dashboard"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <HostDashboardPage />
              </MainLayout>
            }
          />
          <Route
            path="/host/bookings"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <HostBookingsPage />
              </MainLayout>
            }
          />
          <Route
            path="/host/calendar"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <HostCalendarPage />
              </MainLayout>
            }
          />
          <Route
            path="/host/offers"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <HostOffersPage />
              </MainLayout>
            }
          />
          <Route
            path="/host/offers/add"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <AddOfferPage />
              </MainLayout>
            }
          />
          <Route
            path="/host/inbox"
            element={
              <MainLayout centerContent={<HeaderHostNavigation />}>
                <HostInboxPage />
              </MainLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
