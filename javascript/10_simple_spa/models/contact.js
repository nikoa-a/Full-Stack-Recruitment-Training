const mongoose = require("mongoose");

let schema = mongoose.Schema({
    name: String,
    lastName:{type: String, index: true},
    email:String,
    phone:String
})

module.exports = mongoose.model("Contact", schema);