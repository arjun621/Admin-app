const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ "admin", "user" ],
        default: "user"
    },
    picture: {
        type: String,
        default: ""
    },
    permissions: { 
        type: [String], 
        default: [] 
    }
})

module.exports = mongoose.model("User", userSchema);