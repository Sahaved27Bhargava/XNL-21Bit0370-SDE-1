const Transaction = require('../models/transaction');

// GET all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new transaction
const createTransaction = async (req, res) => {
    const { userId, type, amount } = req.body;

    if (!userId || !type || !amount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const transaction = new Transaction({ userId, type, amount, status: 'completed' });
        await transaction.save();
        res.status(201).json({ message: 'Transaction created', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTransactions, createTransaction };
