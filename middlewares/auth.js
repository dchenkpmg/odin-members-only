function isAuth(req, res, next) {
  console.log("AUTH OBJECT " + req.isAuthenticated());
  console.log(req.session);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized, not an admin");
  }
}

module.exports = {
  isAuth,
  isAdmin,
};
