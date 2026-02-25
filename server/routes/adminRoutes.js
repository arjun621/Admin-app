const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const { createUser,permission, getUser } = require("../controllers/adminController");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/users", isAuthenticated, isAdmin, getUser);

router.post("/create-user", isAuthenticated, isAdmin, createUser);

router.put("/users/:id/permissions", isAuthenticated, isAdmin, permission);


module.exports = router;
