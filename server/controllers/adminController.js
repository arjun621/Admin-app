const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
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
