import WholeSidebar from "./WholeSidebar.jsx";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import ResellerWholeSidebar from "./ResellerWholeSidebar.jsx";
import SideBarX from "../sidebar2/SideBarX.jsx";

function ResellerLayout({ children }) {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);

  return (
    <div className="flex  w-full bg-[#f1f5f9] ">
      {/* Sidebar  */}
      {/* <ResellerWholeSidebar
        setOpen={setOpen}
        open={open}
        isTabletMid={isTabletMid}
      /> */}

      <SideBarX />
      {/* Right Side Section */}
      <div
        className={`ml-0 ${open ? "md:ml-[20rem]  " : " w-full"}
       w-full`}
      >
        <Navbar setOpen={setOpen} open={open} isTabletMid={isTabletMid} />
        <main
          className={` ${
            open ? "max-w-6xl" : "max-w-7xl"
          } flex-1 px-2 mx-auto mt-16   py-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default ResellerLayout;
