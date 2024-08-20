import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "./sidebar/RootLayout.jsx";

import ResellerDashboard from "./Reseller/ResellerDashboard.jsx";
import MerchantWiseTransaction from "./Reseller/MerchantWiseTransaction.jsx";
import PriceListMerchantWise from "./Reseller/PriceListMerchantWise.jsx";
import SettlementPage from "./Reseller/SettlementPage.jsx";
import CommisiionDetails from "./Reseller/CommisiionDetails.jsx";
import Billing from "./Reseller/Billing.jsx";
import ResellerProfile from "./Reseller/ResellerProfile.jsx";
import ManageMerchant from "./Reseller/ManageMerchant.jsx";
import MerchantWiseTransfer from "./Reseller/MerchantWiseTransfer.jsx";
import MerchantWiseFundStatement from "./Reseller/MerchantWiseFundStatement.jsx";
// import ResellerLayout from "./sidebar/ResellerLayout.jsx";

// ******* LAZY imports ******

const RDBC = () => {
  return (
    <RootLayout>
      {/* Dynamic Routes */}

      <Routes>
        <Route path="dashboard" element={<ResellerDashboard />} />
        <Route path="transactions" element={<MerchantWiseTransaction />} />
        <Route path="transfers" element={<MerchantWiseTransfer />} />
        <Route path="statements" element={<SettlementPage />} />
        <Route path="fundstatement" element={<MerchantWiseFundStatement />} />

        <Route path="merchantpricing" element={<PriceListMerchantWise />} />
        <Route path="commission" element={<CommisiionDetails />} />
        <Route path="billing" element={<Billing />} />
        {/* <Route path="profile" element={<ResellerProfile />} /> */}
        <Route path="managemerchant" element={<ManageMerchant />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </RootLayout>
  );
};

export default RDBC;
