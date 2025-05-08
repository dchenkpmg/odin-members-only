require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const app = express();
const pool = require("./db/pool");
const router = require("./routes/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// initalise passport
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// initalise auth
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send("Internal Server Error. Check the console for more details.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
