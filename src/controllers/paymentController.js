const paymentService = require('../services/paymentService');
const PaymentTransaction = require('../models/transactionModel');

const createPayment = async (req, res) => {
  try {
    const payment = new PaymentTransaction({
      ...req.body,
      paymentStatus: 'completed'
    });
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orders } = req.body;

    // 1. Find payment transaction
    const payment = await PaymentTransaction.findById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment transaction not found' });
    }

    // 2. Update fields
    payment.orders = orders; // Replace orders array
    payment.paymentStatus = 'completed'; // Set status to completed
    payment.updatedAt = Date.now(); // Manually update timestamp (since we're not using middleware)

    // 3. Save changes
    await payment.save();

    // 4. Return the updated payment (without populate)
    res.json(payment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, updatePaymentStatus };
