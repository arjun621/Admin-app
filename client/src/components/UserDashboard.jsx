import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const allPages = [
  { name: "Page1", path: "/page1" },
  { name: "Page2", path: "/page2" },
  { name: "Page3", path: "/page3" },
  { name: "Page4", path: "/page4" },
  { name: "Page5", path: "/page5" },
];

const UserDashboard = ({ user, setUser, onLogout }) => {
  const navigate = useNavigate();

  // Admin sees all pages
  const allowedPages =
    user.role === "admin"
      ? allPages
      : allPages.filter((p) => user.permissions.includes(p.name));

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
      color: "#e5e5e5",
      padding: "40px",
    },
    buttonContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "40px",
    },
    button: {
      padding: "15px 30px",
      background: "#1f1f1f",
      border: "1px solid #333",
      borderRadius: "10px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.2s",
    },
  };

  return (
    <div style={styles.page}>
      <Navbar
        user={user}
        setUser={setUser}
        onLogout={onLogout}
        title="User Dashboard"
      />

      <h2 style={{ marginTop: "30px" }}>Welcome, {user.fullname}</h2>

      {allowedPages.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#aaa" }}>
          You don't have access to any pages yet. Contact admin.
        </p>
      ) : (
        <div style={styles.buttonContainer}>
          {allowedPages.map((page) => (
            <button
              key={page.name}
              style={styles.button}
              onClick={() => navigate(page.path)}
              onMouseEnter={(e) =>
                (e.target.style.background = "#333")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "#1f1f1f")
              }
            >
              {page.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;