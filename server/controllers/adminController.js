const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");

module.exports.getUser = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.json({ users });
}

module.exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (fullname.trim().length > 30) {
      return res.status(400).json({
        message: "Fullname must be under 30 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const allowedRoles = ["admin", "user"];

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: allowedRoles.includes(role) ? role : "user"
    });

    await sendMail(
      user.email,
      "Welcome to Dashboard",
      `Hello ${user.fullname},

Your account has been created by admin.

Email: ${user.email}
Password: ${password}`
    );

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.permission = async (req, res) => {
  try {
    const { permissions } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).select("-password");

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}



