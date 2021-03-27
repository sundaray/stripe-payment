import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Stripe extends Component {
  render() {
    return (
      <StripeCheckout
        amount={70000}
        currency="INR"
        token={(token) => console.log(token)}
        stripeKey="pk_test_51I29jDKK144e4HAvKFfcQEjfPm3PWRDDS5fa1fWXM7bdBlpz92vROkIA04yoJbKYB5FEe42sOLOKu6D4TiDRDy0e0059Iop568"
      />
    );
  }
}

export default Stripe;
