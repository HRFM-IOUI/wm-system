// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) {
    return <div className="text-center mt-20 text-white">認証確認中...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;