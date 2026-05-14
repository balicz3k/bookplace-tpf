import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((role) => role.toUpperCase());
    const hasRequiredRole = user.roles.some((role) =>
      normalizedAllowed.includes(role.toUpperCase()),
    );
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
