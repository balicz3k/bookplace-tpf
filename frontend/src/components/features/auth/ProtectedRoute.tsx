import React from 'react';
import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  return <Outlet />;
};

export default ProtectedRoute;

