import React, { useState } from "react";
import TanStackTable from "../TansStackTable";

import ReactModal from "../OtherComponents/ReactModal";
const headers = [
  { header: "E-Id", accessorKey: "profile" },
  { header: " Name", accessorKey: "firstName" },
  { header: " Phone", accessorKey: "lastName" },
  { header: "Date", accessorKey: "age" },
  { header: "Amount", accessorKey: "visits" },
  { header: "Upi Id", accessorKey: "visits" },
  { header: "Account Number", accessorKey: "visits" },
  {
    header: "Action",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];

const ManageEmp = () => {
  const [openModal, setOpenModal] = useState(undefined);
  const btnObj = { func: () => setOpenModal("default"), name: "Add Employee" };

  return (
    <div>
      <div className="w-[500px]">
        <ReactModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></ReactModal>
      </div>
      <h1 className="text-center font-bold drop-shadow-sm first-text text-4xl p-2 mt-2">
        Employee Table
      </h1>
      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        <TanStackTable
          headers={headers}
          className="second-bg rounded-lg"
          btnObj={btnObj}
        />
      </div>
    </div>
  );
};

export default ManageEmp;
