import React from 'react';
import { loadScript, openModal } from 'razorpay';

const PaymentForm = () => {
  const handleClick = async () => {
    // Load Razorpay script
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    // Create a new order
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { orderId, amount } = await response.json();

    // Create options for Razorpay
    const options = {
      key: 'rzp_test_LerHhmnSru6RuL',
      amount: amount.toString(),
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for your product/service',
      order_id: orderId,
      handler: (response) => {
        alert(response.razorpay_payment_id);
      },
    };

    // Open Razorpay modal
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <button onClick={handleClick}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
