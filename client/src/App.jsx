import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";
import api from "./services/api";
import Page1 from "./pages/Reports";
import Page2 from "./pages/Analytics";
import Page3 from "./pages/Settings";
import Page4 from "./pages/Tasks";
import Page5 from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";


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
    toast.success("Logout Successfull", { duration: 3000 })
  };

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
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
          path="/Reports"
          element={
            user?.role === "admin" || user?.permissions.includes("Reports")
              ? <Page1 />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/Analytics"
          element={
            user?.role === "admin" || user?.permissions.includes("Analytics")
              ? <Page2 />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/Settings"
          element={
            user?.role === "admin" || user?.permissions.includes("Settings")
              ? <Page3 />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/Tasks"
          element={
            user?.role === "admin" || user?.permissions.includes("Tasks")
              ? <Page4 />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/Profile"
          element={
            user?.role === "admin" || user?.permissions.includes("Profile")
              ? <Page5 />
              : <Navigate to="/" />
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          path="*"
          element={
            user ? <NotFound /> : <Navigate to="/" />
          }
        />

      </Routes>

      <Toaster position="top-right" reverseOrder={false} />

    </>
  );
}

export default App;
