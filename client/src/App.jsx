import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import api from "./services/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="centered">
        <Routes>
          <Route
            path="/"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/admin" />}
          />
          <Route
            path="/admin"
            element={user?.role === "admin" ? <AdminPanel onLogout={handleLogout} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
