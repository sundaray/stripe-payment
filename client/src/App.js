import React, { useState } from "react";
import Header from "./components/Header";
import Shopping from "./components/Shopping";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import CheckoutFailure from "./components/CheckoutFailure";
import CheckoutSuccess from "./components/CheckoutSuccess";

import { Route, Switch } from "react-router-dom";
import { createCheckoutSession } from "./components/stateSlices/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51I29jDKK144e4HAvKFfcQEjfPm3PWRDDS5fa1fWXM7bdBlpz92vROkIA04yoJbKYB5FEe42sOLOKu6D4TiDRDy0e0059Iop568"
);

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOverlayClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSidedrawerNavbarLinkClick = () => {
    setMenuOpen(!menuOpen);
  };

  const dispatch = useDispatch();

  const { sessionId } = useSelector((state) => state.payment);

  const handleCheckoutClick = async () => {
    const stripe = await stripePromise;

    dispatch(createCheckoutSession());

    if (sessionId) {
      await stripe.redirectToCheckout({
        sessionId,
      });
    }
  };

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuClick={handleMenuClick}
        onSidedrawerNavbarLinkClick={handleSidedrawerNavbarLinkClick}
        onOverlayClick={handleOverlayClick}
      />
      <Switch>
        <Route
          path="/buy"
          render={(props) => (
            <Shopping {...props} handleCheckoutClick={handleCheckoutClick} />
          )}
        />
        <Route path="/registerLogin" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/failure" component={CheckoutFailure} />
        <Route path="/success" component={CheckoutSuccess} />
      </Switch>
    </>
  );
};

export default App;
