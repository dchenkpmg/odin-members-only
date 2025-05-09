const db = require("../db/authQueries");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { validationResult } = require("express-validator");
require("dotenv").config();

async function getSignUp(req, res) {
  res.render("sign-up", {
    title: "Sign Up",
  });
}

async function postSignUp(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.username,
      hashedPassword,
      req.body.firstName,
      req.body.lastName,
      "pleb",
    );
    req.flash("success", "User created successfully!");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getLogin(req, res) {
  const errorMessage = req.flash("error");
  const successMessage = req.flash("success");
  const message = errorMessage.length > 0 ? errorMessage : successMessage;
  console.log(message);
  res.render("login", {
    title: "Login",
    message: message,
  });
}

async function loginBoard(req, res) {
  const messages = await db.getMessages();
  console.log(messages);
  res.render("board", {
    title: "Message Board",
    user: req?.user,
    messages: messages,
  });
}

async function postMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("board", {
      title: "Message Board",
      user: req?.user,
      messages: await db.getMessages(),
      errors: errors.array(),
    });
  }
  await db.createMessage(req.user.id, req.body.title, req.body.message);
  res.redirect("/");
}

async function upgradeUser(req, res) {
  res.render("upgrade", {
    title: "Upgrade User",
    user: req.user,
  });
}

async function postUpgradeUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("upgrade", {
      title: "Upgrade User",
      user: req?.user,
      errors: errors.array(),
    });
  }
  const secret = req.body.secret;
  if (
    secret !== process.env.MEMBER_SECRET &&
    secret !== process.env.ADMIN_SECRET
  ) {
    return res.status(403).send("Wrong Secret!");
  } else if (secret === process.env.MEMBER_SECRET) {
    await db.upgradeUser(req.user.id, "member");
    res.redirect("/");
  } else if (secret === process.env.ADMIN_SECRET) {
    await db.upgradeUser(req.user.id, "admin");
    res.redirect("/");
  }
}

async function deleteMessage(req, res) {
  console.log("Deleting message with ID: " + req.params.id);
  const messageId = req.params.id;
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  res.redirect("/");
}

module.exports = {
  getSignUp,
  postSignUp,
  getLogin,
  postMessage,
  loginBoard,
  upgradeUser,
  postUpgradeUser,
  deleteMessage,
};
