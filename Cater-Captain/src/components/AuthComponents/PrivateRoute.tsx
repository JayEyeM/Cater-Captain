import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  element: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { user } = useAuth();
  return user ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
