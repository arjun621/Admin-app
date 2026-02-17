import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";
import api from "./services/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login on refresh
  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          !user ? (
            <Login onLogin={handleLogin} />
          ) : user.role === "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          user?.role === "admin"
            ? <AdminPanel onLogout={handleLogout} />
            : <Navigate to="/" />
        }
      />

      {/* NORMAL USER */}
      <Route
        path="/dashboard"
        element={
          user && user.role === "user"
            ? <UserDashboard onLogout={handleLogout} />
            : <Navigate to="/" />
        }
      />
    </Routes>

  );
}

export default App;
