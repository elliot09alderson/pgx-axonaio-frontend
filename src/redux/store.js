import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; //userReducer.reducer

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import transSlice from "./payin/transactionReducer.js";
import settleSlice from "./payin/settlementReducer.js";
import orderSlice from "./payin/OrderReducer.js";
import chargeSlice from "./payin/chargebackReducer.js";
import payInSettingSlice from "./payin/payInSettingReducer.js";
import payOutSettingSlice from "./payout/payoutSettingReducer.js";
import reseller_payinSlice from "./ResellerReducer/resellerPayinTransaction.js";
import thunk from "redux-thunk";
import fileuploadReducer from "./fileupload/fileuploadReducer.js";
import resellerSlice from "./ResellerReducer/resellerReducer.js";
import createMerchantSlice from "./registeration/registerationReducer.js";
import fetchDetails from "./reducers/fetchDetails/fetchDetails.js";
import refundSlice from "./payin/refundReducer.js";
import caseSlice from "./payin/payIncaseReducer.js";
import beneficiarySlice from "./payout/beneficiaryReducer.js";
import fundstatementSlice from "./payout/fundStatementReducer.js";
import transferSlice from "./payout/transferReducer.js";
import resellerAdminSlice from "./resellerAdmin/resellerAdmin.js";
import appSlice from "./apps/appSlice.js";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    createmerchant: createMerchantSlice,
    fileUpload: fileuploadReducer,

    /* -------------------------------------------------------------------------- */
    /*                                    apps                                   */
    /* -------------------------------------------------------------------------- */

    app: appSlice,

    /* -------------------------------------------------------------------------- */
    /*                                    payin                                   */
    /* -------------------------------------------------------------------------- */
    transaction: transSlice,
    resellerpayin: reseller_payinSlice,
    order: orderSlice,
    settlement: settleSlice,
    chargeback: chargeSlice,
    payinsettings: payInSettingSlice,
    reseller: resellerSlice,
    details: fetchDetails,
    refund: refundSlice,
    case: caseSlice,

    /* -------------------------------------------------------------------------- */
    /*                                    payout                                   */
    /* -------------------------------------------------------------------------- */
    payoutsettings: payOutSettingSlice,
    transfer: transferSlice,
    beneficiary: beneficiarySlice,
    fundstatement: fundstatementSlice,
    /* -------------------------------------------------------------------------- */
    /*                                 reseller admin                                  */
    /* -------------------------------------------------------------------------- */
    reselleradmin: resellerAdminSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export let persistor = persistStore(store);
