import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  return !user?.uid ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default RequireAuth;
