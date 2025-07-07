import express from 'express';
import mongoose from 'mongoose';
import shoppingRoute from './routes/shoppingRoute.js';

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
  "/fullstack25?retryWrites=true&w=majority";

mongoose.connect(url).then(
  () => console.log("Connected to mongodb"),
  (err) => console.log("Failed to connect to mongodb. Error:", err)
);

mongoose.set("toJSON", {virtuals: true});

app.use("/api", shoppingRoute);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(3000, console.log("Listening port 3000"));