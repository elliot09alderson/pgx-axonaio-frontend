import React, { useState, useEffect } from "react";
import ResellerPayinTable from "./ResellerPayinTable";
import ReactCallender from "../../OtherComponents/ReactCallender";
const headers = [
  { header: "T-Id", accessorKey: "_id" },
  { header: "Merchant Name", accessorKey: "Merchant_Name" },
  { header: "Merchant Percentage", accessorKey: "merchant_percentage" },
  { header: "Commission Percentage", accessorKey: "commission_percentage" },
  { header: "Date", accessorKey: "transaction_date" },
  { header: "Transaction Amount", accessorKey: "transaction_amount" },
  { header: "Total Amount", accessorKey: "total_amount" },
  {
    header: "Action",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];

const PayIn = () => {
  function Submit(startDate, endDate) {
    console.log(startDate, ".................", endDate);
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center second-bg   p-4 gap-10 rounded-md mb-4 w-full min-h-36 shadow-md  relative">
        <ReactCallender
          className=""
          dateOne={startDate}
          setDateOne={setStartDate}
          dateTwo={endDate}
          setDateTwo={setEndDate}
        />

        <button
          className="px-8 text-gray-100 py-2   rounded-md flex first-bg  self-end mb-2"
          onClick={() => Submit(startDate, endDate)}
        >
          Submit
        </button>
      </div>

      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        <ResellerPayinTable
          headers={headers}
          className="second-bg rounded-lg"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default PayIn;
