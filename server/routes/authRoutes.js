const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")
const upload = require("../middlewares/upload");


const { registerUser, loginUser, logoutUser, getMe, checkSetup, setPfp, deletePfp } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/setup", checkSetup);
router.get("/me", isAuthenticated, getMe);
router.put("/profile-picture", isAuthenticated, upload.single("picture"), setPfp);
router.delete("/profile-picture", isAuthenticated, deletePfp);


module.exports = router;
