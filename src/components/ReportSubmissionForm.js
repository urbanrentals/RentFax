import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

// Load Stripe public key
const stripePromise = loadStripe('pk_test_51RAvRICVipMI0Kqa4LBX8z48Mg4bCOSbjNcOYLVmiDNz99kDzT3FkmniRT6OlPkHuXSVULyP4sLMR40LDPCNPFPl00c2W4e3ud');

const ReportSubmissionForm = () => {
  const [userId, setUserId] = useState('');
  const [rentalHistory, setRentalHistory] = useState([]);
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Submit the risk report
      await axios.post('http://localhost:5000/api/reports/submit', {
        userId,
        rentalHistory,
      });
      setStatus('✅ Report submitted successfully.');

      // 2. Create Stripe Checkout session
      const stripe = await stripePromise;
      const { data: session } = await axios.post('http://localhost:5000/api/payment/create-checkout-session');

      // 3. Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
        setPaymentStatus(`❌ ${result.error.message}`);
        navigate('/payment-cancel'); // fallback navigation
      }
    } catch (error) {
      console.error('Submission or payment error:', error);
      setStatus('❌ Error submitting report.');
      setPaymentStatus('❌ Payment process failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Risk Report</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <label htmlFor="rentalHistory">Rental History (JSON):</label>
        <textarea
          id="rentalHistory"
          rows={5}
          placeholder='e.g. [{"status":"late","flaggedForFraud":false}]'
          value={JSON.stringify(rentalHistory)}
          onChange={(e) => {
            try {
              setRentalHistory(JSON.parse(e.target.value));
            } catch (err) {
              setRentalHistory([]);
            }
          }}
          required
        />

        <button type="submit">Submit Report and Pay</button>
      </form>

      {status && <p>{status}</p>}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default ReportSubmissionForm;
