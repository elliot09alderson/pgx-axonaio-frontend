import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
// import { SettlementData } from "../dummy/Data.js";

export const get_settlements = createAsyncThunk(
  "settlements/get_settlements",
  async ({mode}, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payinsettlement/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_settlements = createAsyncThunk(
  "settlements/fetch_datewise_settlements",
  async ({ startDate, endDate }, { fulfillWithValue, rejectWithValue,mode }) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payinsettlement/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

const settleSlice = createSlice({
  name: "settlement",
  initialState: {
    settlementData: [],
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
      //----------> important working thingsw
      .addCase(get_settlements.fulfilled, (state, { payload }) => {
        state.loader = false;
        // console.log(payload.transactionData);
        state.errorMessage = "";
        state.settlementData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_settlements.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_settlements.rejected, (state, { payload }) => {
        state.loader = false;
        state.settlementData = [];
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_datewise_transaction
      .addCase(fetch_datewise_settlements.fulfilled, (state, { payload }) => {
        state.loader = false;
        // console.log(payload.transactionData);
        state.errorMessage = "";
        state.settlementData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetch_datewise_settlements.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_settlements.rejected, (state, { payload }) => {
        state.loader = false;
        state.settlementData = [];
        state.errorMessage = payload?.error;
      });
    // ----------------------------->> fetch_datewise_transaction
  },
});

export const { messageClear } = settleSlice.actions;
export default settleSlice.reducer;
