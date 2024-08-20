import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_cases = createAsyncThunk(
  "cases/get_cases",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payincase/fetch`;

      const { data } = await api.get(url, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetch_datewise_cases = createAsyncThunk(
  "cases/fetch_datewise_cases",
  async ({ startDate, endDate }, { fulfillWithValue, rejectWithValue }) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/payincase/fetchbydate?startDate=${startDate}&&endDate=${endDate}`,
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

export const GetMerchantsPayIncases = createAsyncThunk(
  "/get_cases/merchant/payin",
  async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
    try {
      // console.log("fetching started .................");
      const { data } = await api.get(
        `/get_cases/merchant/payin?page=${page}&&search=${search}&&perPage=${perPage}`,
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

export const get_reseller_payin_cases = createAsyncThunk(
  "cases/get_reseller_payin_cases",
  async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log("fetching started .................");
      const { data } = await api.get(
        `/get_reseller_payin_cases?page=${page}&&search=${search}&&perPage=${perPage}`,
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

const caseSlice = createSlice({
  name: "case",
  initialState: {
    caseData: [],
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
      .addCase(get_cases.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.caseData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_cases.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_cases.rejected, (state, { payload }) => {
        state.loader = false;
        state.caseData = [];
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_datewise_case
      .addCase(fetch_datewise_cases.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.caseData = payload.data;
        state.successMessage = payload.message;
        state.errorMessage = "";
      })
      .addCase(fetch_datewise_cases.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetch_datewise_cases.rejected, (state, { payload }) => {
        state.loader = false;
        state.caseData = [];
        state.errorMessage = payload.error;
      })
      // ----------------------------------------<<----------
      .addCase(get_reseller_payin_cases.fulfilled, (state, { payload }) => {
        state.errorMessage = "";
        state.loader = false;
        state.caseData = payload.caseData;
        state.successMessage = payload.message;
      })
      .addCase(get_reseller_payin_cases.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_reseller_payin_cases.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetMerchantsPayIncases.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.caseData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(GetMerchantsPayIncases.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetMerchantsPayIncases.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = caseSlice.actions;
export default caseSlice.reducer;
