const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

const YOUR_DOMAIN = "http://localhost:3000/";

router.post(
  "/checkout-session",
  asyncHandler(async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Vase",
              images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: 70000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ id: session.id });
  })
);

module.exports = router;
