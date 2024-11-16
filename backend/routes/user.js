const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { getProfile } = require("../controllers/user");

router.get("/profile", requireSignin, authMiddleware, getProfile);

module.exports = router;
