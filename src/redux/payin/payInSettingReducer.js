import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//  #  [ for getting the whitelist ip ]
export const get_whitelist_ip = createAsyncThunk(
  "whitelist/get_whitelist_ip",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/inwhitelist/fetch?mode=${mode}`;
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
      console.log(ip);
      let url = `/inwhitelist/create?mode=${mode}`;
      const { data } = await api.post(
        url,
        { ip },
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
    { id, mode, editwhitelist },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      let url = `/inwhitelist/update/${id}?mode=${mode}`;
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
      let url = `/inwhitelist/delete/${id}?mode=${mode}`;
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
      let url = `/inapikeys/fetch?mode=${mode}`;

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
      let url = `/inapikeys/create?mode=${mode}`;

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
      let url = `/inwebhook/fetch?mode=${mode}`;
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
    try {
      let url = `/inwebhook/create?mode=${mode}`;

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
    console.log("editwebhook", editwebhook);
    try {
      let url = `/inwebhook/update/${id}?mode=${mode}`;
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
      let url = `/inwebhook/delete/${id}?mode=${mode}`;

      const { data } = await api.delete(url, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const payInSettingSlice = createSlice({
  name: "payinSettings",
  initialState: {
    whitelistData: [],
    keysData: {},
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
        state.successMessage = payload.message;
      })
      .addCase(get_whitelist_ip.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_whitelist_ip.rejected, (state, { payload }) => {
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

export const { messageClear } = payInSettingSlice.actions;
export default payInSettingSlice.reducer;
