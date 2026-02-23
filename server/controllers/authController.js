const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.checkSetup = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    res.json({ setupRequired: userCount === 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};  

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userCount = await userModel.countDocuments();

    if (userCount > 0) {
      return res.status(403).json({
        message: "Registration closed. Only admin can create users."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: "admin"
    });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = req.user.toObject();

    if (user.picture) {
      user.picture = `http://localhost:5000${user.picture}`;
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
