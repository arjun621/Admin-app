import { useState } from "react";

const CreateUserForm = ({ onCreate, message, error }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({ fullname, email, password, role });

    // Reset fields
    setFullname("");
    setEmail("");
    setPassword("");
    setRole("user");
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          maxLength={30}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          // required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          maxLength={30}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        <br /><br />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br /><br />

        <button type="submit">Create User</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateUserForm;
