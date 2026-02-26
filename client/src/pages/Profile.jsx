import React from "react";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      <div style={styles.card}>
        <p><strong>Name:</strong> Arjun Parashar</p>
        <p><strong>Email:</strong> arjun@example.com</p>
        <p><strong>Role:</strong> Admin</p>
        <p><strong>Member Since:</strong> Jan 2026</p>
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
  heading: { marginBottom: "30px" },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
  },
};

export default Profile;