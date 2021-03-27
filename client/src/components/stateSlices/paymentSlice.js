import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  session: null,
  error: null,
};

export const fetchCheckoutSession = createAsyncThunk(
  "payment/fetchCheckoutSession",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        "/api/payment/checkout-session",
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCheckoutSession.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCheckoutSession.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.session = action.payload;
    },
    [fetchCheckoutSession.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default paymentSlice.reducer;
