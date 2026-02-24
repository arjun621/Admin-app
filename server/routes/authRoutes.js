const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")
const upload = require("../middlewares/upload");
const User = require("../models/userModel");

const { registerUser, loginUser, logoutUser, getMe, checkSetup } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/setup", checkSetup);
router.get("/me", isAuthenticated, getMe);


router.put("/profile-picture", isAuthenticated, upload.single("picture"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(req.user.id);

        user.picture = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({
            message: "Profile picture updated",
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}
);


router.delete("/profile-picture", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.picture = "";
        await user.save();

        res.json({
            message: "Profile picture removed",
            user
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
