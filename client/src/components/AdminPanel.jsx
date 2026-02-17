import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminPanel = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      onLogout();
    } catch (err) {
      alert("Logout failed");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/admin/create-user", {
        fullname,
        email,
        password
      });

      setMessage(res.data.message);
      setFullname("");
      setEmail("");
      setPassword("");
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

      <h2>Create User</h2>

      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Create User</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <hr />

      <h2>Existing Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.fullname} - {u.email} - {u.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
