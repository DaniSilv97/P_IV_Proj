import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Only accessible if user is logged in
export function ProtectedRoute({ children }) {
  const { user, checkedSession } = useAuth();

  if (!checkedSession) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node
};

// Only accessible if user is NOT logged in
export function PublicRoute({ children }) {
  const { user, checkedSession } = useAuth();

  if (!checkedSession) {
    return <div>Loading...</div>;
  }

  return !user ? children : <Navigate to="/" replace />;
}
PublicRoute.propTypes = {
  children: PropTypes.node
};

// Open to all users, no restrictions
export function OpenRoute({ children }) {
  return children;
}
OpenRoute.propTypes = {
  children: PropTypes.node
};




