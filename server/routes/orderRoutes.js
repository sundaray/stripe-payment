const express = require("express");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post(
  "/success",
  asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.id);
    const customer = await stripe.customers.retrieve(session.customer);
    res.send(customer);
  })
);

module.exports = router;
