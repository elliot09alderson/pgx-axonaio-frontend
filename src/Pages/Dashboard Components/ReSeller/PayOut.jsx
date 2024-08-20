import React from "react";
import { useState } from "react";
import ReactCallender from "../OtherComponents/ReactCallender";
// import { SelectDateRange } from "./Summary";
import TanStackTable from "../TansStackTable";
const headers = [
  { header: "T-Id", accessorKey: "profile" },
  { header: "Merhcant Name", accessorKey: "firstName" },
  { header: "Status", accessorKey: "lastName" },
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
const PayOut = ({ className }) => {
  function Submit() {}
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  return (
    <div className=" w-full  flex-col gap-1 flex  h-full ">
      <div
        className={`flex sm:flex-row flex-col items-center justify-center second-bg  p-4 gap-14 rounded-md mb-4 w-full min-h-36 shadow-md  `}
      >
        <ReactCallender
          dateOne={dateOne}
          setDateOne={setDateOne}
          dateTwo={dateTwo}
          setDateTwo={setDateTwo}
        />

        <button
          className="px-6 text-gray-100 py-2  rounded-md flex first-bg self-auto sm:self-end  mb-2.5"
          onClick={() => Submit(dateOne, dateTwo)}
        >
          Submit
        </button>
      </div>
      {/* <SelectDateRange /> */}
      <div className="mx-[2vw] ">
        <TanStackTable headers={headers} className="second-bg rounded-lg" />;
      </div>
    </div>
  );
};

export default PayOut;
