import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return auth?.currentUser !== null ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
