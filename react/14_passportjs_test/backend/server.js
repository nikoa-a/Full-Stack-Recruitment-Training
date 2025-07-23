import express from 'express';
import mongoose from 'mongoose';
import userModel from './models/user.js'
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import localStrategy from 'passport-local';
import mongoStore from 'connect-mongo';
import apiroute from './routes/apiroute.js';

const app = express();
app.use(express.json());

// MONGO CONNECTION
const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+
  "/passporttest?retryWrites=true&w=majority&appName=fullstack25";

mongoose.connect(url).then(
  () => console.log("Connected to mongodb"),
  (err) => console.log("Failed to connect to mongodb. Error:", err)
);

// SESSION MANAGEMENT
app.use(session({
  name: "passport-test",
  resave: false,
  secret: "NotNormallyInCode",
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 },
  store: mongoStore.create({
    mongoUrl: url,
    collectionName: "sessions"
  })
}))

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login", new localStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, (req, username, password, done) => {
  userModel.findOne({"username": username}).then((user) => {
    if (!user) {
      return done(null, false);
    }
    bcrypt.compare(password, user.password, (err, success) => {
      if (err) {
        return done(err);
      }
      if (!success) {
        return done(null, false);
      }
      return done(null, user);
    })
  }).catch((err) => {
    return done(err);
  });
}))

passport.serializeUser((user, done) => {
  console.log("Serialize user");
  const temp = {
    user: user.username,
    _id: user._id
  }
  done(null, temp)
})

passport.deserializeUser((data, done) => {
  console.log("Deserialize user");
  userModel.findOne({"_id": data._id}).then((user) => {
    return done(null, user);
  }).catch((err) => {
    return done(err);
  });
})

// MIDDLEWARE
const isUserLogged = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  } else {
    if (req.session) {
      req.logout((err) => {
        req.session.destroy();
        return res.status(403).json({ "Message": "Forbidded" });
      })
    } else {
      return res.status(403).json({ "Message": "Forbidded" });
    }
  }
}

// LOGIN API
app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 14, (err, hash) => {
    if (err) {
      return res.status(500).json({ "Message": "Internal server error" });
    }
    const user = new userModel({
      username: req.body.username,
      password: hash
    })
    user.save().then(() => {
      return res.status(201).json({ "Message": "Register success" });
    }).catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({ "Message": "Username already in use" });
      }
      return res.status(500).json({ "Message": "Internal server error" });
    })
  })
})

app.post("/login", passport.authenticate("local-login"), (req ,res) => {
  return res.status(200).json({ "Message": "Logged in" });
})

app.post("/logout", (req, res) => {
  if (req.session) {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
      req.session.destroy();
      return res.status(200).json({ "Message": "Logged out" });
    })
  } else {
    return res.status(404).json({ "Message": "Not found" });
  }
})

app.use("/api", isUserLogged, apiroute);

app.listen(3000);

console.log("Running in port 3000");