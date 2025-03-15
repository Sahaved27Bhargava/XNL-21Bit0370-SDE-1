const mongoose = require("mongoose");

const RiskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  riskLevel: { type: String, enum: ["low", "medium", "high"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Risk", RiskSchema);
