import React from "react";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";

const LiveRefund = () => {
  const [active, setActive] = useState("instant");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Refund Gid", accessorKey: "refund_gid" },
    { header: "Transaction Gid", accessorKey: "transaction_gid" },
    {
      header: "Refund Amount",
      accessorKey: "refund_amount",
    },
    { header: "Refund Notes", accessorKey: "refund_notes" },
    { header: "Refund Status ", accessorKey: "refund_status" },

    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];

  return (
    <div className=" w-full h-full  sm:py-1">
      {/* <TanStackTable
        headers={headers}
        className="second-bg rounded-t-md"
        // component={<DropDown />}
      /> */}
    </div>
  );
};

export default LiveRefund;
