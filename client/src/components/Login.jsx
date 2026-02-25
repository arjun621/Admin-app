import React, { useState } from "react";
import api from "../services/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      onLogin(res.data.user);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          // required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          // required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "300px"
};

export default Login;
