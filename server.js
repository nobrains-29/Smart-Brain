const express = require("express");
const Clarifai = require("clarifai");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const Ap = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API,
});

mongoose.connect(
  "mongodb+srv://Archit:" +
    process.env.MONGO_PASS +
    "@cluster0.fdjgc.mongodb.net/SmartBrain",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  entries: Number,
  joined: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Hello, There");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            res.send(foundUser);
          } else {
            res.status(400).json("Id or Password not matching");
          }
        });
      } else {
        res.status(400).json("User not found");
      }
    }
  });
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User({
      name: name,
      email: email,
      password: hash,
      joined: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
      entries: 0,
    });
    user.save(function (err) {
      if (err) {
        console.log(err);
        res.status(400).send(false);
      } else {
        res.status(200).send(user);
      }
    });
  });
});

app.post("/image", (req, res) => {
  const { id } = req.body.user;

  User.updateOne({ _id: id }, { $inc: { entries: 1 } }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.send(true);
});

app.post("/imageurl", (req, res) => {
  const { input } = req.body;
  Ap.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API!"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
