// /reseller/merchants
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
// import { SettlementData } from "../dummy/Data.js";

export const create_merchant = createAsyncThunk(
  "reseller/create_merchant",
  async ({ values }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/reseller/merchants/create`;

      const { data } = await api.post(url, values, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggle_activate_merchant = createAsyncThunk(
  "reseller/toggle_activate_merchant",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/reseller/merchants/toggle-account/${id}`;

      const { data } = await api.put(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_reseller_merchant = createAsyncThunk(
  "reseller/get_reseller_merchant",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/reseller/merchants/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* -------------------------------------------------------------------------- */
/*                              Payin Transfers                              */
/* -------------------------------------------------------------------------- */
export const get_reseller_payin_transaction = createAsyncThunk(
  "reseller/get_reseller_payin_transaction",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/reseller/merchants/get_transaction/${id}?mode=${mode}`,
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
export const get_reseller_payin_transaction_by_date = createAsyncThunk(
  "reseller/get_reseller_payin_transaction_by_date",
  async (
    { id, startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log("hit recieved");
    try {
      const { data } = await api.get(
        `/reseller/merchants/all_transaction/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

/* -------------------------------------------------------------------------- */
/*                              Payout Transfers                              */
/* -------------------------------------------------------------------------- */
export const get_reseller_payout_transfer = createAsyncThunk(
  "reseller/get_reseller_payout_transfer",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/reseller/merchants/get_transfer/${id}?mode=${mode}`,
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
export const get_reseller_payout_transfer_by_date = createAsyncThunk(
  "reseller/get_reseller_payout_transfer_by_date",
  async ({ id, startDate, endDate }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, mode } = await api.get(
        `/reseller/merchants/all_transfer/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

/* -------------------------------------------------------------------------- */
/*                               fundStatement                              */
/* -------------------------------------------------------------------------- */
export const get_reseller_payout_fundstatement = createAsyncThunk(
  "reseller/get_reseller_payout_fundstatement",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/reseller/merchants/get_fundstatement/${id}?mode=${mode}`,
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
export const get_reseller_payout_fundstatement_by_date = createAsyncThunk(
  "reseller/get_reseller_payout_fundstatement_by_date",
  async (
    { id, startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/reseller/merchants/all_fundstatement/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`,
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

const resellerSlice = createSlice({
  name: "reseller",
  initialState: {
    resellerMerchant: [],
    payinTransaction: [],
    payoutTransfer: [],
    fundStatement: [],
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
      .addCase(create_merchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        console.log("payoad from reseller reducer ", payload);
        state.resellerMerchant = [...state.resellerMerchant, payload.data]; //update the array with new items
        // state.resellerMerchant = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(create_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(create_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        // state.resellerMerchant = [];

        console.log("payload", payload);
        state.errorMessage = payload?.error;
      })
      // ----------------------------->> fetch_todays_transaction
      .addCase(
        get_reseller_payin_transaction.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          // console.log(payload.transactionData);
          state.payinTransaction = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(get_reseller_payin_transaction.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(
        get_reseller_payin_transaction.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.payinTransaction = [];
          console.log("payload", payload);
          state.errorMessage = payload?.error;
        }
      )

      // ---->>>>>  toggle merchant
      .addCase(toggle_activate_merchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = payload.message;
      })
      .addCase(toggle_activate_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(toggle_activate_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })

      // >>>>>>>>> GET PAYIN TRANSACTION BY DATE
      .addCase(
        get_reseller_payin_transaction_by_date.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.payinTransaction = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_reseller_payin_transaction_by_date.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_reseller_payin_transaction_by_date.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.payinTransaction = [];
          state.errorMessage = payload?.error;
        }
      )

      /* -------------------------------------------------------------------------- */
      /*                               payout Transfer                              */
      /* -------------------------------------------------------------------------- */

      .addCase(get_reseller_payout_transfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.payoutTransfer = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_reseller_payout_transfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_reseller_payout_transfer.rejected, (state, { payload }) => {
        state.loader = false;
        state.payoutTransfer = [];
        state.errorMessage = payload?.error;
      })

      .addCase(
        get_reseller_payout_transfer_by_date.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.payoutTransfer = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_reseller_payout_transfer_by_date.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_reseller_payout_transfer_by_date.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.payoutTransfer = [];
          state.errorMessage = payload?.error;
        }
      )

      /* -------------------------------------------------------------------------- */
      /*                             Resellers merchant                             */
      /* -------------------------------------------------------------------------- */
      .addCase(get_reseller_merchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.resellerMerchant = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_reseller_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_reseller_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.resellerMerchant = [];
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                                fundStatement                               */
      /* -------------------------------------------------------------------------- */
      .addCase(
        get_reseller_payout_fundstatement_by_date.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.fundStatement = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_reseller_payout_fundstatement_by_date.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_reseller_payout_fundstatement_by_date.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.fundStatement = [];
          state.errorMessage = payload?.error;
        }
      )

      .addCase(
        get_reseller_payout_fundstatement.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.fundStatement = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_reseller_payout_fundstatement.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_reseller_payout_fundstatement.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.fundStatement = [];
          state.errorMessage = payload?.error;
        }
      );
  },
});

export const { messageClear } = resellerSlice.actions;
export default resellerSlice.reducer;
