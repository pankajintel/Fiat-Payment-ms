// models/Transaction.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User ID

  paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" },

  amount: Number,
  currency: String,
  status: String, // Success, Failure, Pending, etc.
  paymentProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentProvider",
  }, 
    paymentIntentId: String, // Payment provider's identifier for the transaction
  timestamp: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Transaction", transactionSchema);
