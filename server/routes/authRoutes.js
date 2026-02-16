const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")

const { registerUser, loginUser, logoutUser,getMe } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, getMe);

module.exports = router;
