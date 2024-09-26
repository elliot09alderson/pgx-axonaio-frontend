import React, { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import RootLayout from "./sidebar/RootLayout.jsx";

import CommonSetting from "./Dashboard Components/OtherComponents/CommonSetting";
import PgTransaction from "./Dashboard Components/pg/PayinTransaction.jsx";
import PgOrders from "./Dashboard Components/pg/PgOrders.jsx";
import LiveSettlement from "./Dashboard Components/pg/LiveSettlement.jsx";
import LiveRefund from "./Dashboard Components/pg/LiveRefund.jsx";
import PayoutStatement from "./Dashboard Components/payout/PayoutStatement.jsx";
import QuickTransfer from "./Dashboard Components/payout/QuickTransfer.jsx";
import BulkTransfer from "./Dashboard Components/payout/BulkTransfer.jsx";
import Apikeys from "./Dashboard Components/payout/ApiKeys.jsx";
import Webhook from "./Dashboard Components/payout/WebHook.jsx";
import IpWhiteList from "./Dashboard Components/payout/IpWhiteList.jsx";
import PgChargeback from "./Dashboard Components/pg/PgChargeback.jsx";
import PayinSettings from "./Dashboard Components/pg/PayinSettings.jsx";
import PayoutSettings from "./Dashboard Components/payout/PayoutSettings.jsx";
import PayoutTransfer from "./Dashboard Components/payout/PayoutTransfer.jsx";

import PayoutDashboard from "./Dashboard Components/DashboardPayout/PayoutDashboard.jsx";
import PayinDashboard from "./Dashboard Components/DashboardPayin/PayinDashboard.jsx";
import PayInCases from "./Dashboard Components/pg/PayInCases.jsx";
import { useSelector } from "react-redux";
import SideBarX from "./sidebar2/SideBarX.jsx";

// ******* LAZY imports ******
const BigSideBar = lazy(() =>
  import("./Dashboard Components/SideBars/BigSideBar")
);
const Summary = lazy(() =>
  import("./Dashboard Components/DashboardPayin/Summary")
);
const Profile = lazy(() =>
  import("./Dashboard Components/OtherComponents/Profile.jsx")
);
const Account = lazy(() =>
  import("./Dashboard Components/DashboardPayout/Account.jsx")
);
const TransactionPayout = lazy(() =>
  import("./Dashboard Components/DashboardPayout/TransactionPayout.jsx")
);
const FundStatement = lazy(() =>
  import("./Dashboard Components/DashboardPayout/FundStatement")
);
const Benificiary = lazy(() =>
  import("./Dashboard Components/payout/Benificiary.jsx")
);
const ResellerSummary = lazy(() =>
  import("./Dashboard Components/ReSeller/Summary.jsx")
);
const ManageEmployee = lazy(() =>
  import("./Dashboard Components/ReSeller/ManageEmp")
);
const ManageMerchant = lazy(() =>
  import("./Dashboard Components/ReSeller/ManageMerchant")
);
const ResellerPayIn = lazy(() =>
  import("./Dashboard Components/ReSeller/ResellerPayin/PayIn.jsx")
);
const ResellerPayOut = lazy(() =>
  import("./Dashboard Components/ReSeller/PayOut")
);

const DBC = () => {
  const { mode, currentUser } = useSelector((state) => state.user);

  const PermissionProtector = ({
    permissions,
    requiredPermission,
    children,
    isTestMode,
  }) => {
    console.log("permissions", permissions);
    console.log("requiredPermission", requiredPermission);
    const location = useLocation();
    console.log("isTestMode===>", isTestMode);

    // if (!isTestMode) {
    //   console.log("xy222zzzzzzzz");
    //   if (!permissions?.includes(requiredPermission)) {
    //     console.log("xxxxxxxxxxx fek do");
    //     return <Navigate to="/reseller404" state={{ from: location }} />;
    //   }
    // }

    return children;
  };

  return (
    <SideBarX>
      {/* Dynamic Routes */}

      <Routes>
        <Route path="pg/apps" element={<AllApps />} />
        <Route
          path="pg/dashboard"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <Summary />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/dashboard"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PayinDashboard />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/transactions"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PgTransaction />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/orders"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PgOrders />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/settlements"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <LiveSettlement />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/chargebacks"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PgChargeback />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/settings"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PayinSettings />
            </PermissionProtector>
          }
        />
        /*
        --------------------------------------------------------------------------
        */ /* api pending */ /*👇👇
        --------------------------------------------------------------------------
        */
        <Route
          path="payin/refunds"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <LiveRefund />
            </PermissionProtector>
          }
        />
        <Route
          path="payin/cases"
          element={
            <PermissionProtector
              permissions={currentUser?.app_permissions}
              requiredPermission="payin"
              isTestMode={mode == "test" ? true : false}
            >
              <PayInCases />
            </PermissionProtector>
          }
        />
        /*
        --------------------------------------------------------------------------
        */
        <Route path="payout/dashboard" element={<PayoutDashboard />} />
        <Route path="payout/settings" element={<PayoutSettings />} />
        <Route path="payout/transfer" element={<PayoutTransfer />} />
        <Route path="payout/beneficiary" element={<Benificiary />} />
        <Route path="payout/fundstatement" element={<PayoutStatement />} />
        <Route path="payout/quicktransfer" element={<QuickTransfer />} />
        <Route path="payout/bulktransfer" element={<BulkTransfer />} />
        <Route path="payout/apikeys" element={<Apikeys />} />
        <Route path="payout/webhook" element={<Webhook />} />
        <Route path="payout/ipwhitelist" element={<IpWhiteList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="menu2/submenu2" element={<Stroage />} />
        <Route path="menu2/submenu1" element={<Settings />} />
        <Route path="menu1/submenu1" element={<Build />} />
        <Route path="menu1/submenu2" element={<Analytics />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </SideBarX>
  );
};

export default DBC;
