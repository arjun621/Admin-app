import React from "react";

const Analytics = () => {
  const stats = [
    { title: "Total Users", value: 124 },
    { title: "Active Users", value: 38 },
    { title: "Tasks Completed", value: 542 },
    { title: "Reports Generated", value: 87 },
  ];

  const activities = [
    "New user registered",
    "Admin updated permissions",
    "Report downloaded",
    "System settings changed",
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Analytics Dashboard</h2>

      <div style={styles.grid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.label}>{stat.title}</p>
            <h3>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: "15px" }}>Recent Activity</h3>
        <ul>
          {activities.map((item, index) => (
            <li key={index} style={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
  },
  label: { color: "#9ca3af", marginBottom: "10px" },
  listItem: {
    marginBottom: "10px",
    color: "#d4d4d4",
  },
};

export default Analytics;