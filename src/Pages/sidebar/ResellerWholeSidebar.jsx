import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { AiFillAppstore } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";

const ResellerWholeSidebar = ({ open, setOpen, isTabletMid }) => {
  const [Idx, setIdx] = useState(0);

  const Menus = [
    {
      icon: AiFillAppstore,
      label: "Apps",
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
      label: "Dashboard",
      path: "/resller/dashboard",
      menu: [
        // Add more menu items as needed
      ],
    },
    {
      label: "Pay In",
      icon: FaHandHoldingUsd,

      menu: [
        {
          id: 1,
          label: "Transactions",
          path: "/reseller/transactions",
          submenus: [],
        },
        {
          id: 1,
          label: "Merchant Transfers",
          path: "/reseller/transfers",
          submenus: [],
        },
        {
          id: 1,
          label: "Fund Statement",
          path: "/reseller/fundstatement",
          submenus: [],
        },
        {
          id: 1,
          label: "Pricelist",
          path: "/reseller/pricelist",
          submenus: [],
        },
        {
          id: 1,
          label: "Commission",
          path: "/reseller/commissions",
          submenus: [],
        },
        {
          id: 2,
          label: "Billing",
          path: "/reseller/billing",
          submenus: [],
        },

        // Add more menu items as needed
      ],
    },
    {
      label: "Payouts",
      icon: GiReturnArrow,

      menu: [
        {
          id: 1,
          label: "Transfer",
          path: "/merchants/payout/transfer",
          submenus: [],
        },
        {
          id: 2,
          label: "Beneficiary",
          path: "/merchants/payout/beneficiary",
          submenus: [],
        },
        {
          id: 2,
          label: "Account",
          submenus: [],
        },
        {
          id: 2,
          label: "Statement",
          path: "/merchants/payout/statement",
          submenus: [],
        },
        {
          id: 2,
          label: "Settings",
          path: "/merchants/payout/settings",
          submenus: [],
        },
      ],
    },
    {
      label: " Verification Suite",
      icon: MdVerifiedUser,

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
          label: "GST",
          path: "vsuit/gst",
          submenus: [],
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
    {
      label: " Report",
      icon: BiSolidReport,

      menu: [
        {
          id: 1,
          label: "Menu 5",
          submenus: [
            { id: 1, label: "Submenu e", path: "/menu1/submenu1" },
            { id: 2, label: "Submenu f", path: "/menu1/submenu2" },
          ],
        },
        {
          id: 2,
          label: "Menu 6",
          submenus: [
            { id: 3, label: "Submenu g", path: "/menu2/submenu1" },
            { id: 4, label: "Submenu h", path: "/menu2/submenu2" },
          ],
        },
        // Add more menu items as needed
      ],
    },
    {
      label: " Profile",
      icon: FaCircleUser,
      path: "/reseller/profile",
      menu: [],
    },
    {
      label: " Settings",
      icon: AiFillSetting,
      path: "/merchants/commonsettings",

      menu: [
        {
          id: 1,
          label: "Menu 5",
          submenus: [
            { id: 1, label: "Submenu e", path: "/menu1/submenu1" },
            { id: 2, label: "Submenu f", path: "/menu1/submenu2" },
          ],
        },
        {
          id: 2,
          label: "Menu 6",
          submenus: [
            { id: 3, label: "Submenu g", path: "/menu2/submenu1" },
            { id: 4, label: "Submenu h", path: "/menu2/submenu2" },
          ],
        },
        // Add more menu items as needed
      ],
    },
    {
      label: " Support",
      icon: BiSolidHelpCircle,

      menu: [
        {
          id: 1,
          label: "Menu 5",
          submenus: [
            { id: 1, label: "Submenu e", path: "/menu1/submenu1" },
            { id: 2, label: "Submenu f", path: "/menu1/submenu2" },
          ],
        },
        {
          id: 2,
          label: "Menu 6",
          submenus: [
            { id: 3, label: "Submenu g", path: "/menu2/submenu1" },
            { id: 4, label: "Submenu h", path: "/menu2/submenu2" },
          ],
        },
        // Add more menu items as needed
      ],
    },
    {
      label: " Sign Out",
      icon: FaSignOutAlt,

      menu: [
        {
          id: 1,
          label: "Menu 5",
          submenus: [
            { id: 1, label: "Submenu e", path: "/menu1/submenu1" },
            { id: 2, label: "Submenu f", path: "/menu1/submenu2" },
          ],
        },
        {
          id: 2,
          label: "Menu 6",
          submenus: [
            { id: 3, label: "Submenu g", path: "/menu2/submenu1" },
            { id: 4, label: "Submenu h", path: "/menu2/submenu2" },
          ],
        },
        // Add more menu items as needed
      ],
    },
  ];

  return (
    <div
      className={`${
        open ? "flex " : "hidden "
      }  w-[22rem]  fixed h-screen duration-500 pl-2 bg-white z-[99999]`}
    >
      {/* Icons Menu */}

      <div
        className="  z-[999] top-0  w-[5rem] 
            overflow-hidden md:relative  bg-white  flex-col gap-3 pr-2  top-0 z-[1000]  border-r"
      >
        <ul className=" duration-500 flex flex-col h-full justify-between py-4 items-center ease-in">
          {Menus?.map((item, idx) =>
            item.menu?.length > 0 ? (
              <li
                onClick={() => {
                  setIdx(idx);
                }}
                key={idx}
                className={`cursor-pointer p-4  ${
                  Idx == idx ? " bg-[#ede9fe]  " : ""
                } rounded-2xl`}
              >
                <item.icon
                  size={23}
                  className={`min-w-max text-gray-400  ${
                    Idx == idx ? "   text-[#8b5cf6] " : ""
                  } `}
                />
              </li>
            ) : (
              <li
                onClick={() => {
                  setIdx(idx);
                }}
                key={idx}
                className={`cursor-pointer p-4  ${
                  Idx == idx ? " bg-[#ede9fe] active " : ""
                } rounded-2xl`}
              >
                <NavLink to={item.path}>
                  <item.icon
                    size={23}
                    className={`min-w-max     ${
                      Idx == idx ? "   text-[#8b5cf6] " : ""
                    } text-gray-400`}
                  />
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>

      {/*  Right Sidebar */}
      {open && (
        <Sidebar
          SubMenuName={Menus[Idx].label}
          subMenusList={Menus[Idx].menu}
          setOpen={setOpen}
          open={open}
          isTabletMid={isTabletMid}
        />
      )}
    </div>
  );
};

export default ResellerWholeSidebar;
