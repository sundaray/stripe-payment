import React from "react";

const Shopping = ({ handleCheckoutClick }) => {
  return (
    <div className="card bg-light col-8 col-sm-6 col-md-4 mx-auto buy-book">
      <img
        className="card-img-top"
        src="/images/vase.jpg"
        alt="Card image cap"
      />
      <h3 className="card-title text-center">SCANDINAVIAN VASE</h3>
      <button
        type="button"
        id="checkout-button"
        role="link"
        onClick={handleCheckoutClick}
        className="btn btn-warning btn-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default Shopping;
