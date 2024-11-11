const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
  try {
    const usernameInDatabase = await User.findOne({
      username: req.body.username,
    });
    if (usernameInDatabase) {
      return res.send("Username taken");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(201).json({
      message: "Sign-up successful. Please sign-in at the sign-in screen.",
    });
  } catch (error) {
    console.log(error);
    res.send("Sign-up failed. Please try again later.");
  }
};

const signIn = async (req, res) => {
  try {
    const usernameInDatabase = await User.findOne({
      username: req.body.username,
    });
    if (!usernameInDatabase) {
      return res.send("Login failed, please try again");
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      usernameInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed, please try again");
    }
    const claims = { username: usernameInDatabase.username };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = { signIn, signUp };
