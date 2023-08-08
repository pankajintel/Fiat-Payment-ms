const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
// const authMiddleware = require('../middleware/authMiddleware');

// Route for initiating a payment
router.post('/initiate-payment', paymentController.initiatePayment);

// Route for confirming a payment (PayPal callback or webhook)
router.post('/confirm-payment', paymentController.confirmPayment);

module.exports = router;
