// /reseller/merchants
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const create_radmin_reseller = createAsyncThunk(
  "radmin/create_radmin_reseller",
  async ({ values, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/ra-resellers/create?mode=${mode}`;
      const { data } = await api.post(url, values, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const create_radmin_merchant = createAsyncThunk(
  "radmin/create_radmin_merchant",
  async ({ values, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/ra-merchants/create?mode=${mode}`;
      const { data } = await api.post(url, values, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_radmin_reseller = createAsyncThunk(
  "radmin/get_radmin_reseller",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/ra-resellers/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggle_activate_merchant = createAsyncThunk(
  "radmin/toggle_activate_merchant",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/radmin/ra-merchants/toggle-account/${id}?mode=${mode}`;

      const { data } = await api.put(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const toggle_activate_reseller = createAsyncThunk(
  "radmin/toggle_activate_merchant",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/radmin/ra-resellers/toggle-account/${id}?mode=${mode}`;

      const { data } = await api.put(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_radmin_merchant = createAsyncThunk(
  "reseller/get_radmin_merchant",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/ra-merchants/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_radmin_resellers_merchant = createAsyncThunk(
  "reseller/get_radmin_resellers_merchant",
  async ({ rid, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/ra-merchants/${rid}?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                transactions                                */
/* -------------------------------------------------------------------------- */
export const get_radmin_today_transactions = createAsyncThunk(
  "radmin/get_radmin_today_transactions",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/get_transaction_by_ra/${id}?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_radmin_transactions_byDate = createAsyncThunk(
  "radmin/get_radmin_transactions_byDate",
  async (
    { id, startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      let url = `radmin/get_transaction_by_ra_date/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                transfers                                */
/* -------------------------------------------------------------------------- */
export const get_radmin_today_transfer = createAsyncThunk(
  "radmin/get_radmin_today_transfer",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/get_transfer_by_ra/${id}?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_radmin_transfer_byDate = createAsyncThunk(
  "radmin/get_radmin_transfer_byDate",
  async (
    { id, startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      let url = `radmin/get_transfer_by_ra_date/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                               fund statement                                */
/* -------------------------------------------------------------------------- */
export const get_radmin_today_fundstatement = createAsyncThunk(
  "radmin/get_radmin_today_fundstatement",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `radmin/get_fundstatement_by_ra/${id}?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_radmin_fundstatement_byDate = createAsyncThunk(
  "radmin/get_radmin_fundstatement_byDate",
  async (
    { id, startDate, endDate, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      let url = `radmin/get_fundstatement_by_ra_date/${id}?startDate=${startDate}&&endDate=${endDate}&&mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

const resellerAdminSlice = createSlice({
  name: "reselleradmin",
  initialState: {
    radminMerchants: [],
    radminResellers: [],
    resellerMerchants: [],
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
      /* -------------------------------------------------------------------------- */
      /*                                     Create Reseller                       */
      /* -------------------------------------------------------------------------- */
      .addCase(create_radmin_reseller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.radminResellers = [...state.radminResellers, payload.data]; //update the
        state.successMessage = payload.message;
      })
      .addCase(create_radmin_reseller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(create_radmin_reseller.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = payload?.error;
      })
      /* -------------------------------------------------------------------------- */
      /*                                     Create Merchant                       */
      /* -------------------------------------------------------------------------- */
      .addCase(create_radmin_merchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.radminMerchants = [...state.radminMerchants, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(create_radmin_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(create_radmin_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.radminMerchants = [];
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                              get Merchant                               */
      /* -------------------------------------------------------------------------- */
      .addCase(get_radmin_merchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.radminMerchants = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_radmin_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                              get Reseller                               */
      /* -------------------------------------------------------------------------- */
      .addCase(get_radmin_reseller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.radminResellers = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_radmin_reseller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_reseller.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      /* -------------------------------------------------------------------------- */
      /*                      get Reseller's merchant                               */
      /* -------------------------------------------------------------------------- */
      .addCase(
        get_radmin_resellers_merchant.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.resellerMerchants = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(get_radmin_resellers_merchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_resellers_merchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                           get transactions                               */
      /* -------------------------------------------------------------------------- */
      .addCase(
        get_radmin_today_transactions.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.payinTransaction = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(get_radmin_today_transactions.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_today_transactions.rejected, (state, { payload }) => {
        state.payinTransaction = [];
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      .addCase(
        get_radmin_transactions_byDate.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.payinTransaction = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(get_radmin_transactions_byDate.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(
        get_radmin_transactions_byDate.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.payinTransaction = [];

          state.errorMessage = payload?.error;
        }
      )

      /* -------------------------------------------------------------------------- */
      /*                           get transfers                               */
      /* -------------------------------------------------------------------------- */
      .addCase(get_radmin_today_transfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.payoutTransfer = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_radmin_today_transfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_today_transfer.rejected, (state, { payload }) => {
        state.payoutTransfer = [];
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      .addCase(get_radmin_transfer_byDate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.payoutTransfer = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_radmin_transfer_byDate.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_radmin_transfer_byDate.rejected, (state, { payload }) => {
        state.loader = false;
        state.payoutTransfer = [];

        state.errorMessage = payload?.error;
      })
      /* -------------------------------------------------------------------------- */
      /*                           get fundstatement                               */
      /* -------------------------------------------------------------------------- */
      .addCase(
        get_radmin_today_fundstatement.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.fundStatement = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(get_radmin_today_fundstatement.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(
        get_radmin_today_fundstatement.rejected,
        (state, { payload }) => {
          state.fundStatement = [];
          state.loader = false;
          state.errorMessage = payload?.error;
        }
      )
      .addCase(
        get_radmin_fundstatement_byDate.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = "";
          state.fundStatement = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        get_radmin_fundstatement_byDate.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        get_radmin_fundstatement_byDate.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.fundStatement = [];

          state.errorMessage = payload?.error;
        }
      );
  },
});

export const { messageClear } = resellerAdminSlice.actions;
export default resellerAdminSlice.reducer;
