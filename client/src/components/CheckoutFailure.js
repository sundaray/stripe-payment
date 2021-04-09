import React from "react";

const CheckoutFailure = () => {
  return (
    <div className="checkout-failure">
      <alert className="alert alert-danger col-10 col-sm-8 col-md-6 mx-auto text-center">
        Sorry, Your payment failed.
      </alert>
    </div>
  );
};

export default CheckoutFailure;
