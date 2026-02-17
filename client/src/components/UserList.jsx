const UserList = ({ users }) => {
  return (
    <div>
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

export default UserList;
