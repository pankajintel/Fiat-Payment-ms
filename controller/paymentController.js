// controllers/paymentController.js

// const PaymentMethod = require("../models/PaymentMethod");
const Transaction = require("../models/transaction");
// const PaymentProvider = require('../models/PaymentProvider');
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');


exports.initiatePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.userId; // Assuming user is authenticated and their ID is available

    // Configure PayPal SDK (Make sure to have PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your .env)
    paypal.configure({
      mode: "sandbox", // or 'live' for production
      client_id: process.env.PAYPAL_CLIENT_ID,
      client_secret: process.env.PAYPAL_CLIENT_SECRET,
    });

    // Create a PayPal payment request
    const createPaymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/api/payments/confirm-payment", // Replace with your return URL
        cancel_url: "http://localhost:3000/api/payments/cancel-payment", // Replace with your cancel URL
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: "USD", // Replace with the desired currency
          },
          description: "Payment description", // Replace with your payment description
        },
      ],
    };

    // Create a new PayPal payment
    paypal.payment.create(createPaymentJson, (error, payment) => {
      if (error) {
        console.error("Error creating PayPal payment:", error);
        return res.status(500).json({ error: "Error creating payment." });
      } else {
        // Save the PayPal payment information in your database
        const transaction = new Transaction({
          user: userId,
          paymentMethod: {
            type: "paypal",
            // Other PayPal-related fields if needed
          },
          amount,
          currency: "usd", // Replace with the desired currency
          status: "pending",
          paymentProvider: payment.paymentProvider, // This might need to be handled differently
          paymentIntentId: payment.id,
        });

        transaction.save((err) => {
          if (err) {
            console.error("Error saving transaction:", err);
            return res.status(500).json({ error: "Error saving transaction." });
          }

          // Redirect user to PayPal approval URL
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              return res
                .status(200)
                .json({ approval_url: payment.links[i].href });
            }
          }
        });
      }
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while initiating payment." });
  }
};

// Function to confirm a payment (callback from payment provider)
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Fetch the transaction associated with the payment intent
    const transaction = await Transaction.findOne({ paymentIntentId });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    // Get payment details from PayPal using the payment ID
    const payment = await paypal.payment.get(paymentId);

    // Check if the payment was successful
    if (payment.state === "approved") {
      // Handle successful payment logic here
      // Update transaction status, notify user, etc.

      // Example: Updating transaction status
      transaction.status = "success";
      await transaction.save();

      return res.status(200).json({ message: "Payment confirmed." });
    } else {
      // Handle unsuccessful payment logic here
      // Update transaction status, notify user, etc.

      // Example: Updating transaction status
      transaction.status = "failure";
      await transaction.save();

      return res.status(400).json({ error: "Payment not approved." });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while confirming payment." });
  }
};
