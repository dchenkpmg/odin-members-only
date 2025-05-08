const { Router } = require("express");
const boardController = require("../controllers/boardController");
const { validateSignUp } = require("../middlewares/validation");
const router = Router();

router.get("/sign-up", boardController.getSignUp);
router.post("/sign-up", validateSignUp, boardController.postSignUp);
router.get("/", boardController.getLogin);
router.post("/", boardController.postLogin);
router.post("/board", boardController.loginBoard);
router.get("/upgrade", boardController.upgradeUser);

module.exports = router;
