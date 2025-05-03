import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect students to their dedicated view
  if (currentUser.role === 'student') {
    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;