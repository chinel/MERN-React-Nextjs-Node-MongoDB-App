const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

//Here any request to the route will be handled by signup controller method
router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);

module.exports = router;
