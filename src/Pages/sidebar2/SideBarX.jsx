import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";

import { AnimatePresence, motion } from "framer-motion";
import SidebarMenuX from "./SidebarMenuX";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/sidebarEvent/sidebarEvent";
import { AiFillAppstore } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";

import { GiReturnArrow } from "react-icons/gi";
import { ImUserTie } from "react-icons/im";
import { VscGraph } from "react-icons/vsc";
import { MdBarChart } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import {
  ListOrdered,
  Repeat2,
  MonitorCog,
  OctagonAlert,
  Undo,
  ReceiptIndianRupee,
  Bell,
  MessageCircleQuestion,
  CircleUser,
  Settings2,
  Power,
} from "lucide-react";
import { BiTransferAlt } from "react-icons/bi";
import { AiOutlineFund } from "react-icons/ai";
import { useSnackbar } from "notistack";

import { MdAccountBalanceWallet } from "react-icons/md";
import Navbar from "../Navbar";
import { changeAppMode, loginFailure } from "../../redux/userRedux";
import { BASE_URL } from "../../utils/requestMethod.js";
import axios from "axios";
import onFailure from "../../utils/error.js";
import { Tooltip } from "flowbite-react";

import { MdVerifiedUser } from "react-icons/md";
import { useEffect } from "react";

const MerchantMenu = [
  {
    icon: VscGraph,
    name: "Dashboard",
    path: "/merchants/pg/dashboard",
    permission: "both",
  },
  {
    name: "Pay In",
    icon: FaHandHoldingUsd,
    path: "/merchants/payin/dashboard",
    permission: "payin",

    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "/merchants/payin/dashboard",
        permission: "payin",
        icon: MdBarChart,
      },
      {
        id: 1,
        name: "Transactions",
        path: "/merchants/payin/transactions",
        permission: "payin",
        icon: GiReceiveMoney,
      },
      {
        id: 1,
        name: "Orders",
        path: "/merchants/payin/orders",
        permission: "payin",
        icon: ListOrdered,
        submenus: [],
      },
      {
        id: 1,
        name: "Settlement",
        path: "/merchants/payin/settlements",
        permission: "payin",
        icon: Repeat2,
        submenus: [],
      },
      {
        id: 1,
        name: "Chargeback",
        path: "/merchants/payin/chargebacks",
        permission: "payin",
        icon: ReceiptIndianRupee,
        submenus: [],
      },
      {
        id: 2,
        name: "Refund",
        path: "/merchants/payin/refunds",
        permission: "payin",
        icon: Undo,
        submenus: [],
      },
      {
        id: 2,
        name: "Cases",
        path: "/merchants/payin/cases",
        permission: "payin",
        icon: OctagonAlert,
      },
      {
        id: 2,
        name: "Settings",
        path: "/merchants/payin/settings",
        permission: "payin",
        icon: MonitorCog,
      },
      // Add more menu items as needed
    ],
  },
  {
    name: "Payout",
    icon: GiReturnArrow,
    path: "/merchants/payout/dashboard",
    permission: "payout",

    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "/merchants/payout/dashboard",
        submenus: [],
        icon: MdBarChart,
        permission: "payout",
      },
      {
        id: 1,
        name: "Transfers",
        path: "/merchants/payout/transfer",
        permission: "payout",

        icon: BiTransferAlt,
      },

      {
        id: 1,
        name: "Fund Statement",
        path: "/merchants/payout/fundstatement",
        permission: "payout",
        icon: AiOutlineFund,
      },
      {
        id: 2,
        name: "Beneficiary",
        path: "/merchants/payout/beneficiary",
        permission: "payout",
        icon: MdAccountBalanceWallet,
      },

      {
        id: 2,
        name: "Settings",
        path: "/merchants/payout/settings",
        permission: "payout",
        icon: MonitorCog,
      },
    ],
  },
];

