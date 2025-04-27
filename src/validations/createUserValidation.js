const { check } = require("express-validator");

const createUserValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage(
      "The name is too short and must contain at least 4 characters"
    ),

  check("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 4 })
    .withMessage(
      "The last name is too short and must contain at least 4 characters"
    ),

  check("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one capital letter")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number"),
];

module.exports = createUserValidation;
