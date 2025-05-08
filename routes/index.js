const { Router } = require("express");
const boardController = require("../controllers/boardController");
const { validateSignUp } = require("../middlewares/validation");
const { isAuth, isAdmin } = require("../middlewares/auth");
const passport = require("passport");
const router = Router();

router.get("/sign-up", boardController.getSignUp);
router.post("/sign-up", validateSignUp, boardController.postSignUp);
router.get("/login", boardController.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);
router.get("/", boardController.loginBoard);
router.post("/message", isAuth, boardController.postMessage);
router.get("/upgrade", isAuth, boardController.upgradeUser);
router.post("/upgrade", isAuth, boardController.postUpgradeUser);
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
