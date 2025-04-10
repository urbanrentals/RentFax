const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const Payment = require('../models/Payment');

const stripe = Stripe('sk_test_YourStripeSecretKey'); // Replace with your actual Stripe Secret Key

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Risk Report',
            },
            unit_amount: 5000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/payment-cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
});

// route (GET request)
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
});

// route (POST request)
router.post('/', async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(500).json({ error: 'Error creating payment' });
    }
});

module.exports = router;
