import React from "react";
import api from "../services/api";

const AdminPanel = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      onLogout(); 
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>Logout</button>
    </div>
  );
};

export default AdminPanel;
