const express = require("express");
const router = express.Router();
const riskController = require("../controllers/riskController");

router.post("/analyze", riskController.analyzeRisk);
router.get("/all", riskController.getAllRisks);

module.exports = router;
