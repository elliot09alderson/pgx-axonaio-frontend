import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
// import { SettlementData } from "../dummy/Data.js";

export const get_chargebacks = createAsyncThunk(
  "chargebacks/get_chargebacks",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payinchargeback/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_chargebacks = createAsyncThunk(
  "chargebacks/fetch_datewise_chargebacks",
  async (
    { startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payinchargeback/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

const chargeSlice = createSlice({
  name: "chargeback",
  initialState: {
    chargebackData: [],
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
      .addCase(get_chargebacks.fulfilled, (state, { payload }) => {
        state.loader = false;
        // console.log(payload.transactionData);
        state.errorMessage = "";
        state.chargebackData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_chargebacks.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_chargebacks.rejected, (state, { payload }) => {
        state.loader = false;
        state.chargebackData = [];

        console.log("payload", payload);
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_datewise_transaction
      .addCase(fetch_datewise_chargebacks.fulfilled, (state, { payload }) => {
        state.loader = false;
        // console.log(payload.transactionData);
        state.chargebackData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetch_datewise_chargebacks.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_chargebacks.rejected, (state, { payload }) => {
        state.loader = false;
        state.chargebackData = [];
        console.log("payload", payload);
        state.errorMessage = payload?.error;
      });
  },
});

export const { messageClear } = chargeSlice.actions;
export default chargeSlice.reducer;
