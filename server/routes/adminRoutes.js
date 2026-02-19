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

router.post("/create-user", isAuthenticated, isAdmin, createUser);

module.exports = router;
