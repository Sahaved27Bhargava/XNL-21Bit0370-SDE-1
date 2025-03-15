const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  recipientId: { type: String },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
