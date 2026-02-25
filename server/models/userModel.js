const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
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