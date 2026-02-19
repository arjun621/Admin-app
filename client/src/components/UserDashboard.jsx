import Navbar from "./Navbar";

const UserDashboard = ({ onLogout, user, setUser }) => {
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
      color: "#e5e5e5",
      padding: "40px"
    },
    content: {
      paddingTop: "20px",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.page}>
      {/* Navbar with profile pic, upload/remove, logout */}
      <Navbar user={user} setUser={setUser} onLogout={onLogout} title="User Dashboard" />

      <div style={styles.content}>
        <h2>Welcome! You are logged in as a user.</h2>
      </div>
    </div>
  );
};

export default UserDashboard;
