const { body } = require("express-validator");

const validateSignupData = [
  body("username", "username is required")
    .notEmpty()
    .isLength({ min: 3, max: 12 }),
  body("password", "password is required").notEmpty().isLength({ min: 8 }),
];

const validateLoginData = [
  body("username", "username is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];

module.exports = {
  validateSignupData,
  validateLoginData,
};
