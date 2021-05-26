const express = require("express");
const router = express.Router();
const { time } = require("../controllers/blog");

//Here any request to the route will be handled by time controller method
router.get("/", time);

module.exports = router;
