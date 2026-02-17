import { useState, useEffect } from "react";
import api from "../services/api";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";

const AdminPanel = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
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

  const handleLogout = async () => {
    await api.post("/auth/logout");
    onLogout();
  };

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

  const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    fontFamily: "system-ui, sans-serif",
    color: "#e5e5e5"
  },
  container: {
    width: "100%",
    maxWidth: "1100px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#f5f5f5"
  },
  button: {
    padding: "10px 20px",
    background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)",
    border: "1px solid #3a3a3a",
    borderRadius: "8px",
    color: "#f1f1f1",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.6)"
  },
  card: {
    background: "linear-gradient(145deg, #1c1c1c, #141414)",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "30px",
    border: "1px solid #2a2a2a",
    boxShadow: "0 8px 25px rgba(0,0,0,0.7)"
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div style={styles.card}>
          <CreateUserForm
            onCreate={handleCreateUser}
            message={message}
            error={error}
          />
        </div>

        <div style={styles.card}>
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
