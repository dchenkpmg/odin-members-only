const { Router } = require("express");
const boardController = require("../controllers/boardController");
const {
  validateSignUp,
  validateUpgradeUser,
  validatePostMessage,
  validateLogIn,
} = require("../middlewares/validation");
const { isAuth, isAdmin } = require("../middlewares/auth");
const passport = require("passport");
const router = Router();

router.get("/sign-up", boardController.getSignUp);
router.post("/sign-up", validateSignUp, boardController.postSignUp);
router.get("/login", boardController.getLogin);
router.post(
  "/login",
  validateLogIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);
router.get("/", boardController.loginBoard);
router.post(
  "/message",
  isAuth,
  validatePostMessage,
  boardController.postMessage,
);
router.get("/upgrade", isAuth, boardController.upgradeUser);
router.post(
  "/upgrade",
  isAuth,
  validateUpgradeUser,
  boardController.postUpgradeUser,
);
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
router.post("/delete/:id", isAdmin, boardController.deleteMessage);

module.exports = router;
