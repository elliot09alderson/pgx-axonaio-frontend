import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//  #  [ for getting the whitelist ip ]
export const get_whitelist_ip = createAsyncThunk(
  "whitelist/get_whitelist_ip",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwhitelist/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  #  [ for creating the whitelist ip ]
export const create_whitelist_ip = createAsyncThunk(
  "whitelist/create_whitelist_ip",
  async ({ ip, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwhitelist/create?mode=${mode}`;
      const { data } = await api.post(
        url,
        { ip_address: ip },
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

//  #  [ for creating the whitelist ip ]
export const edit_whitelist_ip = createAsyncThunk(
  "whitelist/edit_whitelist_ip",
  async (
    { id, editwhitelist, mode },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      let url = `/outwhitelist/update/${id}?mode=${mode}`;
      const { data } = await api.put(url, editwhitelist, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//  #  [ for deleting the whitelist ip ]
export const delete_whitelist_ip = createAsyncThunk(
  "whitelist/delete_whitelist_ip",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwhitelist/delete/${id}?mode=${mode}`;
      const { data } = await api.delete(url, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  #  [ for getting the api keys ]
export const get_api_keys = createAsyncThunk(
  "apikeys/get_api_keys",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outapikeys/fetch?mode=${mode}`;

      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// #  [ for generating the api keys ]
export const generate_api_keys = createAsyncThunk(
  "apikeys/generate_api_keys",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outapikeys/create?mode=${mode}`;

      const { data } = await api.put(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// #  [ for getting the webhook data ]
export const get_webhook_data = createAsyncThunk(
  "webhooks/get_webhook_data",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwebhook/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// #  [ for creating the webhook data ]
export const create_webhook_data = createAsyncThunk(
  "webhooks/create_webhook_data",
  async ({ webhookData, mode }, { fulfillWithValue, rejectWithValue }) => {
    // console.log(webhookData);
    try {
      let url = `/outwebhook/create?mode=${mode}`;

      const { data } = await api.post(url, webhookData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// #  [ for updating the webhook data ]

export const edit_webhook_data = createAsyncThunk(
  "webhook/edit_webhook_ip",
  async ({ id, editwebhook, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwebhook/update/${id}?mode=${mode}`;
      const { data } = await api.put(url, editwebhook, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// #  [ for deleting the webhook data ]
export const delete_webhook_data = createAsyncThunk(
  "webhooks/delete_webhook_data",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/outwebhook/delete/${id}?mode=${mode}`;

      const { data } = await api.delete(url, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const payoutSettingSlice = createSlice({
  name: "payoutSettings",
  initialState: {
    whitelistData: [],
    keysData: [],
    webhookData: [],
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
      //----------> [ get whitelist ]-------------------->
      .addCase(get_whitelist_ip.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.whitelistData = payload.data;
        state.errorMessage = "";
        state.successMessage = payload.message;
      })
      .addCase(get_whitelist_ip.pending, (state, { payload }) => {
        state.errorMessage = "";
        state.loader = true;
      })
      .addCase(get_whitelist_ip.rejected, (state, { payload }) => {
        // state.error = payload.error;
        console.log("error whhite fetching whitelist");
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      //----------> [ create whitelist ]-------------------->
      .addCase(create_whitelist_ip.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.whitelistData = [...state.whitelistData, payload.data];

        state.successMessage = payload.message;
      })
      .addCase(create_whitelist_ip.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(create_whitelist_ip.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      //----------> [ delete whitelist ]-------------------->
      // .addCase(edit_whitelist_ip.fulfilled, (state, { payload }) => {
      //   state.loader = false;
      //   console.log(payload);
      //   // state.whitelistData = state.whitelistData.filter(
      //   //   (item) => item._id !== payload.id
      //   // );
      //   // console.log(payload.webhookData);
      //   // state.whitelistData = payload.whitelistData;
      //   state.successMessage = payload.message;
      // })
      // .addCase(edit_whitelist_ip.pending, (state, { payload }) => {
      //   state.loader = true;
      // })
      // .addCase(edit_whitelist_ip.rejected, (state, { payload }) => {
      //   state.loader = false;
      //   console.log("payload", payload);
      //   state.errorMessage = payload?.error;
      // })
      // ----------> [ delete whitelist ]-------------------->
      .addCase(delete_whitelist_ip.fulfilled, (state, { payload }) => {
        state.loader = false;
        console.log(payload);
        state.whitelistData = state.whitelistData.filter(
          (item) => item._id !== payload.data._id
        );

        state.successMessage = payload.message;
      })
      .addCase(delete_whitelist_ip.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(delete_whitelist_ip.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      // //----------> [ get webhook data ]-------------------->

      .addCase(get_webhook_data.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.webhookData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_webhook_data.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_webhook_data.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })

      // #------------ >[  create webhook data  ]  < ----------------
      .addCase(create_webhook_data.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.webhookData = [...state.webhookData, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(create_webhook_data.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(create_webhook_data.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })

      // ?-----------------------------------------------------
      //----------> important working things
      .addCase(generate_api_keys.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.keysData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(generate_api_keys.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(generate_api_keys.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = payload?.error;
      })
      // -----------------------------------------------------------------
      .addCase(get_api_keys.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.keysData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_api_keys.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_api_keys.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      });
  },
});

export const { messageClear } = payoutSettingSlice.actions;
export default payoutSettingSlice.reducer;
