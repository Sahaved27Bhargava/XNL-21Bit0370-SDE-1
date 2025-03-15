const Risk = require("../models/riskModel");

exports.analyzeRisk = async (req, res) => {
  try {
    const { userId, transactionId, amount, riskLevel } = req.body;

    if (!userId || !transactionId || !amount || !riskLevel) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save risk data
    const riskEntry = new Risk({ userId, transactionId, amount, riskLevel });
    await riskEntry.save();

    res.status(201).json({ message: "Risk analysis recorded", riskEntry });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getAllRisks = async (req, res) => {
  try {
    const risks = await Risk.find();
    res.status(200).json(risks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch risks", details: error.message });
  }
};
