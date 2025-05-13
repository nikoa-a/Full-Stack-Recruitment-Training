const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("./models/contact");

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
    "/jscontacts?retryWrites=true&w=majority&appName=fullstack25";

mongoose.connect(url).then (
    () => console.log("Connected to Mongodb"),
    (error) => console.log("Failed to connect to Mongodb. Error:", error)
);

app.get("/api/contacts", function(req, res) {
    contactModel.find().then(function(contacts) {
        return res.status(200).json(contacts);
    }).catch(function(err) {
        console.log("Failed to find contacts. Error:", err);
        return res.status(500).json({"Message:": "Internal Server Error"});
    })
});

app.post("/api/contacts", function(req, res) {
    let contact = new contactModel({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    })
    contact.save().then(function() {
        return res.status(201).json({"Message": "Created"});
    }).catch(function(err) {
        console.log("Failed to create a new contact. Error:", err);
        return res.status(500).json({"Message:":"Internal Server Error"});
    });
});

app.put("/api/contacts/:id", function(req, res) {
    let contact = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    contactModel.replaceOne({"_id": req.params.id}, contact).then(function() {
        return res.status(200).json({"Message": "Success"});
    }).catch(function(err) {
        console.log("Failed to update contact. Error:", err);
        return res.status(500).json({"Message:":"Internal Server Error"});
    })
});

app.delete("/api/contacts/:id", function(req, res) {
    contactModel.deleteOne({"_id": req.params.id}).then(function() {
        return res.status(200).json({"Message": "Success"});
    }).catch(function(err) {
        console.log("Failed to remove contact. Error:", err);
        return res.status(500).json({"Message:":"Internal Server Error"});
    })
});

app.listen(3000);

console.log("Running in port 3000");