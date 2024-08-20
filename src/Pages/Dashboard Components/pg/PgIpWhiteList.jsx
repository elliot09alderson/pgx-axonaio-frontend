import React from "react";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";

const PgIpWhiteList = () => {
  const [active, setActive] = useState("instant");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Ip Name", accessorKey: "ip_name" },
    { header: "Ip Address ", accessorKey: "ip_address" },
    {
      header: "Ip Address Count",
      accessorKey: "ip_address_count",
    },

    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];

  return (
    <div className=" w-full h-full  sm:py-1">
      <TanStackTable
        headers={headers}
        className="second-bg rounded-t-md"
        // component={<DropDown />}
      />
    </div>
  );
};

export default PgIpWhiteList;
