import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  customer: null,
  paymentSuccess: null,
  error: null,
};

export const fetchCustomer = createAsyncThunk(
  "order/fetchCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/order/success", id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCustomer.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.customer = action.payload;
      state.paymentSuccess = true;
    },
    [fetchCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
