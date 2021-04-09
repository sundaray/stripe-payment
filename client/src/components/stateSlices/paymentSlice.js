import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  sessionId: null,
  error: null,
};

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/payment/checkout-session");
      const sessionId = data.id;
      return sessionId;
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
    [createCheckoutSession.pending]: (state, action) => {
      state.status = "loading";
    },
    [createCheckoutSession.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.sessionId = action.payload;
    },
    [createCheckoutSession.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default paymentSlice.reducer;
