import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_refund = createAsyncThunk(
  "refund/get_refund",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payinrefund/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_refund = createAsyncThunk(
  "refund/fetch_datewise_refund",
  async (
    { startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payinrefund/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const refundSlice = createSlice({
  name: "payin",
  initialState: {
    refundData: [],
    loader: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      console.log("message clearing...");
      state.errorMessage = "";
      state.successMessage = "";
      console.log("message cleared...");
    },
  },
  extraReducers: (builder) => {
    builder
      //----------> important working things
      .addCase(get_refund.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.refundData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_refund.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_refund.rejected, (state, { payload }) => {
        state.loader = false;
        state.refundData = [];
        state.errorMessage = payload?.error;
      })
      .addCase(fetch_datewise_refund.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.refundData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetch_datewise_refund.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_refund.rejected, (state, { payload }) => {
        state.loader = false;
        state.refundData = [];
        state.errorMessage = payload?.error;
      });

    // ----------------------------->> fetch_datewise_transaction
  },
});

export const { messageClear } = refundSlice.actions;
export default refundSlice.reducer;
