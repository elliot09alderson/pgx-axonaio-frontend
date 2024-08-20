import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "../sidebar/RootLayout.jsx";

import ResellerAdminDashboard from "./ResellerAdminDashboard.jsx";
import MerchantWiseTransaction from "./MerchantWiseTransaction.jsx";
import ManageRAdminMerchant from "./ManageRAdminMerchant.jsx";
import ManageRAdminReseller from "./ManageRAdminReseller.jsx";
import ResellerWiseTransaction from "./ResellerWiseTransaction.jsx";
import ResellerWiseFundStatement from "./ResellerWiseFundStatement.jsx";
import MerchantWiseFundStatement from "./MerchantWiseFundStatement.jsx";
import MerchantWiseTransfer from "./MerchantWiseTransfer.jsx";

// ******* LAZY imports ******

const RADBC = () => {
  return (
    <RootLayout>
      {/* Dynamic Routes */}

      <Routes>
        <Route path="dashboard" element={<ResellerAdminDashboard />} />
        {/* <Route path="transactions" element={<MerchantWiseTransaction />} /> */}
        <Route path="managemerchant" element={<ManageRAdminMerchant />} />
        <Route path="managereseller" element={<ManageRAdminReseller />} />
        <Route
          path="merchant/transactions"
          element={<MerchantWiseTransaction />}
        />
        <Route path="merchant/transfers" element={<MerchantWiseTransfer />} />
        <Route
          path="merchant/fundstatement"
          element={<MerchantWiseFundStatement />}
        />
        <Route
          path="reseller/transactions"
          element={<ResellerWiseTransaction />}
        />
        <Route
          path="reseller/fundstatement"
          element={<ResellerWiseFundStatement />}
        />

        {/*  <Route path="merchantpricing" element={<PriceListMerchantWise />} />
        <Route path="commission" element={<CommisiionDetails />} />
        <Route path="settlement" element={<SettlementPage />} />
        <Route path="billing" element={<Billing />} />
        <Route path="profile" element={<ResellerProfile />} />
       */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </RootLayout>
  );
};

export default RADBC;
