const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // To parse JSON bodies

// Use payment routes
app.use('/api/payments', paymentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected for payment service');
    app.listen(PORT, () => {
      console.log(`Payment Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
