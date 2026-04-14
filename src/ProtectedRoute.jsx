import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    return <Navigate to="/" />; // lo manda al login
  }

  return children;
}

export default ProtectedRoute;