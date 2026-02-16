const mongoose = require("mongoose");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");


mongoose.connect(`${process.env.MONGODB_URI}/admin-app`)
.then(function() {
    console.log("Mongo connected");
})
.catch(function(err) {
    dbgr(err);
})  

module.exports = mongoose.connection;