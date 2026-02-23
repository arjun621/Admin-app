import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";
import api from "./services/api";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";


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

  const handleLogin = async (loggedInUser) => {
    try {
      // Fetch latest user info from backend
      const meRes = await api.get("/auth/me");
      setUser(meRes.data.user);
      setSetupRequired(false);
    } catch (err) {
      console.error(err);
      setUser(loggedInUser); // fallback
    }
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
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPanel
                  onLogout={handleLogout}
                  user={user}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              user?.role === "user" ? (
                <UserDashboard
                  onLogout={handleLogout}
                  user={user}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </>
      )}

      <Route
        path="/page1"
        element={
          user?.role === "admin" || user?.permissions.includes("Page1")
            ? <Page1 />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/page2"
        element={
          user?.role === "admin" || user?.permissions.includes("Page2")
            ? <Page2 />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/page3"
        element={
          user?.role === "admin" || user?.permissions.includes("Page3")
            ? <Page3 />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/page4"
        element={
          user?.role === "admin" || user?.permissions.includes("Page4")
            ? <Page4 />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/page5"
        element={
          user?.role === "admin" || user?.permissions.includes("Page5")
            ? <Page5 />
            : <Navigate to="/" />
        }
      />

    </Routes>
  );
}

export default App;
