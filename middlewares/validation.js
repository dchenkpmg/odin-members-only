const { body } = require("express-validator");

const validateSignUp = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must only contain letters.")
    .isLength({ min: 1, max: 20 })
    .withMessage("First name must be between 1 and 20 characters."),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must only contain letters.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name must be between 1 and 20 characters."),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be between 1 and 20 characters."),
  body("password")
    .trim()
    .isAlphanumeric()
    .withMessage("Password must only contain letters and numbers.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters."),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

const validatePostMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters."),
  body("message")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1 and 500 characters."),
];

const validateUpgradeUser = [
  body("secret")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Secret must be between 1 and 100 characters.")
    .custom((value, { req }) => {
      if (
        value !== process.env.MEMBER_SECRET &&
        value !== process.env.ADMIN_SECRET
      ) {
        throw new Error("Invalid secret.");
      }
      return true;
    }),
];

const validateLogIn = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be between 1 and 20 characters."),
  body("password")
    .trim()
    .isAlphanumeric()
    .withMessage("Password must only contain letters and numbers.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters."),
];

module.exports = {
  validateSignUp,
  validatePostMessage,
  validateUpgradeUser,
  validateLogIn,
};
