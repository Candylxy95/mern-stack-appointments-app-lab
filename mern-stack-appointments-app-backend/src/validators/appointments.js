const { body, param } = require("express-validator");

const validateIdInParam = [param("id", "id is invalid").isMongoId()];
const validateAddApptData = [
  body("title", "title is required").notEmpty().isLength({ min: 3, max: 40 }),
  body("type", "type is required").notEmpty(),
  body("purpose", "purpose is required").notEmpty(),
  body("location", "location is required").notEmpty(),
  body("address", "address is required").notEmpty(),
  body("date", "date is required").notEmpty(),
  body("time", "time is required").notEmpty(),
  body("comments", "comments is required").notEmpty(),
];

const validateUpdateApptData = [
  body("title", "title is required")
    .optional()
    .notEmpty()
    .isLength({ min: 3, max: 40 }),
  body("type", "type is required").optional().notEmpty(),
  body("purpose", "purpose is required").optional().notEmpty(),
  body("location", "location is required").optional().notEmpty(),
  body("address", "address is required").optional().notEmpty(),
  body("date", "date is required").optional().notEmpty(),
  body("time", "time is required").optional().notEmpty(),
  body("comments", "comments is required").optional().notEmpty(),
];

module.exports = {
  validateIdInParam,
  validateAddApptData,
  validateUpdateApptData,
};
