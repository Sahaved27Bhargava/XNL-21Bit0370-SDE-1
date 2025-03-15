const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Secure Risk Analysis Route
router.get("/analyze", authMiddleware, (req, res) => {
  res.json({ message: "Risk analysis successful", user: req.user });
});

module.exports = router;
