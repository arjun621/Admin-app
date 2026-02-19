import { useState, useEffect } from "react";
import api from "../services/api";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";
import Navbar from "./Navbar";

const AdminPanel = ({ onLogout, user, setUser }) => {
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
      background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
      color: "#e5e5e5",
      padding: "40px"
    },
    card: {
      background: "#1c1c1c",
      padding: "25px",
      borderRadius: "12px",
      marginBottom: "30px",
      border: "1px solid #2a2a2a"
    }
  };

  return (
    <div style={styles.page}>
      <Navbar
        user={user}
        setUser={setUser}
        onLogout={onLogout}
        title="Admin Dashboard"
      />

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
  );
};

export default AdminPanel;
