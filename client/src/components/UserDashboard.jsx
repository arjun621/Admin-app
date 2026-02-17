import React from "react";
import api from "../services/api";

const UserDashboard = ({ onLogout }) => {

  const handleLogout = async () => {
    await api.post("/auth/logout");
    onLogout();
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>User Dashboard</h1>
      <p>Welcome! You are logged in as a normal user.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
