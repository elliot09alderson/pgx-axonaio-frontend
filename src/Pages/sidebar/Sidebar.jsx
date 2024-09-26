import { useEffect } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import paynpro from "./paynpro_logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";

const Sidebar = ({
  sidebarContent,
  subMenusList,
  SubMenuName,
  setOpen,
  Idx,
  open,
  isTabletMid,
}) => {
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname, Idx]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };
  console.log(sidebarContent.label);
  return (
    <div className="  h-[100%] md:ml-0  w-full">
      <div className="h-full">
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={open ? "open" : "closed"}
          className=" bg-white text-gray shadow-x  z-[999] top-0  w-[16rem] 
            overflow-hidden md:relative fixed 
         h-screen "
        >
          <div className="flex items-center gap-5 font-medium border-b py-3 border-slate-300  mx-3">
            <img src={paynpro} width={60} alt="" />
            <span className="text-xl ml-4 whitespace-pre">Axon Pay</span>
            {open && isTabletMid && (
              <RiMenu2Line size={30} onClick={() => setOpen(false)} />
            )}
          </div>

          <div className="flex flex-col  h-full">
            {(open || isTabletMid) && (
              // main item

              <div className=" flex flex-col justify-center  gap-8">
                <div className="py-6 mx-3  border-b border-slate-300">
                  <small className="pl-4 text-slate-500 inline-block mb-2 text-xl   ">
                    {SubMenuName}
                  </small>
                </div>
                <div className="ml-3">
                  {subMenusList?.map((menu, idx) => (
                    <div
                      key={menu.label + idx}
                      className="flex flex-col gap-1 pl-2"
                    >
                      <SubMenu
                        data={menu}
                        isTabletMid={isTabletMid}
                        setOpen={setOpen}
                        open={open}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    x: -10,
                    y: -200,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} />
          </motion.div>
        </motion.div>

        <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
