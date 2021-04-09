import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  bookSent: null,
  error: null,
};

export const emailBook = createAsyncThunk(
  "book/emailBook",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/email/book", email);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    [emailBook.pending]: (state, action) => {
      state.status = "loading";
    },
    [emailBook.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.bookSent = true;
    },
    [emailBook.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default bookSlice.reducer;
