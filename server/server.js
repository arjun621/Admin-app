const express = require("express");
const db = require("./config/mongoose-connection");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.listen(5000, () => {
  console.log("Server running");
});





