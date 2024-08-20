import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_reseller_payin_transactions = createAsyncThunk(
  "reseller/get_reseller_payin_transactions",
  async (
    { page, perPage, search, startDate, endDate },
    { fulfillWithValue, rejectWithValue }
  ) => {
    // console.log(startDate, endDate, "startdate.. and endDate..");
    try {
      const { data } = await api.get(
        `/get_reseller_payin_transactions?page=${page}&&search=${search}&&perPage=${perPage}&&startDate=${startDate}&&endDate=${endDate}`,
        {
          withCredentials: true,
        }
      );
      console.log("data in reseller payin reducer => ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reseller_payinSlice = createSlice({
  name: "resellerpayin",
  initialState: {
    resellerPayinData: [],
    loader: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        get_reseller_payin_transactions.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.resellerPayinData = payload.resellerPayinData;
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
          state.errorMessage = payload.error;
        }
      );
  },
});

export const { messageClear } = reseller_payinSlice.actions;
export default reseller_payinSlice.reducer;
