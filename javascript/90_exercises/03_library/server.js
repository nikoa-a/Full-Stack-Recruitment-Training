const express = require("express");
const mongoose = require("mongoose");
const bookModel = require("./models/book");

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
    "/jsbooks?retryWrites=true&w=majority&appName=fullstack25";

mongoose.connect(url).then (
    () => console.log("Connected to Mongodb"),
    (error) => console.log("Failed to connect to Mongodb. Error:", error)
);

app.get("/api/loan", function(req, res) {
    bookModel.find({"loaned": false}).then(function(books) {
        return res.status(200).json(books);
    }).catch(function(err) {
        console.log("Failed to find books. Error:", err);
        return res.status(500).json({"Message:": "Internal Server Error"});
    })
});

app.get("/api/books", function(req, res) {
    bookModel.find().then(function(books) {
        return res.status(200).json(books);
    }).catch(function(err) {
        console.log("Failed to find books. Error:", err);
        return res.status(500).json({"Message:": "Internal Server Error"});
    })
});

app.put("/api/books/:id", function(req, res) {
    // Yet to do
    bookModel.replaceOne({"_id": req.params.id}, book).then(function() {
        return res.status(200).json({"Message": "Success"});
    }).catch(function(err) {
        console.log("Failed to update book. Error:", err);
        return res.status(500).json({"Message:":"Internal Server Error"});
    })
});

app.listen(3000);

console.log("Running in port 3000");