import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Replace with your Stripe public key

const PaymentComponent = ({ selectedSeats, seatDetails }) => {
  const makePayment = async () => {
    try {
      const bookedSeats = Array.from(selectedSeats).map((seatNumber) => ({
        seatNumber,
        name: seatDetails[seatNumber]?.name || `Seat ${seatNumber}`,
        price: 1000, // Example price in cents
      }));

      console.log("Booked Seats:", bookedSeats);

      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/create-checkout-session",
        { bookedDetails: bookedSeats },
        { headers: { "Content-Type": "application/json" } }
      );

      const { id } = response.data;

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load.");
      }

      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error("Error during redirect:", result.error.message);
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed:", error.message || error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={makePayment} className="btn">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
