import express from 'express';
import mongoose from 'mongoose';
import shoppingRoute from './routes/shoppingRoute.js';
import userModel from './models/user.js';
import sessionModel from './models/session.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
const ttl_diff = 3600000; // 1 hour

const createToken = () => {
  const token = crypto.randomBytes(64);
  return token.toString("hex");
}

// Middleware
const isUserLogged = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).json({ error: "Forbidden" });
  }
  sessionModel.findOne({"token": req.headers.token}).then((session) => {
    if (!session) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const now = Date.now();
    if (now > session.ttl) {
      sessionModel.deleteOne({"_id": session._id}).then(() => {
        return res.status(403).json({ error: "Forbidden" });
      }).catch((err) => {
        return res.status(403).json({ error: "Forbidden" });
      });
    } else {
      session.ttl = now + ttl_diff;
      req.session = {};
      req.session.user = session.user;
      session.save().then(() => {
        return next();
      }).catch(() => {
        return next();
      });
    }
  }).catch((err) => {
    return res.status(403).json({ error: "Forbidden" });
  });
}

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

app.post("/login", (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Bad request" });
  }
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res.status(400).json({ error: "Bad request" });
  }

  userModel.findOne({"username": req.body.username}).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    bcrypt.compare(req.body.password, user.password, (err, success) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!success) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = createToken();
      const now = Date.now();
      const session = new sessionModel ({
        user: user.username,
        ttl: now + ttl_diff,
        token: token
      })

      session.save().then(() => {
        return res.status(200).json({ "token": token })
      }).catch((err) => {
        return res.status(500).json({ error: "Internal server error" });
      })
    })
  }).catch((err) => {
    return res.status(500).json({ error: "Internal server error" });
  });
});

app.post("/logout", (req, res) => {
  if (!req.headers.token) {
    return res.status(404).json({ error: "Not found" });
  }
  sessionModel.deleteOne({"token": req.headers.token}).then(() => {
    return res.status(200).json({ message: "Logged out" });
  }).catch((err) => {
    return res.status(500).json({ error: "Internal server error" });
  });
});

app.use("/api", isUserLogged, shoppingRoute);

app.get('/', (req, res) => {
  res.send("Shopping App");
});

app.listen(3000, console.log("Listening port 3000"));