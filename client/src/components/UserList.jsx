import React, { useEffect, useState } from "react";
import api from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users"); // you need a backend route for this
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.fullname} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
