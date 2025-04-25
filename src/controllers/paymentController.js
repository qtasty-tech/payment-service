const paymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
  try {
    const paymentDetails = req.body;
    const payment = await paymentService.createPayment(paymentDetails);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;
    const updatedPayment = await paymentService.updatePaymentStatus(paymentId, status);
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, updatePaymentStatus };
