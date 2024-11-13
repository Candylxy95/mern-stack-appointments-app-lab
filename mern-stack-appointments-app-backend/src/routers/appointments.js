const express = require("express");
const router = express.Router();
const {
  viewAllAppt,
  viewOneAppt,
  addAppt,
  deleteAppt,
  updateOneAppt,
} = require("../controllers/appointments");
const {
  validateIdInParam,
  validateAddApptData,
  validateUpdateApptData,
} = require("../validators/appointments");
const checkErrors = require("../validators/checkErrors");

router.get("/appointments", viewAllAppt);
router.post("/appointments", validateAddApptData, checkErrors, addAppt);
router.get("/appointments/:id", validateIdInParam, checkErrors, viewOneAppt);
router.delete("/appointments/:id", validateIdInParam, checkErrors, deleteAppt);
router.patch(
  "/appointments/:id",
  validateUpdateApptData,
  checkErrors,
  updateOneAppt
);

module.exports = router;
