const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth");

//Here any request to the route will be handled by signup controller method
router.post("/signup", signup);

module.exports = router;
