import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner size='large' />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to='/login' state={location?.pathname} replace />;
};

export default PrivateRoute;
