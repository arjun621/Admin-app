import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

const Register = ({ onRegister }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        fullname,
        email,
        password
      });

      onRegister(res.data.user);
      toast.success("Registeration successfull", { duration: 3000 })

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registeration failed",
        {
          id: "registeration-error",   
          duration: 3000,
        }
      );
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={titleStyle}>Create Admin Account</h2>

        <input
          style={inputStyle}
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={e => setFullname(e.target.value)}
          // required
        />

        <input
          style={inputStyle}
          type="Text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          // required
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          // required
        />

        <button style={buttonStyle} type="submit">
          Create Admin
        </button>
      </form>
    </div>
  );
};

/* -------- Styles -------- */

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#242424"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "30px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "320px",
  //   backgroundColor: "#444",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "10px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Register;
