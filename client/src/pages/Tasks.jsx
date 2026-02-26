import React from "react";

const Tasks = () => {
  const tasks = [
    { title: "Fix login bug", status: "Pending" },
    { title: "Update dashboard UI", status: "Completed" },
    { title: "Deploy backend", status: "In Progress" },
  ];

  const getStatusColor = (status) => {
    if (status === "Completed") return "#16a34a";
    if (status === "Pending") return "#eab308";
    return "#2563eb";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task Management</h2>

      <div style={styles.card}>
        {tasks.map((task, index) => (
          <div key={index} style={styles.taskRow}>
            <span>{task.title}</span>
            <span
              style={{
                ...styles.badge,
                backgroundColor: getStatusColor(task.status),
              }}
            >
              {task.status}
            </span>
          </div>
        ))}
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
  taskRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #2a2a2a",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#fff",
  },
};

export default Tasks;