const ResellerMenu = [
  {
    name: "Reseller Suite",
    icon: ImUserTie,
    path: "/reseller/dashboard",
    permission: "both",
    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        icon: VscGraph,
        path: "dashboard",
        submenus: [],
      },
      {
        id: 2,
        name: "transactions",
        path: "transactions",
        submenus: [],
      },
      {
        id: 1,
        name: "Merchant Transfers",
        path: "transfers",
        submenus: [],
      },
      {
        id: 1,
        name: "Fund Statement",
        path: "fundstatement",
        submenus: [],
      },
      {
        id: 3,
        name: "Merchant Pricing",
        path: "merchantpricing",
        submenus: [],
      },
      {
        id: 4,
        name: "Commsiion Details",
        path: "commission",
        submenus: [],
      },

      // {
      //   id: 6,
      //   name: "Profile",
      //   path: "profile",
      //   submenus: [],
      // },
      // {
      //   id: 7,
      //   name: "Billing",
      //   path: "billing",
      //   submenus: [],
      // },
      {
        id: 8,
        name: "Manage Merchant",
        path: "managemerchant",
        submenus: [],
      },
    ],
  },

  ,
];
const ResellerAdminMenu = [
  {
    icon: AiFillAppstore,
    name: "Apps",
    path: "/merchant/user/apps",
    subRoutes: [
      {
        id: 1,
        name: "Collection",
      },
      {
        id: 2,
        name: "Pay Out",
      },
    ],
  },
  {
    icon: MdSpaceDashboard,
    name: "Merchant Dashboard",
    path: "/merchants/pg/dashboard",
    permission: "payin",
  },

  {
    name: "Reseller Admin",
    icon: ImUserTie,
    path: "/radmin/dashboard",
    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "dashboard",
        submenus: [],
      },
      {
        id: 2,
        name: "Merchant transactions",
        path: "merchant/transactions",
        permission: "payin",

        submenus: [],
      },
      {
        id: 2,
        name: "Merchant transfers",
        path: "merchant/transfers",
        permission: "payout",

        submenus: [],
      },
      {
        id: 2,
        name: "Merchant fundstatement",
        path: "merchant/fundstatement",
        permission: "payout",

        submenus: [],
      },

      {
        id: 3,
        name: "Merchant Pricing",
        path: "merchantpricing",
        submenus: [],
      },
      {
        id: 4,
        name: "Commsiion Details",
        path: "commission",
        submenus: [],
      },
      {
        id: 5,
        name: "reseller transactions",
        path: "reseller/transactions",
        permission: "payin",

        submenus: [],
      },
      {
        id: 5,
        name: "reseller fundstatement",
        path: "reseller/fundstatement",
        permission: "payout",

        submenus: [],
      },

      // {
      //   id: 6,
      //   name: "Profile",
      //   path: "profile",
      //   submenus: [],
      // },
      {
        id: 7,
        name: "Manage Reseller",
        path: "managereseller",
        submenus: [],
      },
      {
        id: 8,
        name: "Manage Merchant",
        path: "managemerchant",
        submenus: [],
      },
    ],
  },
  // {
  //   name: " Verification Suite",
  //   icon: MdVerifiedUser,
  //   path: "/user/vsuite",
  //   subRoutes: [
  //     {
  //       id: 1,
  //       name: "PAN",
  //       path: "vsuite/pan",
  //     },
  //     {
  //       id: 2,
  //       name: "Adhaar",
  //       path: "vsuite/adhaar",
  //       submenus: [],
  //     },
  //     {
  //       id: 2,
  //       name: "Account",
  //       submenus: [{ id: 3, name: "Penny drop", path: "/menu2/submenu1" }],
  //     },

  //     {
  //       id: 2,
  //       name: "Settings",

  //       submenus: [
  //         { id: 3, name: "Api Keys g", path: "/menu2/submenu1" },
  //         { id: 4, name: "Webhook", path: "/menu2/submenu2" },
  //         { id: 4, name: "Ip Whitelist", path: "/menu2/submenu2" },
  //       ],
  //     },
  //   ],
  // },
  ,
];
const ResellerMerchantMenu = [
  {
    icon: AiFillAppstore,
    name: "Apps",
    path: "/merchant/user/apps",
  },
  {
    icon: MdSpaceDashboard,
    name: "Merchant Dashboard",
    path: "/merchants/pg/dashboard",
    permission: "payin",
  },
  {
    name: "Pay In",
    icon: FaHandHoldingUsd,
    path: "/merchants/payin/dashboard",
    permission: "payin",

    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "/merchants/payin/dashboard",
        permission: "payin",
        icon: VscGraph,

        submenus: [],
      },
      {
        id: 1,
        name: "Transactions",
        path: "/merchants/payin/transactions",
        submenus: [],
        permission: "payin",
        icon: GiReceiveMoney,
      },
      {
        id: 1,
        name: "Orders",
        path: "/merchants/payin/orders",
        permission: "payin",
        icon: ListOrdered,

        submenus: [],
      },
      {
        id: 1,
        name: "Settlement",
        path: "/merchants/payin/settlements",
        permission: "payin",
        icon: Repeat2,

        submenus: [],
      },
      {
        id: 1,
        name: "Chargeback",
        path: "/merchants/payin/chargebacks",
        permission: "payin",
        icon: ReceiptIndianRupee,

        submenus: [],
      },
      {
        id: 2,
        name: "Refund",
        path: "/merchants/payin/refunds",
        permission: "payin",
        icon: Undo,

        submenus: [],
      },
      {
        id: 2,
        name: "Cases",
        path: "/merchants/payin/cases",
        permission: "payin",
        icon: OctagonAlert,

        submenus: [],
      },
      {
        id: 2,
        name: "Settings",
        path: "/merchants/payin/settings",
        permission: "payin",
        icon: MonitorCog,

        submenus: [],
      },
      // Add more menu items as needed
    ],
  },
  {
    name: "Payout",
    icon: GiReturnArrow,
    path: "/merchants/payout/dashboard",
    permission: "payout",

    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        permission: "payout",
        icon: MdBarChart,

        path: "/merchants/payout/dashboard",
        submenus: [],
      },
      {
        id: 1,
        name: "Transfers",
        path: "/merchants/payout/transfer",
        permission: "payout",
        icon: BiTransferAlt,

        submenus: [],
      },
      {
        id: 1,
        name: "Fund Statement",
        path: "/merchants/payout/fundstatement",
        permission: "payout",
        icon: AiOutlineFund,

        submenus: [],
      },
      {
        id: 2,
        name: "Beneficiary",
        path: "/merchants/payout/beneficiary",
        permission: "payout",
        icon: MdAccountBalanceWallet,

        submenus: [],
      },
      // {
      //   id: 2,
      //   name: "Accounts",
      //   submenus: [],
      // },

      {
        id: 2,
        name: "Settings",
        path: "/merchants/payout/settings",
        permission: "payout",
        icon: MonitorCog,

        submenus: [],
      },
    ],
  },

  {
    name: "Reseller Suite",
    icon: ImUserTie,

    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "/reseller/dashboard",
        submenus: [],
      },
      {
        id: 2,
        name: "Transactions",
        path: "/reseller/transactions",
        submenus: [],
      },
      {
        id: 1,
        name: "Merchant Transfers",
        path: "/reseller/transfers",
        submenus: [],
        permission: "payin",
      },
      {
        id: 1,
        name: "Fund Statement",
        path: "/reseller/fundstatement",
        submenus: [],
        permission: "payout",
      },
      {
        id: 3,
        name: "Merchant Pricing",
        path: "/reseller/merchantpricing",
        submenus: [],
      },
      {
        id: 4,
        name: "Commsiion Details",
        path: "/reseller/commission",
        submenus: [],
      },

      // {
      //   id: 6,
      //   name: "Profile",
      //   path: "profile",
      //   submenus: [],
      // },
      // {
      //   id: 7,
      //   name: "Billing",
      //   path: "/reseller/billing",
      //   submenus: [],
      // },
      {
        id: 8,
        name: "Manage Merchant",
        path: "/reseller/managemerchant",
        submenus: [],
      },
    ],
  },

  // {
  //   name: " Verification Suite",
  //   icon: MdVerifiedUser,
  //   path: "/user/vsuite",
  //   subRoutes: [
  //     {
  //       id: 1,
  //       name: "PAN",
  //       path: "vsuite/pan",
  //       submenus: [],
  //     },
  //     {
  //       id: 2,
  //       name: "Adhaar",
  //       path: "vsuite/adhaar",
  //       submenus: [],
  //     },
  //     {
  //       id: 2,
  //       name: "Account",
  //       submenus: [{ id: 3, name: "Penny drop", path: "/menu2/submenu1" }],
  //     },

  //     {
  //       id: 2,
  //       name: "Settings",

  //       submenus: [
  //         { id: 3, name: "Api Keys g", path: "/menu2/submenu1" },
  //         { id: 4, name: "Webhook", path: "/menu2/submenu2" },
  //         { id: 4, name: "Ip Whitelist", path: "/menu2/submenu2" },
  //       ],
  //     },
  //   ],
  // },
];
const ResellerResellerAdminMenu = [
  {
    icon: AiFillAppstore,
    name: "Apps",
    path: "/merchant/user/apps",
    subRoutes: [
      {
        id: 1,
        name: "Collection",
      },
      {
        id: 2,
        name: "Pay Out",
      },
    ],
  },
  {
    icon: MdSpaceDashboard,
    name: "Merchant Dashboard",
    path: "/merchants/pg/dashboard",
    permission: "payin",

    subRoutes: [
      // Add more menu items as needed
    ],
  },

  {
    name: "Reseller Suite",
    icon: ImUserTie,
    path: "/reseller/dashboard",
    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "dashboard",
        submenus: [],
      },
      {
        id: 2,
        name: "transactions",
        path: "transactions",
        permission: "payin",

        submenus: [],
      },
      {
        id: 1,
        name: "Merchant Transfers",
        path: "transfers",
        permission: "payout",

        submenus: [],
      },
      {
        id: 1,
        name: "Fund Statement",
        path: "fundstatement",
        permission: "payout",

        submenus: [],
      },
      {
        id: 3,
        name: "Merchant Pricing",
        path: "merchantpricing",
        submenus: [],
      },
      {
        id: 4,
        name: "Commsiion Details",
        path: "commission",
        submenus: [],
      },
      {
        id: 5,
        name: "Statement",
        path: "statements",
        submenus: [],
      },
      {
        id: 7,
        name: "Statement",
        path: "statements",
        submenus: [],
      },
      // {
      //   id: 6,
      //   name: "Profile",
      //   path: "profile",
      //   submenus: [],
      // },
      // {
      //   id: 7,
      //   name: "Billing",
      //   path: "billing",
      //   submenus: [],
      // },
      {
        id: 8,
        name: "Manage Merchant",
        path: "managemerchant",
        submenus: [],
      },
    ],
  },
  {
    name: "Reseller Admin",
    icon: ImUserTie,
    path: "/radmin/dashboard",
    subRoutes: [
      {
        id: 1,
        name: "Dashboard",
        path: "dashboard",
        submenus: [],
      },
      {
        id: 2,
        name: "merchant transactions",
        path: "merchant/transactions",
        permission: "payout",

        submenus: [],
      },
      {
        id: 3,
        name: "Merchant Pricing",
        path: "merchantpricing",
        submenus: [],
      },
      {
        id: 4,
        name: "Commsiion Details",
        path: "commission",
        submenus: [],
      },
      {
        id: 5,
        name: "reseller transactions",
        path: "reseller/transactions",
        submenus: [],
        permission: "payin",
      },
      // {
      //   id: 6,
      //   name: "Profile",
      //   path: "profile",
      //   submenus: [],
      // },
      {
        id: 7,
        name: "Manage Reseller",
        path: "managereseller",
        submenus: [],
      },
      {
        id: 8,
        name: "Manage Merchant",
        path: "managemerchant",
        submenus: [],
      },
    ],
  },
  // {
  //   name: " Verification Suite",
  //   icon: MdVerifiedUser,
  //   path: "/user/vsuite",
  //   subRoutes: [
  //     {
  //       id: 1,
  //       name: "PAN",
  //       path: "vsuite/pan",
  //       submenus: [],
  //     },
  //     {
  //       id: 2,
  //       name: "Adhaar",
  //       path: "vsuite/adhaar",
  //       submenus: [],
  //     },
  //     {
  //       id: 2,
  //       name: "Account",
  //       submenus: [{ id: 3, name: "Penny drop", path: "/menu2/submenu1" }],
  //     },

  //     {
  //       id: 2,
  //       name: "Settings",

  //       submenus: [
  //         { id: 3, name: "Api Keys g", path: "/menu2/submenu1" },
  //         { id: 4, name: "Webhook", path: "/menu2/submenu2" },
  //         { id: 4, name: "Ip Whitelist", path: "/menu2/submenu2" },
  //       ],
  //     },
  //   ],
  // },
  ,
];

