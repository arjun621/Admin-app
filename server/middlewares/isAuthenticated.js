const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    if(!req.cookies.token) {
        return res.status(401).json({message: "You need to login first!"})
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    }
    catch(err) {
        return res.status(401).json({ message: "Invalid token. Please login again."});
    }
}