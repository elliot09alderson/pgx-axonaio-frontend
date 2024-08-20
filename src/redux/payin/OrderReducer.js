import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_orders = createAsyncThunk(
  "orders/get_orders",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payinorder/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_orders = createAsyncThunk(
  "orders/fetch_datewise_orders",
  async (
    { startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payinorder/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

export const GetMerchantsPayInorders = createAsyncThunk(
  "/get_orders/merchant/payin",
  async (
    { page, perPage, search, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      // console.log("fetching started .................");
      const { data } = await api.get(
        `/get_orders/merchant/payin?page=${page}&&search=${search}&&perPage=${perPage}&&mode=${mode}`,
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

export const get_reseller_payin_orders = createAsyncThunk(
  "orders/get_reseller_payin_orders",
  async (
    { page, perPage, search, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      console.log("fetching started .................");
      const { data } = await api.get(
        `/get_reseller_payin_orders?page=${page}&&search=${search}&&perPage=${perPage}&&mode=${mode}`,
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: [],
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
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.loader = false;
        console.log(payload);
        state.orderData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_orders.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.orderData = [];
        console.log("payload", payload);
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_datewise_order
      .addCase(fetch_datewise_orders.fulfilled, (state, { payload }) => {
        state.loader = false;
        console.log(payload.orderData);
        state.orderData = payload.data;
        state.successMessage = payload.message;
        state.errorMessage = "";
      })
      .addCase(fetch_datewise_orders.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.orderData = [];
        state.errorMessage = payload.error;
      })
      // ----------------------------------------<<----------
      .addCase(get_reseller_payin_orders.fulfilled, (state, { payload }) => {
        console.log("Reducer Updated:", payload);
        state.errorMessage = "";
        state.loader = false;
        state.orderData = payload.orderData;
        state.successMessage = payload.message;
      })
      .addCase(get_reseller_payin_orders.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_reseller_payin_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetMerchantsPayInorders.fulfilled, (state, { payload }) => {
        console.log("Merchant Pay in orders : ", payload);
        state.loader = false;
        state.orderData = payload.orderData;
        state.successMessage = payload.message;
      })
      .addCase(GetMerchantsPayInorders.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetMerchantsPayInorders.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = orderSlice.actions;
export default orderSlice.reducer;
