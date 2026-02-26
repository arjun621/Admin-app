const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/mongoose-connection");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Profile picture must be under 10 MB" });
  }

  if (err.message && err.message.includes("Only images allowed")) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
