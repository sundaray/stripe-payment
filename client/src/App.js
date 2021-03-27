import React, { useState } from "react";

import Header from "./components/Header";
import Shopping from "./components/Shopping";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckoutSession } from "./components/stateSlices/paymentSlice";

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
  const { user } = useSelector((state) => state.login);

  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    // const stripe = await stripePromise;

    // const response = await fetch("/api/payment/create-checkout-session", {
    //   method: "POST",
    // });

    // const session = await response.json();
    dispatch(fetchCheckoutSession({ token: user.token }));

    // When the customer clicks on the button, redirect them to Checkout.
    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });
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
      </Switch>
    </>
  );
};

export default App;
