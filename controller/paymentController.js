// controllers/paymentController.js

const PaymentMethod = require('../models/PaymentMethod');
const Transaction = require('../models/Transaction');
const PaymentProvider = require('../models/PaymentProvider'); // If you have a model for payment providers
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Import Stripe SDK or other payment provider SDKs

// Function to initiate a payment
exports.initiatePayment = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    const userId = req.userId; // Assuming user is authenticated and their ID is available

    // Fetch payment method and user details
    const paymentMethod = await PaymentMethod.findOne({ _id: paymentMethodId, owner: userId });

    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found.' });
    }

    // Create a payment intent or session with the payment provider (Stripe example)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // Replace with the desired currency
      payment_method_types: ['card'],
      payment_method: paymentMethod.type === 'card' ? paymentMethod.id : undefined,
    });

    // Create a new transaction record in the database
    const transaction = new Transaction({
      user: userId,
      paymentMethod: paymentMethodId,
      amount,
      currency: 'usd', // Replace with the desired currency
      status: 'pending', // Or another initial status
      paymentProvider: paymentMethod.paymentProvider,
      paymentIntentId: paymentIntent.id, // Store the payment intent ID for future reference
    });

    await transaction.save();

    res.status(201).json({ paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Something went wrong while initiating payment.' });
  }
};

// Function to confirm a payment (callback from payment provider)
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Fetch the transaction associated with the payment intent
    const transaction = await Transaction.findOne({ paymentIntentId });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    // Handle payment confirmation logic here
    // Update transaction status, notify user, etc.

    // Example: Updating transaction status
    transaction.status = 'success';
    await transaction.save();

    res.status(200).json({ message: 'Payment confirmed.' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Something went wrong while confirming payment.' });
  }
};
