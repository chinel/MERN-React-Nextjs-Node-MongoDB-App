const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const { userSignupValidator } = require("../validators/auth");

//Here any request to the route will be handled by signup controller method
router.post("/signup", userSignupValidator, runValidation, signup);

module.exports = router;
