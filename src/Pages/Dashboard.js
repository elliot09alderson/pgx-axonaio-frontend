import axios from "axios";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure } from "../redux/userRedux";
import onFailure from "../utils/error";
import { RiAppsFill } from "react-icons/ri";
import "./dashboard.css";
import { RiMenuUnfoldFill } from "react-icons/ri";
import {
  NavLogoDiv,
  DropdownDiv,
  DropDownunList,
  DropList,
} from "./Application";
import { BASE_URL } from "../utils/requestMethod";
import { Data, graphBarData, SettlementData, TableData } from "../dummy/Data";
import { TabData } from "../dummy/TabData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DownData, UpperData } from "../dummy/IconData";
import TransactionComponent from "../components/dashboardComponent/TransactionComponent";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SettlementComponent from "../components/dashboardComponent/SettlementComponent";
import ReportComponent from "../components/dashboardComponent/ReportComponent";
import PaymentLinkComponent from "../components/dashboardComponent/PaymentLinkComponent";
import { FaUserTie, FaBell } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

import CommonSetting from "./Dashboard Components/OtherComponents/CommonSetting";

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
// const Benificiary = lazy(() =>
//   import("./Dashboard Components/DashboardPayout/Benificiary")
// );
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
// NAVBAR Navbar
const MyNav = ({ isDropdownOpend, DropDownlist, toggleDropDown, children }) => {
  return (
    <div
      className={`sm:flex flex sm:sticky relative w-full px-5 z-30 top-0 sm:flex-row flex-col items-center transition-all sm:backdrop-blur-lg shadow-md`}
    >
      <div className="flex sm:gap-5 gap-2 py-1  flex-col sm:flex-row items-center w-full  sm:justify-between ">
        {children}
        <div className="p-2  flex gap-5 relative">
          <BiSolidMessageSquareDetail
            size={36}
            className="cursor-pointer p-2  hover:opacity-80 transition-all   shadow-md rounded-full"
          />
          <FaUserTie
            className=" hover:opacity-80 transition-all 
            cursor-pointer shadow-md rounded-full p-1.5"
            size={36}
            onClick={() => toggleDropDown()}
          />
          {isDropdownOpend ? (
            <DropdownDiv className="rounded-lg top-10 left-8 ">
              <DropDownunList className="rounded-lg" onClick={toggleDropDown}>
                {DropDownlist()}
              </DropDownunList>
            </DropdownDiv>
          ) : (
            false
          )}
          <FaBell
            size={36}
            className="cursor-pointer p-2 hover:opacity-80 transition-all   shadow-md rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// left Small NAvBar
function LeftIconSubDiv({
  UpperData,
  handleIconBarActions,
  toggleSlider,
  stretch,
}) {
  return (
    <div
      className={`fixed  fourth-text overflow-hidden LeftIconSubDiv select-none transition-all duration-500 sub-nav w-[13vw] ${
        stretch ? "sm:w-64 second-bg" : "sm:w-12 first-bg sm:hover:w-48"
      } z-50 left-0 top-0  float-left h-full third-text text-center items-center flex flex-col justify-between py-3 shadow-xl`}
    >
      <div className="flex w-full flex-col transition-all mt-4 gap-6">
        {
          <div
            className="flex self-center sm:hidden"
            onClick={(e) => toggleSlider(e)}
          >
            <RiMenuUnfoldFill size={24} />
          </div>
        }{" "}
        {UpperData.map((item, i) => {
          return i === 0 ? (
            <div
              key={item.id}
              className={`flex items-center sm:hover:translate-x-6 hover:scale-110 hover-text-first  cursor-pointer duration-700  transition-all ${
                stretch
                  ? "sm:ml-12 sm:gap-12 sm:justify-start justify-center"
                  : " gap-4 justify-center"
              }`}
              onClick={() => handleIconBarActions(item.id)}
            >
              <RiAppsFill
                className="shadow-sm"
                size={30}
                data-toggle="tooltip"
                data-placement="top"
                title={item.title}
              />
              <h2
                className={`sub-nav-text capitalize ${
                  stretch ? "sm:block hidden" : "hidden"
                } sm:text-base text-sm text-left m-0 `}
              >
                {item.title}
              </h2>
            </div>
          ) : (
            <div
              onClick={() => handleIconBarActions(item.id)}
              key={item.id}
              className={`flex items-center sm:hover:translate-x-6 hover:scale-110 hover-text-first  cursor-pointer duration-700  transition-all ${
                stretch
                  ? "sm:ml-12 sm:gap-12 sm:justify-start justify-center"
                  : " gap-4 justify-center"
              }`}
            >
              <FontAwesomeIcon
                className="self-center text-xl shadow-sm p-1"
                icon={item.icon}
                data-toggle="tooltip"
                data-placement="top"
                title={item.title}
              />
              <h2
                className={`sub-nav-text  capitalize ${
                  stretch ? "sm:block hidden" : "hidden"
                } sm:text-base text-sm text-left m-0`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="flex w-full flex-col transition-all gap-6">
        {DownData.map((item) => {
          return (
            <div
              onClick={() => handleIconBarActions(item.id)}
              key={item.id}
              className={`flex items-center   sm:hover:translate-x-6 hover-text-first hover:scale-110  cursor-pointer duration-700  transition-all ${
                stretch
                  ? "sm:ml-12 sm:gap-12 sm:justify-start justify-center"
                  : " gap-4 justify-center"
              }`}
            >
              <FontAwesomeIcon
                className="  text-xl p-1 shadow-sm"
                icon={item.icon}
                data-toggle="tooltip"
                data-placement="top"
                title={item.title}
              />
              <h2
                className={`sub-nav-text  capitalize ${
                  stretch ? "sm:block hidden" : "hidden"
                }   sm:text-base text-sm text-left m-0`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeftDiv({ children }) {
  return (
    <div className=" sm:w-[32%] md:w-[30%] lg:w-[24%] w-[13vw] xl:w-[20vw] ">
      {children}
    </div>
  );
}
function RightDiv({ children }) {
  return (
    <div className="border sm:w-[68%] md:w-[70%] lg:w-[76%] w-[87vw] xl:w-[80vw] ">
      {children}
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDataa, setUserData] = useState(graphBarData(Data, "amount"));

  const [isDropdownOpend, setDropdownOpen] = useState(false);
  const list = ["profile", "logout"];
  const dispatch = useDispatch();
  const toggleDropDown = () => setDropdownOpen(!isDropdownOpend);
  const [slider, setSlider] = useState(false);
  const [paymode, setPaymode] = useState("payIn");

  useEffect(() => {
    if (location.pathname.includes("/payout/")) {
      setPaymode("payOut");
    }
    if (location.pathname.includes("/reseller/")) {
      setPaymode("reseller");
    }
  }, []);
  // Calendar

  function toggleSlider(e) {
    // setActive(e);
    setSlider(!slider);
  }

  const handleChange = async (index) => {
    if (Number(index) === 0) {
      setPaymode("profile");
    }
    if (Number(index) === 1) {
      try {
        const res = await axios.post(`${BASE_URL}/user/logout`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
          },
        });
        if (res.data) {
          localStorage.removeItem("is_logged_in");
          dispatch(loginFailure());
          navigate("/merchants/login");
        }
      } catch (error) {
        console.log(error);
        onFailure(error, dispatch);
      }
    }
  };

  const DropDownlist = () =>
    list.map((el, index) => (
      <DropList key={index} onClick={() => handleChange(index)}>
        {el}
      </DropList>
    ));

  function handleIconBarActions(idx) {
    if (idx === 1) {
      navigate("/merchants/apps");
      console.log("navigating to apps");
    }
    if (idx === 2) {
      navigate("/merchants/payin/summary");
      setPaymode("payOut");
    }
    if (idx === 3) {
      navigate("/merchants/payout/transaction");
      setPaymode("payOut");
    }
    if (idx === 4) {
      setPaymode("reseller");
      navigate("/merchants/reseller/summary");
    }
    if (idx === 2) {
      setPaymode("payIn");
    }
    if (idx === 5) {
      setPaymode("settings");
    }
    if (idx === 7) {
      setPaymode("profile");
    }
  }

  return (
    <div className={`w-[100%] h-full flex `}>
      <>
        <LeftDiv>
          <LeftIconSubDiv
            stretch={paymode === "settings" || paymode === "profile"}
            handleIconBarActions={handleIconBarActions}
            UpperData={UpperData}
            toggleSlider={toggleSlider}
          />

          {paymode !== "settings" && paymode !== "profile" && (
            <BigSideBar
              paymode={paymode}
              slider={slider}
              toggleSlider={toggleSlider}
            />
          )}
        </LeftDiv>
      </>

      {(paymode === "payIn" ||
        paymode === "payOut" ||
        paymode === "reseller") && (
        <RightDiv>
          <MyNav
            isDropdownOpend={isDropdownOpend}
            DropDownlist={DropDownlist}
            toggleDropDown={toggleDropDown}
          >
            <NavLogoDiv>
              {location.pathname.includes("payin/summary")
                ? "Ip Adress"
                : location.pathname.includes("payin/transaction")
                ? "Transaction"
                : location.pathname.includes("payin/settlement")
                ? "Settlement"
                : location.pathname.includes("payin/reports")
                ? "Reports"
                : location.pathname.includes("payin/paymentlink")
                ? "Payment Links"
                : location.pathname.includes("payout/transaction")
                ? "Transaction"
                : location.pathname.includes("payout/beneficiariy")
                ? "Beneficiary"
                : location.pathname.includes("payout/account")
                ? "Account"
                : location.pathname.includes("payout/fund-settlement")
                ? "Fund Statement"
                : ""}
            </NavLogoDiv>
          </MyNav>

          {/* <RootLayout>

      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/menu2/submenu2" element={<Stroage />} />
        <Route path="/menu2/submenu1" element={<Settings />} />
        <Route path="/menu1/submenu1" element={<Build />} />
        <Route path="/menu1/submenu2" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </RootLayout> */}

          <Suspense fallback={<h1>loading ...</h1>}>
            <Routes>
              <Route path="myprofile" element={<ManageEmployee />} />

              <Route
                path="reseller/manage-employee"
                element={<ManageEmployee />}
              />
              <Route path="reseller/summary" element={<ResellerSummary />} />
              <Route
                path="reseller/manage-merchant"
                element={<ManageMerchant />}
              />
              <Route path="reseller/payin" element={<ResellerPayIn />} />

              <Route path="reseller/payout" element={<ResellerPayOut />} />

              <Route
                path="payout/transaction"
                element={<TransactionPayout />}
              />
              {/* <Route path="payout/beneficiariy" element={<Benificiary />} /> */}
              <Route path="payout/account" element={<Account />} />
              <Route
                path="payout/fund-settlement"
                element={<FundStatement />}
              />
              <Route
                path="payin/summary"
                element={<Summary userDataa={userDataa} />}
              />
              <Route
                path="payin/transaction"
                element={
                  <TransactionComponent
                    TabData={TabData}
                    TableData={TableData}
                  />
                }
              />
              <Route
                path="payin/settlement"
                element={
                  <SettlementComponent
                    data={[{ label: "Standerd" }]}
                    TableData={SettlementData}
                  />
                }
              />
              <Route
                path="payin/reports"
                element={<ReportComponent TableData={SettlementData} />}
              />
              <Route
                path="payin/paymentlink"
                element={<PaymentLinkComponent />}
              />
            </Routes>
          </Suspense>
        </RightDiv>
      )}

      {(paymode === "settings" || paymode === "profile") && (
        <RightDiv>
          <MyNav
            isDropdownOpend={isDropdownOpend}
            DropDownlist={DropDownlist}
            toggleDropDown={toggleDropDown}
          >
            <NavLogoDiv>
              <h2>Settings</h2>
            </NavLogoDiv>
          </MyNav>
          {paymode === "profile" && <Profile />}
          {paymode === "settings" && <CommonSetting />}
        </RightDiv>
      )}
    </div>
  );
}

export default Dashboard;
