const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const { createUser } = require("../controllers/adminController");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/test", isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: "Admin route is working!" });
});

router.get("/users", isAuthenticated, isAdmin, async (req, res) => {
  const users = await userModel.find().select("-password");
  res.json({ users });
});

router.post("/create-user", isAuthenticated, isAdmin, async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await userModel.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({ fullname, email, password: hashed, role: "user" });

  res.status(201).json({ message: "User created successfully", user: newUser });
});

router.post("/create-user", isAuthenticated, isAdmin, createUser);

module.exports = router;
