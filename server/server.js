const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/mongoose-connection");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"],  
}));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
