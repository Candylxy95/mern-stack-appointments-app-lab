const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controllers/auth");
const { validateSignupData, validateLoginData } = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");

router.post("/sign-up", validateSignupData, checkErrors, signUp);
router.post("/sign-in", validateLoginData, checkErrors, signIn);

module.exports = router;
