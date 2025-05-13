const mongoose = require("mongoose");

let schema = mongoose.Schema({
    name: String,
    author: String,
    year: Number,
    genre: String,
    loaned: Boolean
})

module.exports = mongoose.model("Book", schema);