const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Authenticating user:", username);
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  console.log("Deserializing user:", userId);
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
