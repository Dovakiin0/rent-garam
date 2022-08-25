import React from "react";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const auth = useAuth();

  return (
    <ProtectedRoute>
      {auth?.currentUser?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </ProtectedRoute>
  );
}

export default Dashboard;
