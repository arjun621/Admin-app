import React, { useState } from "react";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";

const AdminPanel = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Hide Create User Form" : "Create User"}
      </button>
      {showCreateForm && <CreateUserForm />}
      <hr />
      <UserList />
    </div>
  );
};

export default AdminPanel;
