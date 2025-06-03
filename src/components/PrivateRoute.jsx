import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const PrivateRoute = ({ children, allowedUserType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a more sophisticated loading spinner
  }

  if (!user) {
    // Not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  if (allowedUserType && user.user_type !== allowedUserType) {
    // Authenticated but wrong user type, redirect to a generic unauthorized page or login
    // For simplicity, we'll redirect to login here
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
