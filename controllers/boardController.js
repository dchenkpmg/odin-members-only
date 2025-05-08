const db = require("../db/authQueries");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("passport");

async function getSignUp(req, res) {
  res.render("sign-up", {
    title: "Sign Up",
  });
}

async function postSignUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.username,
      hashedPassword,
      req.body.firstName,
      req.body.lastName,
      "pleb",
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getLogin(req, res) {
  res.render("login", {
    title: "Login",
  });
}

async function postLogin(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/board",
    failureRedirect: "/",
  });
}

async function loginBoard(req, res) {
  res.render("board", {
    title: "Message Board",
    user: req.user,
  });
}

async function upgradeUser(req, res) {
  res.send("Upgrade User");
}

module.exports = {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  loginBoard,
  upgradeUser,
};
