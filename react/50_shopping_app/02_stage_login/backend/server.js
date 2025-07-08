import express from 'express';
import mongoose from 'mongoose';
import shoppingRoute from './routes/shoppingRoute.js';
import userModel from './models/user.js';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
  "/shoppingitems?retryWrites=true&w=majority&appName=fullstack25";

mongoose.connect(url).then(
  () => console.log("Connected to mongodb"),
  (err) => console.log("Failed to connect to mongodb. Error:", err)
);

mongoose.set("toJSON", {virtuals: true});

// Helper functions and constants


app.post("/login", (req, res) => {

});

app.post("/register", (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Bad request" });
  }
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res.status(400).json({ error: "Bad request" });
  }

  bcrypt.hash(req.body.password, 14, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const user = new userModel({
      username: req.body.username,
      password: hash
    })

    user.save().then(() => {
      return res.status(200).json({ Message: "Register Success" });
    }).catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({ error: "Username already in use" });
      }
      return res.status(500).json({ error: "Internal server error" });
    });
  })
});

app.use("/api", shoppingRoute);

app.get('/', (req, res) => {
  res.send("Shopping App");
});

app.listen(3000, console.log("Listening port 3000"));