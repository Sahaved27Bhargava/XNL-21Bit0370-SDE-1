const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// ✅ Get transactions by userId
router.get('/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ✅ Deposit Funds
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const transaction = new Transaction({ userId, amount, type: 'deposit' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error processing deposit', error });
  }
});

// ✅ Withdraw Funds
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const transaction = new Transaction({ userId, amount, type: 'withdraw' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error processing withdrawal', error });
  }
});

// ✅ Transfer Funds
router.post('/transfer', async (req, res) => {
  try {
    const { userId, recipientId, amount } = req.body;
    if (!recipientId) return res.status(400).json({ message: 'Recipient ID is required' });

    const transaction = new Transaction({ userId, recipientId, amount, type: 'transfer' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error processing transfer', error });
  }
});

module.exports = router;
