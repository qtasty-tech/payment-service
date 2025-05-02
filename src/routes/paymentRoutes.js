const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// Route to create payment
router.post('/create', paymentController.createPayment);

// Route to update payment status
router.patch('/:id', paymentController.updatePaymentStatus);

module.exports = router;
