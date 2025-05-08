const { body } = require("express-validator");

const validateSignUp = [
  body("first-name")
    .trim()
    .isAlpha()
    .withMessage("First name must only contain letters.")
    .isLength({ min: 1, max: 20 })
    .withMessage("First name must be between 1 and 20 characters."),
  body("last-name")
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
  body("confirm-password")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

module.exports = {
  validateSignUp,
};
