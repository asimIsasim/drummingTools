const { body, param, check, validationResult } = require("express-validator");

const ValidateSignup = () => [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = ValidateSignup;
