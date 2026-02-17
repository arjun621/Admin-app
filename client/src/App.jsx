import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";
import api from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [setupRequired, setSetupRequired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const setupRes = await api.get("/auth/setup");
        setSetupRequired(setupRes.data.setupRequired);

        if (!setupRes.data.setupRequired) {
          try {
            const meRes = await api.get("/auth/me");
            setUser(meRes.data.user);
          } catch {
            setUser(null);
          }
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkSetup();
  }, []);

  const handleLogin = (loggedInUser) => {
  setUser(loggedInUser);
  setSetupRequired(false);   // ← ADD THIS
};


  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>

      {/* SETUP MODE */}
      {setupRequired && (
        <Route
          path="*"
          element={<Register onRegister={handleLogin} />}
        />
      )}

      {/* NORMAL MODE */}
      {!setupRequired && (
        <>
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

          <Route
            path="/admin"
            element={
              user?.role === "admin"
                ? <AdminPanel onLogout={handleLogout} />
                : <Navigate to="/" />
            }
          />

          <Route
            path="/dashboard"
            element={
              user?.role === "user"
                ? <UserDashboard onLogout={handleLogout} />
                : <Navigate to="/" />
            }
          />
        </>
      )}

    </Routes>
  );
}

export default App;
