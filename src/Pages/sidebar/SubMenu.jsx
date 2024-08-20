import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, Routes, useLocation } from "react-router-dom";

const SubMenu = ({ data, isTableMid, setOpen, open }) => {
  // console.log("data", data);
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  useEffect(() => {}, [pathname]);
  return (
    <>
      {/* 94A3B8 */}
      <li
        className={`link ${
          pathname.includes(data.label)
            ? "text-[#a5bde1] px-4  "
            : " text-[#94A3B8]  px-4 "
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {/* options or menus */}
        {data.path ? (
          <p className="flex-1 capitalize hover:text-blue-500 w-full ">
            <NavLink to={data.path}>{data.label}</NavLink>
          </p>
        ) : (
          <p className="flex-1 capitalize pl-0 ">{data.label}</p>
        )}
        {data.submenus?.length > 0 && (
          <IoIosArrowDown
            className={` ${subMenuOpen && "rotate-180"} duration-200 `}
          />
        )}
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.submenus?.map((submenu, idx) => (
          <li
            key={submenu.id}
            className=" duration-500  hover:font-medium py-1 "
            onClick={() => {
              if (isTableMid) {
                setOpen(false);
              }
            }}
          >
            <NavLink
              to={submenu.path}
              className=" capitalize  duration-500 text-[#94A3B8] bg-transparent"
            >
              <p className="hover:text-blue-500 duration-500">
                {submenu.label}
              </p>
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
