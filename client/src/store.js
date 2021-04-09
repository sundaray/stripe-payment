import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./components/stateSlices/loginSlice";
import registerReducer from "./components/stateSlices/registerSlice";
import paymentReducer from "./components/stateSlices/paymentSlice";
import orderReducer from "./components/stateSlices/orderSlice";
import bookReducer from "./components/stateSlices/bookSlice";

const loggedInUserFromStorage = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : null;

const preloadedState = {
  login: {
    user: loggedInUserFromStorage,
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    payment: paymentReducer,
    order: orderReducer,
    book: bookReducer,
  },
  preloadedState,
});
