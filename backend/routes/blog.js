const express = require("express");
const router = express.Router();
const { time } = "./controllers/blog";

//Here any request to the route will be handled by time controller method
router.get("/", time);

module.exports = router;
