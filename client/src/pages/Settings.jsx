import React, { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Settings</h2>

      {/* Account Info */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Account Information</h3>

        <div style={styles.row}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            defaultValue="Arjun Parashar"
            style={styles.input}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            defaultValue="arjun@example.com"
            style={styles.input}
          />
        </div>

        <button style={styles.primaryBtn}>Save Changes</button>
      </div>

      {/* Password */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Change Password</h3>

        <div style={styles.row}>
          <label style={styles.label}>Current Password</label>
          <input type="password" style={styles.input} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>New Password</label>
          <input type="password" style={styles.input} />
        </div>

        <button style={styles.primaryBtn}>Update Password</button>
      </div>

      {/* Notifications */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Notifications</h3>

        <div style={styles.toggleRow}>
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div style={styles.toggleRow}>
          <span>Two-Factor Authentication</span>
          <input
            type="checkbox"
            checked={twoFactor}
            onChange={() => setTwoFactor(!twoFactor)}
          />
        </div>
      </div>

      {/* Appearance */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Appearance</h3>

        <div style={styles.toggleRow}>
          <span>Enable Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...styles.card, border: "1px solid #3a1a1a" }}>
        <h3 style={{ color: "#ff4d4f" }}>Danger Zone</h3>
        <button style={styles.dangerBtn}>Deactivate Account</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#0f0f0f",
    minHeight: "100vh",
    color: "#f5f5f5",
  },
  heading: {
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
    marginBottom: "25px",
  },
  cardTitle: {
    marginBottom: "15px",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#9ca3af",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #2e2e2e",
    backgroundColor: "#121212",
    color: "#f5f5f5",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  dangerBtn: {
    backgroundColor: "#b91c1c",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Settings;