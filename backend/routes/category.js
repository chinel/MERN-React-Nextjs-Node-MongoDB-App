const express = require("express");

//validators
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

//controllers

const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { create } = require("../controllers/category");

const router = express.Router();

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);

module.exports = router;
