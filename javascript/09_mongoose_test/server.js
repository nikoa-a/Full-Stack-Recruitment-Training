const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
    "/?retryWrites=true&w=majority&appName=fullstack25";

mongoose.connect(url).then (
    () => console.log("Connected to Mongodb"),
    (error) => console.log("Failed to connect to Mongodb. Error:", error)
)

app.listen(3000);

console.log("Running in port 3000");