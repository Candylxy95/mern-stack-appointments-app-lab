const express = require("express");
const router = express.Router();
const {
  viewAllAppt,
  viewOneAppt,
  addAppt,
  deleteAppt,
  updateOneAppt,
} = require("../controllers/appointments");

router.get("/appointments", viewAllAppt);
router.post("/appointments", addAppt);
router.get("/appointments/:id", viewOneAppt);
router.delete("/appointments/:id", deleteAppt);
router.patch("/appointments/:id", updateOneAppt);

module.exports = router;
