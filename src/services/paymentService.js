const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (paymentDetails) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentDetails.amount, // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new Error('Payment failed: ' + error.message);
  }
};

const updatePaymentStatus = async (paymentId, status) => {
  // Example of updating payment status (could be for later use with webhooks)
  const payment = await Payment.findById(paymentId); // Assuming Payment model exists
  payment.status = status;
  await payment.save();
  return payment;
};

module.exports = { createPayment, updatePaymentStatus };
