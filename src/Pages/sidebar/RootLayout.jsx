import WholeSidebar from "./WholeSidebar.jsx";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
function RootLayout({ children }) {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [Idx, setIdx] = useState(0);
  return (
    <div className="flex  w-full bg-[#f1f5f9] ">
      {/* Sidebar  */}
      <WholeSidebar
        Idx={Idx}
        setIdx={setIdx}
        setOpen={setOpen}
        open={open}
        isTabletMid={isTabletMid}
      />
      {/* Right Side Section */}
      <div
        className={`ml-0 ${open ? "md:ml-[20rem]   " : " w-full"}
       w-full`}
      >
        <Navbar setOpen={setOpen} open={open} isTabletMid={isTabletMid} />
        <main
          className={` tairo-bg tairo-text ${
            open ? "max-w-7xl  " : "max-w-7xl"
          } flex-1 px-2 mx-auto mt-16   py-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
