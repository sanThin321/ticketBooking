// import { getAllSchedules } from "../controller/routeandschedule.js";
import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyCode,
  resetPassword,
  feedback,
} from "../controller/userController.js";
import { authenticateJWT } from "../Middleware/checkToken.js";
import { roleBasedRedirect } from "../Middleware/Redriect.js";
import { getUserProfile, updateEmail, updateNames, updatePassword, updatePhone } from "../controller/accountController.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

// Sign-up and Login
router.post("/signup", signup);
router.post("/login", login);
router.get("/redirect", authenticateJWT, roleBasedRedirect);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyCode", verifyCode);
router.post("/resetPassword/:userId", resetPassword);
router.get("/profile/:userId", getUserProfile)
router.put('/update-names/:userId', updateNames);
router.put('/update-email/:userId', updateEmail);
router.put('/update-phone/:userId', updatePhone);
router.put('/update-password/:userId', updatePassword);
router.post('/',feedback)


router.post("/create-checkout-session", async (req, res) => {
  try {
    const { bookedDetails } = req.body; // Array of tickets

    // Validate input
    if (!bookedDetails || !Array.isArray(bookedDetails) || bookedDetails.length === 0) {
      return res.status(400).json({ error: "Invalid ticket data" });
    }

    // Create line items for each booked seat
    const line_items = bookedDetails.map((ticket) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: ticket.name || `Seat ${ticket.seatNumber}`, // Default name if not provided
        },
        unit_amount: ticket.price, // Price already in cents
      },
      quantity: 1, // Each seat is one quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items, // Add all tickets to the session
      success_url: `/success`,
      cancel_url: `/success`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;

