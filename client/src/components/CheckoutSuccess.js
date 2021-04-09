import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "./stateSlices/orderSlice";
import { emailBook } from "./stateSlices/bookSlice";

const CheckoutSuccess = ({ location }) => {
  const { customer, paymentSuccess } = useSelector((state) => state.order);
  const { bookSent } = useSelector((state) => state.book);

  const id = location.search.split("=")[1];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomer({ id }));
  }, [dispatch]);

  useEffect(() => {
    if (paymentSuccess) {
      dispatch(emailBook({ email: customer.email }));
    }
  }, [paymentSuccess]);

  return (
    <div className="checkout-success">
      <alert className="alert alert-primary col-10 col-sm-8 col-md-6 mx-auto">
        Thanks for your payment.
      </alert>
    </div>
  );
};

export default CheckoutSuccess;
