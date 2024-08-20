import React from "react";
import { LuMenu } from "react-icons/lu";
import { motion } from "framer-motion";
import { IoLogOut } from "react-icons/io5";
import { loginFailure, loginSuccess } from "../redux/userRedux";
import { useDispatch } from "react-redux";
const Navbar = ({ open, setOpen, isTabletMid }) => {
  const dispatch = useDispatch();
  return (
    <>
      <motion.div
        transition={{
          duration: 0.2,
          ease: "easeIn",
        }}
        animate={
          open
            ? {
                marginLeft: "9vw",
                x: -100,
                y: 0,
                // rotate: 0,
              }
            : {
                x: 0,
                y: 0,

                // rotate: 180,
              }
        }
        className="w-full fixed z-[50] duration-500 shadow-md top-0 mb-8 backdrop-blur-sm  h-20 flex  items-center justify-between px-8  "
      >
        <div
          className={` w-full  lg:w-[70vw] cursor-pointer flex lg:justify-end`}
        >
          <div className="self-end flex flex-col items-center">
            <IoLogOut
              size={34}
              className="z-[200] tairo-text"
              onClick={() => dispatch(loginFailure())}
            />
            <label htmlFor="" className="tairo-text">
              logout
            </label>
          </div>
        </div>

        {!open && (
          <div onClick={() => setOpen(!open)}>
            <LuMenu size={34} className="z-[200]" />
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Navbar;
