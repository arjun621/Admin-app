const { message } = require("statuses");
const userModel = require("../models/userModel");

module.exports = (req, res, next) => {

    try {

        if(req.user.role === "admin"){
            next();
        } else {
            return res.status(403).json({ message: "Forbidden: Admin only"});
        }
       
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Server error"});
    }
}