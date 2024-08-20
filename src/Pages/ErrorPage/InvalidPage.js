import React from "react";
import { TiWarningOutline } from "react-icons/ti";
const InvalidPage = () => {
  return (
    <div className="flex items-center justify-center opacity-80 h-[100vh] gap-2 cursor-not-allowed">
      <h1 className="text-2xl select-none ">
        Un-Authorised Access Contact Your System Administrator
      </h1>
      <TiWarningOutline size={28} className="mb-2" />
    </div>
  );
};

export default InvalidPage;
