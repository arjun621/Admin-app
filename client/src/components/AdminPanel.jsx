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

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <CreateUserForm
        onCreate={handleCreateUser}
        message={message}
        error={error}
      />

      <hr />

      <UserList users={users} />
    </div>
  );
};

export default AdminPanel;
