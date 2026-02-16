import React, { useState } from "react";
import api from "../services/api";

const CreateUserForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/create-user", { fullname, email, password });
      alert(res.data.message);
      setFullname(""); setEmail(""); setPassword("");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Full Name"
        value={fullname}
        onChange={e => setFullname(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
