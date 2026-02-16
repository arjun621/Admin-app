const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const { createUser } = require("../controllers/adminController");

router.get("/test", isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: "Admin route is working!" });
});

router.post("/create-user", isAuthenticated, isAdmin, createUser);

module.exports = router;