const SideBarX = ({ children }) => {
  const loggedIn = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const { is_reseller_admin, is_reseller, app_permissions, is_merchant } =
    loggedIn?.currentUser;

  const determineMenu = () => {
    if (is_reseller_admin && is_reseller) return ResellerResellerAdminMenu;
    if (is_reseller && is_merchant) return ResellerMerchantMenu;
    if (is_reseller_admin && !is_reseller) return ResellerAdminMenu;
    if (!is_reseller && !is_reseller_admin && is_merchant) return MerchantMenu;
    return ResellerMenu;
  };
  const menus = determineMenu();

  console.log(menus);
  const { isOpen } = useSelector((slice) => slice.sidebar);
  const dispatch = useDispatch();
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const navigate = useNavigate();
  const location = useLocation();

  const { mode, currentUser } = useSelector((state) => state.user);
  const handleOptionChange = async (e) => {
    try {
      const res = await axios.put(`${BASE_URL}/user/toggle_mode`, null, {
        // params: { app_mode: mode },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
      });
      if (res.data.status) {
        dispatch(changeAppMode());
        enqueueSnackbar(res.data);
      }
    } catch (error) {
      onFailure(error, dispatch);
      enqueueSnackbar(error);
    }

    if (mode === "live") {
      console.log("you r in live mode");
    }
  };

  return (
    <>
      <div className="main-container h-screen  z-50">
        <motion.div
          animate={{
            width: isOpen ? "260px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar flex flex-col gap-4 bg-slate-700  `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Axonpay
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars " onClick={() => dispatch(toggleSidebar())}>
              <FaBars size={25} className=" cursor-pointer" />
            </div>
          </div>
          <div className="search ">
            <div className="search_icon ">
              <BiSearch className="" />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes  gap-4 mt-12">
            {menus.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenuX
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className={`icon ${isOpen ? " text-lg " : " text-xl "}`}>
                    <route.icon />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main
          className={`flex min-h-screen  pt-0 flex-col ${
            isOpen === true ? " w-[84vw] " : "  w-[96vw] "
          } justify-between h-full overflow-y-scroll  `}
        >
          <div
            className={`w-[84vw] fixed top-0 z-[1000] ${
              isOpen === true ? " w-[84vw] " : "  w-[96vw] "
            }  bg-slate-700 h-20 rounded-b flex justify-between px-12 items-center  `}
          >
            <div
              className={`${
                mode === "live" ? "text-orange-400" : "text-stone-300"
              } font-semibold select-none capitalize`}
            >
              {mode} mode
            </div>
            <div className="flex gap-4">
              {mode == "live" ? (
                <button
                  className="flex px-4 py-1  bg-stone-300 capitalize hover:shadow-sm rounded-md text-base text-slate-700 font-semibold"
                  onClick={handleOptionChange}
                >
                  {"switch to test"}
                </button>
              ) : (
                <button
                  className="flex px-4 py-1 hover:shadow-sm  capitalize bg-orange-400 rounded-md text-base text-white font-semibold"
                  onClick={handleOptionChange}
                >
                  {"switch to live"}
                </button>
              )}
            </div>
            <div className="flex gap-5 justify-center cursor-pointer text-white ">
              <Tooltip content="notification">
                <Bell />
              </Tooltip>
              <Tooltip content="settings">
                <Settings2 />
              </Tooltip>
              <Tooltip content="profile">
                <CircleUser
                  className={`${
                    location.pathname.includes("/profile") &&
                    " scale-150 transition-all duration-700 "
                  }`}
                  onClick={() => navigate("/merchants/profile")}
                />
              </Tooltip>

              <MessageCircleQuestion />
            </div>
            <div className="text-white cursor-pointer flex hover:text-red-500  ">
              <Tooltip content="logout">
                <Power
                  size={24}
                  onClick={() => {
                    dispatch(loginFailure());
                    navigate("/login");
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div className="mt-24">{children}</div>
        </main>
      </div>
    </>
  );
};

export default SideBarX;
