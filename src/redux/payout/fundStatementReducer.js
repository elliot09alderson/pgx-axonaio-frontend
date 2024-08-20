import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_fundStatement = createAsyncThunk(
  "payoutFundstatement/get_fundStatement",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payoutfundstatement/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_fundStatement_by_date = createAsyncThunk(
  "payoutFundstatement/get_fundStatement_by_date",
  async ({ startDate, endDate,mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/payoutfundstatement/fetchbydate?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

const fundStatementSlice = createSlice({
  name: "fundstatement",
  initialState: {
    fundStatementData: [],
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
      /* -------------------------------------------------------------------------- */
      /*                               get beneficiary                              */
      /* -------------------------------------------------------------------------- */
      .addCase(get_fundStatement.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.fundStatementData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_fundStatement.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_fundStatement.rejected, (state, { payload }) => {
        state.loader = false;
        state.fundStatementData = [];
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                            fund Statement                         */
      /* -------------------------------------------------------------------------- */
      .addCase(get_fundStatement_by_date.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.fundStatementData = payload.data;

        state.successMessage = payload.message;
      })
      .addCase(get_fundStatement_by_date.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_fundStatement_by_date.rejected, (state, { payload }) => {
        state.loader = false;
        state.fundStatementData = [];
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = fundStatementSlice.actions;
export default fundStatementSlice.reducer;
