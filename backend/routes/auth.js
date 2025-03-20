const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/authController");

// POST /api/signup
router.post("/signup", signUp);

// POST /api/signin
router.post("/signin", signIn);

module.exports = router;
