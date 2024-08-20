import React, { useEffect, useState } from "react";
import TabLayout from "../TabComponent.js/TabLayout";
import styled from "styled-components";
import TanStackTable from "../../Pages/Dashboard Components/TansStackTable";

export const DropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const DropdownLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
`;
export const DropdownRight = styled.div``;
export const DropdownButton = styled.button`
  padding: 5px 20px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #fff;
`;

const headers = [
  { header: "id", accessorKey: "_id" },
  { header: "transaction_gid", accessorKey: "transaction_gid" },
  { header: "vendor_transaction_id", accessorKey: "vendor_transaction_id" },
  { header: "vendor_id", accessorKey: "vendor_id" },
  { header: "utr.", accessorKey: "utr" },
  { header: "order_id", accessorKey: "order_id" },
  { header: "transaction_response", accessorKey: "transaction_response" },
  { header: "transaction_method_id", accessorKey: "transaction_method_id" },
  { header: "transaction_type", accessorKey: "transaction_type" },
  { header: "transaction_username", accessorKey: "transaction_username" },
  { header: "transaction_email", accessorKey: "transaction_email" },
  { header: "transaction_amount", accessorKey: "transaction_amount" },
  { header: "transaction_status", accessorKey: "transaction_status" },
  { header: "transaction_mode", accessorKey: "transaction_mode" },
  { header: "transaction_notes", accessorKey: "transaction_notes" },
  { header: "transaction_description", accessorKey: "transaction_description" },
  { header: "rupayapay_tax", accessorKey: "rupayapay_tax" },
  { header: "gst", accessorKey: "goods_service_tax" },
  { header: "android_status", accessorKey: "android_status" },
  { header: "adjustment_done", accessorKey: "adjustment_done" },
  { header: "transaction_date", accessorKey: "transaction_date" },
  { header: "transaction_ip", accessorKey: "transaction_ip" },
  { header: "created_date", accessorKey: "created_date" },
  { header: "created_merchant", accessorKey: "created_merchant" },
  { header: "created_employee", accessorKey: "created_employee" },
  { header: "udf1", accessorKey: "udf1" },
  { header: "udf2", accessorKey: "udf2" },
  { header: "udf3", accessorKey: "udf3" },
  { header: "udf4", accessorKey: "udf4" },
  { header: "udf5", accessorKey: "udf5" },
  // {
  //   header: "Edit",
  //   accessorKey: "",
  //   cell: (info) => "Edit | Delete",
  // },
];

const TransactionComponent = ({ TabData }) => {
  return (
    <div className="my-4 h-full">
      <TabLayout tabs={TabData} />
      <div className="w-full h-full sm:px-[2vw]  overflow-x-scroll sm:py-1 py-0 px-0">
        <TanStackTable headers={headers} className="second-bg" />
      </div>
    </div>
  );
};

export default TransactionComponent;
