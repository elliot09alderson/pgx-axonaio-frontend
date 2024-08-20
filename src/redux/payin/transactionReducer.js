import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import { transactionData } from "../../dummy/Data.js";

export const get_transactions = createAsyncThunk(
  "transactions/get_transactions",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payintransaction/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_transaction = createAsyncThunk(
  "transactions/fetch_datewise_transaction",
  async (
    { startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payintransaction/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

export const GetMerchantsPayInTransactions = createAsyncThunk(
  "/get_transactions/merchant/payin",
  async (
    { page, perPage, search, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      // console.log("fetching started .................");
      const { data } = await api.get(
        `/get_transactions/merchant/payin?page=${page}&&search=${search}&&perPage=${perPage}&&mode=${mode}`,
        {
          withCredentials: true,
        }
      );
      // console.log("fetching ended .................");
      // console.log("data => ", data);
      // return data;
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_reseller_payin_transactions = createAsyncThunk(
  "transactions/get_reseller_payin_transactions",
  async (
    { page, perPage, search, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      console.log("fetching started .................");
      const { data } = await api.get(
        `/get_reseller_payin_transactions?page=${page}&&search=${search}&&perPage=${perPage}&&mode=${mode}`,
        {
          withCredentials: true,
        }
      );
      console.log("fetching ended .................");
      console.log("data => ", data);
      // return data;
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionData: [],
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
      .addCase(get_transactions.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.transactionData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_transactions.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_transactions.rejected, (state, { payload }) => {
        state.loader = false;
        state.transactionData = [];
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_datewise_transaction
      .addCase(fetch_datewise_transaction.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.transactionData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetch_datewise_transaction.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_transaction.rejected, (state, { payload }) => {
        state.loader = false;
        state.transactionData = [];
        state.errorMessage = payload.error;
      })
      // ----------------------------------------<<----------
      .addCase(
        get_reseller_payin_transactions.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.transactionData = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_reseller_payin_transactions.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_reseller_payin_transactions.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.transactionData = [];
          state.errorMessage = payload.error;
        }
      )
      .addCase(
        GetMerchantsPayInTransactions.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.transactionData = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(GetMerchantsPayInTransactions.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetMerchantsPayInTransactions.rejected, (state, { payload }) => {
        state.loader = false;
        state.transactionData = [];
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = transSlice.actions;
export default transSlice.reducer;
