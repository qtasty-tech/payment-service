const mongoose = require('mongoose');

const paymentTransactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  }],
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  currency: { 
    type: String, 
    required: true, 
    default: 'usd' 
  },
  paymentMethod: { 
    type: String, 
    default: 'payhere',
  },
  paymentStatus: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed', 'failed', 'cancelled'], 
    default: 'pending' 
  },
  stripePaymentIntentId: { 
    type: String, 
    required: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});


paymentTransactionSchema.virtual('isPaymentSuccessful').get(function() {
  return this.paymentStatus === 'completed';
});


paymentTransactionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);

module.exports = PaymentTransaction;
