import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import {
  NavLink,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";

import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { ImUserTie } from "react-icons/im";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const WholeSidebar = ({ Idx, setIdx, open, setOpen, isTabletMid }) => {
  const { mode } = useSelector((state) => state.user);
  const [sidebarContent, setSidebarContent] = useState({});
  const loggedIn = useSelector((state) => state.user);

  const { is_reseller_admin, is_reseller, app_permissions, is_merchant } =
    loggedIn?.currentUser;

  const location = useLocation();
  const currentPath = location.pathname;
  function trimPath(path) {
    return path.substring(0, path.lastIndexOf("/"));
  }

  const Menu = ({ items, currentPath, setIdx }) => {
    console.log(
      "ASDASASDASDASDASD",
      items.filter((menu) => {
        return (
          mode == "test" ||
          menu.permission === "both" ||
          app_permissions.includes(menu.permission)
        );
      })
    );
    return items
      .filter((menu) => {
        return (
          mode == "test" ||
          menu.permission === "both" ||
          app_permissions.includes(menu.permission)
        );
      })
      .map((item, idx) => {
        const isActive = trimPath(currentPath)
          ? trimPath(currentPath).includes(trimPath(item.path))
          : false;
        return item.menu?.length > 0 ? (
          <NavLink
            to={item.path}
            className={"rounded-2xl"}
            onClick={() => {
              setSidebarContent(item);
              console.log("item===>>>", item);
            }}
            key={idx}
          >
            <div
              className={`cursor-pointer p-4 duration-500 hover:bg-[#ede9fe] hover:text-[#8b5cf6] ${
                isActive ? "bg-[#ede9fe]" : "bg-[#ede9fe]/20"
              } rounded-2xl`}
            >
              <item.icon
                size={23}
                className={`min-w-max duration-500 ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>
          </NavLink>
        ) : (
          <NavLink
            to={item.path}
            className={"rounded-2xl"}
            onClick={() => {
              setSidebarContent(item);
              console.log("item===>>>", item);
            }}
            key={idx}
          >
            <div
              className={`cursor-pointer p-4 ${
                isActive ? "bg-[#ede9fe]" : "bg-[#ede9fe]/20"
              } rounded-2xl`}
            >
              <item.icon
                size={23}
                className={`min-w-max ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>
          </NavLink>
        );
      });
  };

  const SideMenu = () => {};

  const MerchantMenu = [
    {
      icon: AiFillAppstore,
      label: "Apps",
      permission: "both",
      menu: [
        {
          id: 1,
          label: "Collection",
        },
        {
          id: 2,
          label: "Pay Out",
        },
        {
          id: 2,
          label: "Verification Suite",
        },
        // Add more menu items as needed
      ],
    },
    {
      icon: MdSpaceDashboard,
      label: "Merchant Dashboard",
      path: "/merchants/pg/dashboard",
      permission: "both",
      menu: [
        // Add more menu items as needed
      ],
    },
    {
      label: "Pay In",
      icon: FaHandHoldingUsd,
      path: "/merchants/payin/dashboard",
      permission: "payin",

      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "/merchants/payin/dashboard",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Transactions",
          path: "/merchants/payin/transactions",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Orders",
          path: "/merchants/payin/orders",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Settlement",
          path: "/merchants/payin/settlements",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Chargeback",
          path: "/merchants/payin/chargebacks",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Refund",
          path: "/merchants/payin/refunds",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Cases",
          path: "/merchants/payin/cases",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Settings",
          path: "/merchants/payin/settings",
          permission: "payin",

          submenus: [],
        },
        // Add more menu items as needed
      ],
    },
    {
      label: "Payout",
      icon: GiReturnArrow,
      path: "/merchants/payout/dashboard",
      permission: "payout",

      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "/merchants/payout/dashboard",
          submenus: [],
          permission: "payout",
        },
        {
          id: 1,
          label: "Transfers",
          path: "/merchants/payout/transfer",
          permission: "payout",

          submenus: [],
        },

        {
          id: 1,
          label: "Fund Statement",
          path: "/merchants/payout/fundstatement",
          permission: "payout",

          submenus: [],
        },
        {
          id: 2,
          label: "Beneficiary",
          path: "/merchants/payout/beneficiary",
          permission: "payout",

          submenus: [],
        },
        {
          id: 2,
          label: "Accounts",
          submenus: [],
          permission: "payout",
        },

        {
          id: 2,
          label: "Settings",
          path: "/merchants/payout/settings",
          permission: "payout",

          submenus: [],
        },
      ],
    },

    {
      label: " Verification Suite",
      icon: MdVerifiedUser,
      path: "/user/vsuite",
      permission: "both",
    },
  ];
  const ResellerMenu = [
    {
      icon: AiFillAppstore,
      label: "Apps",
      path: "/merchant/user/apps",
      permission: "both",
      menu: [
        {
          id: 1,
          label: "Collection",
        },
        {
          id: 2,
          label: "Pay Out",
        },
        {
          id: 2,
          label: "Verification Suite",
        },
        // Add more menu items as needed
      ],
    },
    {
      icon: MdSpaceDashboard,
      label: "Merchant Dashboard",
      path: "/merchants/pg/dashboard",
      permission: "payin",

      menu: [
        // Add more menu items as needed
      ],
    },

    {
      label: "Reseller Suite",
      icon: ImUserTie,
      path: "/reseller/dashboard",
      permission: "both",
      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "dashboard",
          submenus: [],
        },
        {
          id: 2,
          label: "transactions",
          path: "transactions",
          submenus: [],
        },
        {
          id: 1,
          label: "Merchant Transfers",
          path: "transfers",
          submenus: [],
        },
        {
          id: 1,
          label: "Fund Statement",
          path: "fundstatement",
          submenus: [],
        },
        {
          id: 3,
          label: "Merchant Pricing",
          path: "merchantpricing",
          submenus: [],
        },
        {
          id: 4,
          label: "Commsiion Details",
          path: "commission",
          submenus: [],
        },

        {
          id: 6,
          label: "Profile",
          path: "profile",
          submenus: [],
        },
        {
          id: 7,
          label: "Billing",
          path: "billing",
          submenus: [],
        },
        {
          id: 8,
          label: "Manage Merchant",
          path: "managemerchant",
          submenus: [],
        },
      ],
    },

    ,
    {
      label: " Verification Suite",
      icon: MdVerifiedUser,
      path: "/user/vsuite",
      permission: "both",

      menu: [
        {
          id: 1,
          label: "PAN",
          path: "vsuite/pan",
          submenus: [],
        },
        {
          id: 2,
          label: "Adhaar",
          path: "vsuite/adhaar",
          submenus: [],
        },
        {
          id: 2,
          label: "Account",
          submenus: [{ id: 3, label: "Penny drop", path: "/menu2/submenu1" }],
        },

        {
          id: 2,
          label: "Settings",

          submenus: [
            { id: 3, label: "Api Keys g", path: "/menu2/submenu1" },
            { id: 4, label: "Webhook", path: "/menu2/submenu2" },
            { id: 4, label: "Ip Whitelist", path: "/menu2/submenu2" },
          ],
        },
      ],
    },
  ];
  const ResellerAdminMenu = [
    {
      icon: AiFillAppstore,
      label: "Apps",
      path: "/merchant/user/apps",
      menu: [
        {
          id: 1,
          label: "Collection",
        },
        {
          id: 2,
          label: "Pay Out",
        },
        {
          id: 2,
          label: "Verification Suite",
        },
        // Add more menu items as needed
      ],
    },
    {
      icon: MdSpaceDashboard,
      label: "Merchant Dashboard",
      path: "/merchants/pg/dashboard",
      permission: "payin",

      menu: [
        // Add more menu items as needed
      ],
    },

    {
      label: "Reseller Admin",
      icon: ImUserTie,
      path: "/radmin/dashboard",
      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "dashboard",
          submenus: [],
        },
        {
          id: 2,
          label: "Merchant transactions",
          path: "merchant/transactions",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Merchant transfers",
          path: "merchant/transfers",
          permission: "payout",

          submenus: [],
        },
        {
          id: 2,
          label: "Merchant fundstatement",
          path: "merchant/fundstatement",
          permission: "payout",

          submenus: [],
        },

        {
          id: 3,
          label: "Merchant Pricing",
          path: "merchantpricing",
          submenus: [],
        },
        {
          id: 4,
          label: "Commsiion Details",
          path: "commission",
          submenus: [],
        },
        {
          id: 5,
          label: "reseller transactions",
          path: "reseller/transactions",
          permission: "payin",

          submenus: [],
        },
        {
          id: 5,
          label: "reseller fundstatement",
          path: "reseller/fundstatement",
          permission: "payout",

          submenus: [],
        },

        {
          id: 6,
          label: "Profile",
          path: "profile",
          submenus: [],
        },
        {
          id: 7,
          label: "Manage Reseller",
          path: "managereseller",
          submenus: [],
        },
        {
          id: 8,
          label: "Manage Merchant",
          path: "managemerchant",
          submenus: [],
        },
      ],
    },

    ,
    {
      label: " Verification Suite",
      icon: MdVerifiedUser,
      path: "/user/vsuite",
      menu: [
        {
          id: 1,
          label: "PAN",
          path: "vsuite/pan",
          submenus: [],
        },
        {
          id: 2,
          label: "Adhaar",
          path: "vsuite/adhaar",
          submenus: [],
        },
        {
          id: 2,
          label: "Account",
          submenus: [{ id: 3, label: "Penny drop", path: "/menu2/submenu1" }],
        },

        {
          id: 2,
          label: "Settings",

          submenus: [
            { id: 3, label: "Api Keys g", path: "/menu2/submenu1" },
            { id: 4, label: "Webhook", path: "/menu2/submenu2" },
            { id: 4, label: "Ip Whitelist", path: "/menu2/submenu2" },
          ],
        },
      ],
    },
  ];
  const ResellerMerchantMenu = [
    {
      icon: AiFillAppstore,
      label: "Apps",
      path: "/merchant/user/apps",
    },
    {
      icon: MdSpaceDashboard,
      label: "Merchant Dashboard",
      path: "/merchants/pg/dashboard",
      permission: "payin",

      menu: [
        // Add more menu items as needed
      ],
    },
    {
      label: "Pay In",
      icon: FaHandHoldingUsd,
      path: "/merchants/payin/dashboard",
      permission: "payin",

      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "/merchants/payin/dashboard",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Transactions",
          path: "/merchants/payin/transactions",
          submenus: [],
          permission: "payin",
        },
        {
          id: 1,
          label: "Orders",
          path: "/merchants/payin/orders",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Settlement",
          path: "/merchants/payin/settlements",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Chargeback",
          path: "/merchants/payin/chargebacks",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Refund",
          path: "/merchants/payin/refunds",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Cases",
          path: "/merchants/payin/cases",
          permission: "payin",

          submenus: [],
        },
        {
          id: 2,
          label: "Settings",
          path: "/merchants/payin/settings",
          permission: "payin",

          submenus: [],
        },
        // Add more menu items as needed
      ],
    },
    {
      label: "Payout",
      icon: GiReturnArrow,
      path: "/merchants/payout/dashboard",
      permission: "payout",

      menu: [
        {
          id: 1,
          label: "Dashboard",
          permission: "payout",

          path: "/merchants/payout/dashboard",
          submenus: [],
        },
        {
          id: 1,
          label: "Transfers",
          path: "/merchants/payout/transfer",
          permission: "payout",

          submenus: [],
        },
        {
          id: 1,
          label: "Fund Statement",
          path: "/merchants/payout/fundstatement",
          permission: "payout",

          submenus: [],
        },
        {
          id: 2,
          label: "Beneficiary",
          path: "/merchants/payout/beneficiary",
          permission: "payout",

          submenus: [],
        },
        {
          id: 2,
          label: "Accounts",
          submenus: [],
        },

        {
          id: 2,
          label: "Settings",
          path: "/merchants/payout/settings",
          permission: "payout",

          submenus: [],
        },
      ],
    },

    {
      label: "Reseller Suite",
      icon: ImUserTie,
      path: "/reseller/dashboard",
      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "dashboard",
          submenus: [],
        },
        {
          id: 2,
          label: "Transactions",
          path: "transactions",
          submenus: [],
        },
        {
          id: 1,
          label: "Merchant Transfers",
          path: "transfers",
          submenus: [],
          permission: "payin",
        },
        {
          id: 1,
          label: "Fund Statement",
          path: "fundstatement",
          submenus: [],
          permission: "payout",
        },
        {
          id: 3,
          label: "Merchant Pricing",
          path: "merchantpricing",
          submenus: [],
        },
        {
          id: 4,
          label: "Commsiion Details",
          path: "commission",
          submenus: [],
        },

        {
          id: 6,
          label: "Profile",
          path: "profile",
          submenus: [],
        },
        {
          id: 7,
          label: "Billing",
          path: "billing",
          submenus: [],
        },
        {
          id: 8,
          label: "Manage Merchant",
          path: "managemerchant",
          submenus: [],
        },
      ],
    },

    {
      label: " Verification Suite",
      icon: MdVerifiedUser,
      path: "/user/vsuite",
      menu: [
        {
          id: 1,
          label: "PAN",
          path: "vsuite/pan",
          submenus: [],
        },
        {
          id: 2,
          label: "Adhaar",
          path: "vsuite/adhaar",
          submenus: [],
        },
        {
          id: 2,
          label: "Account",
          submenus: [{ id: 3, label: "Penny drop", path: "/menu2/submenu1" }],
        },

        {
          id: 2,
          label: "Settings",

          submenus: [
            { id: 3, label: "Api Keys g", path: "/menu2/submenu1" },
            { id: 4, label: "Webhook", path: "/menu2/submenu2" },
            { id: 4, label: "Ip Whitelist", path: "/menu2/submenu2" },
          ],
        },
      ],
    },
  ];
  const ResellerResellerAdminMenu = [
    {
      icon: AiFillAppstore,
      label: "Apps",
      path: "/merchant/user/apps",
      menu: [
        {
          id: 1,
          label: "Collection",
        },
        {
          id: 2,
          label: "Pay Out",
        },
        {
          id: 2,
          label: "Verification Suite",
        },
        // Add more menu items as needed
      ],
    },
    {
      icon: MdSpaceDashboard,
      label: "Merchant Dashboard",
      path: "/merchants/pg/dashboard",
      permission: "payin",

      menu: [
        // Add more menu items as needed
      ],
    },

    {
      label: "Reseller Suite",
      icon: ImUserTie,
      path: "/reseller/dashboard",
      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "dashboard",
          submenus: [],
        },
        {
          id: 2,
          label: "transactions",
          path: "transactions",
          permission: "payin",

          submenus: [],
        },
        {
          id: 1,
          label: "Merchant Transfers",
          path: "transfers",
          permission: "payout",

          submenus: [],
        },
        {
          id: 1,
          label: "Fund Statement",
          path: "fundstatement",
          permission: "payout",

          submenus: [],
        },
        {
          id: 3,
          label: "Merchant Pricing",
          path: "merchantpricing",
          submenus: [],
        },
        {
          id: 4,
          label: "Commsiion Details",
          path: "commission",
          submenus: [],
        },
        {
          id: 5,
          label: "Statement",
          path: "statements",
          submenus: [],
        },
        {
          id: 7,
          label: "Statement",
          path: "statements",
          submenus: [],
        },
        {
          id: 6,
          label: "Profile",
          path: "profile",
          submenus: [],
        },
        {
          id: 7,
          label: "Billing",
          path: "billing",
          submenus: [],
        },
        {
          id: 8,
          label: "Manage Merchant",
          path: "managemerchant",
          submenus: [],
        },
      ],
    },
    {
      label: "Reseller Admin",
      icon: ImUserTie,
      path: "/radmin/dashboard",
      menu: [
        {
          id: 1,
          label: "Dashboard",
          path: "dashboard",
          submenus: [],
        },
        {
          id: 2,
          label: "merchant transactions",
          path: "merchant/transactions",
          permission: "payout",

          submenus: [],
        },
        {
          id: 3,
          label: "Merchant Pricing",
          path: "merchantpricing",
          submenus: [],
        },
        {
          id: 4,
          label: "Commsiion Details",
          path: "commission",
          submenus: [],
        },
        {
          id: 5,
          label: "reseller transactions",
          path: "reseller/transactions",
          submenus: [],
          permission: "payin",
        },
        {
          id: 6,
          label: "Profile",
          path: "profile",
          submenus: [],
        },
        {
          id: 7,
          label: "Manage Reseller",
          path: "managereseller",
          submenus: [],
        },
        {
          id: 8,
          label: "Manage Merchant",
          path: "managemerchant",
          submenus: [],
        },
      ],
    },

    ,
    {
      label: " Verification Suite",
      icon: MdVerifiedUser,
      path: "/user/vsuite",
      menu: [
        {
          id: 1,
          label: "PAN",
          path: "vsuite/pan",
          submenus: [],
        },
        {
          id: 2,
          label: "Adhaar",
          path: "vsuite/adhaar",
          submenus: [],
        },
        {
          id: 2,
          label: "Account",
          submenus: [{ id: 3, label: "Penny drop", path: "/menu2/submenu1" }],
        },

        {
          id: 2,
          label: "Settings",

          submenus: [
            { id: 3, label: "Api Keys g", path: "/menu2/submenu1" },
            { id: 4, label: "Webhook", path: "/menu2/submenu2" },
            { id: 4, label: "Ip Whitelist", path: "/menu2/submenu2" },
          ],
        },
      ],
    },
  ];

  const bottomMenus = [
    {
      label: " Profile",
      icon: FaCircleUser,
      path: "/merchants/profile",
      permission: "both",
      menu: [
        {
          id: 1,
          label: "Collection",
        },
        {
          id: 2,
          label: "Pay Out",
        },
        {
          id: 2,
          label: "Verification Suite",
        },
      ],
    },
    {
      label: " Sign Out",
      icon: FaSignOutAlt,
      path: "/user/exit",
      menu: [],
    },
  ];

  const determineMenu = () => {
    if (is_reseller_admin && is_reseller) return ResellerResellerAdminMenu;
    if (is_reseller && is_merchant) return ResellerMerchantMenu;
    if (is_reseller_admin && !is_reseller) return ResellerAdminMenu;
    if (!is_reseller && !is_reseller_admin && is_merchant) return MerchantMenu;
    return ResellerMenu;
  };

  const menuItems = determineMenu();
  return (
    <motion.div
      transition={{ duration: 0.2, ease: "easeIn" }}
      animate={open ? { x: 0, y: 0 } : { x: -200, y: -10 }}
      className={`${
        open ? "flex" : "hidden"
      } w-[22rem] fixed h-screen duration-500 pl-2 bg-white z-[99999]`}
    >
      <div className=" w-[5rem] overflow-hidden md:relative bg-white flex-col pr-2 top-0 z-[1000] border-r">
        <div className="duration-500 flex flex-col h-full justify-between items-center ease-in">
          <div className="duration-500 flex flex-col gap-4 mt-4 items-center ease-in">
            <Menu items={menuItems} currentPath={currentPath} setIdx={setIdx} />
          </div>
          <div className="duration-500 flex flex-col gap-4 self-end py-4 items-center ease-in">
            {console.log(bottomMenus)}
            <Menu
              items={bottomMenus}
              currentPath={currentPath}
              setIdx={setIdx}
            />
          </div>
        </div>
      </div>
      {/*  Right Sidebar */}
      {console.log(menuItems[Idx].label)}
      {open && (
        <Sidebar
          Idx={Idx}
          sidebarContent={sidebarContent}
          SubMenuName={
            sidebarContent?.label ? sidebarContent?.label : menuItems[Idx].label
          }
          subMenusList={sidebarContent.menu}
          setOpen={setOpen}
          open={open}
          isTabletMid={isTabletMid}
        />
      )}

      <SideMenu />
    </motion.div>
  );
};

export default WholeSidebar;
