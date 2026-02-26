import React from "react";

const Reports = () => {
  const reports = [
    { name: "User Activity Report", date: "26 Feb 2026" },
    { name: "System Logs Report", date: "25 Feb 2026" },
    { name: "Monthly Performance", date: "20 Feb 2026" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reports</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Report Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td style={styles.td}>{report.name}</td>
                <td style={styles.td}>{report.date}</td>
                <td style={styles.td}>
                  <button style={styles.button}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #2a2a2a",
    color: "#9ca3af",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #2a2a2a",
  },
  button: {
    backgroundColor: "#2563eb",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Reports;