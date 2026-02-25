import { useState, useEffect } from "react";
import api from "../services/api";
import CreateUserForm from "./CreateUserForm";
import Navbar from "./Navbar";

const pages = ["Analytics","Setting","Reports","Profile","Tasks"];

const AdminPanel = ({ onLogout, user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    setMessage("");
    setError("");
    try {
      const res = await api.post("/admin/create-user", userData);
      setMessage(res.data.message);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating user");
    }
  };

  const handleTogglePermission = async (userId, page, currentPermissions) => {
    let updatedPermissions;

    if (currentPermissions.includes(page)) {
      updatedPermissions = currentPermissions.filter((p) => p !== page);
    } else {
      updatedPermissions = [...currentPermissions, page];
    }

    try {
      await api.put(`/admin/users/${userId}/permissions`, {
        permissions: updatedPermissions,
      });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      background: "#0d0d0d", // main background
      color: "#e6e6e6",
    },

    sidebar: {
      width: "240px",
      background: "#141414", // slightly lighter than main
      padding: "25px",
      borderRight: "1px solid #1f1f1f",
    },

    sidebarItem: (active) => ({
      padding: "12px 16px",
      marginBottom: "12px",
      borderRadius: "8px",
      cursor: "pointer",
      background: active ? "#1f1f1f" : "transparent",
      border: active ? "1px solid #2a2a2a" : "1px solid transparent",
      transition: "all 0.2s ease",
    }),

    main: {
      flex: 1,
      padding: "40px",
      background: "#0d0d0d",
    },

    card: {
      background: "#171717",
      padding: "25px",
      borderRadius: "14px",
      marginBottom: "25px",
      border: "1px solid #242424",
    },

    userBox: {
      background: "#111111",
      padding: "18px",
      borderRadius: "12px",
      marginBottom: "15px",
      border: "1px solid #222222",
    },

    toggleRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "12px",
    },
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "30px" }}>Admin</h2>

        <div
          style={styles.sidebarItem(activeSection === "dashboard")}
          onClick={() => setActiveSection("dashboard")}
        >
          Dashboard
        </div>

        <div
          style={styles.sidebarItem(activeSection === "create")}
          onClick={() => setActiveSection("create")}
        >
          Create User
        </div>

        <div
          style={styles.sidebarItem(activeSection === "users")}
          onClick={() => setActiveSection("users")}
        >
          Manage Users
        </div>

        
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <Navbar
          user={user}
          setUser={setUser}
          onLogout={onLogout}
          title="Admin Dashboard"
        />

        {/* Dashboard Overview */}
        {activeSection === "dashboard" && (
          <div style={styles.card}>
            <h2>Overview</h2>
            <p>Total Users: {users.length}</p>
            <p>
              Total Admins:{" "}
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
        )}

        {/* Create User */}
        {activeSection === "create" && (
          <div style={styles.card}>
            <h2>Create New User</h2>
            <CreateUserForm
              onCreate={handleCreateUser}
              message={message}
              error={error}
            />
          </div>
        )}

        {/* Manage Users */}
        {activeSection === "users" && (
          <div style={styles.card}>
            <h2>User Permissions</h2>

            {users.map((u) => (
              <div key={u._id} style={styles.userBox}>
                <strong>
                  {u.fullname} ({u.role})
                </strong>

                {u.role !== "admin" && (
                  <div style={styles.toggleRow}>
                    {pages.map((page) => (
                      <label key={page}>
                        <input
                          type="checkbox"
                          checked={u.permissions.includes(page)}
                          onChange={() =>
                            handleTogglePermission(
                              u._id,
                              page,
                              u.permissions
                            )
                          }
                        />
                        {" "}{page}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;