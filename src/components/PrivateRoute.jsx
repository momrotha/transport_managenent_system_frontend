import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const PrivateRoute = ({ children, allowedUserType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedUserType && user.user_type !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
