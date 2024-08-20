import React from "react";
import { useState } from "react";
import { Button, FileInput, Modal } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";
import { DropDown } from "../DashboardPayout/TransactionPayout";
import { FiSearch } from "react-icons/fi";

const Webhook = () => {
  const [active, setActive] = useState("select");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const headers = [
    { header: " Webhook url", accessorKey: "webhook_url" },
    { header: "Status", accessorKey: "firstName" },
    { header: "Events Added", accessorKey: "lastName" },
    { header: "Created Date", accessorKey: "age" },

    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];

  const WebHook = [
    "Name",
    "Mobile",
    "Email",
    "Address",
    "State",
    "Pincode",
    "Account No",
    "IFSC Code",
    "Upi ID",
  ];
  return (
    <div className=" flex flex-col ">
      <div className=" mt-4 items-center flex sm:justify-start sm:px-6 justify-center">
        <Button
          onClick={() => props.setOpenModal("dismissible")}
          className="bg-[#8b5cf6]  mt-2 w-[200px]  ml:0 lg:ml-12  rounded-md fourth-text"
        >
          Edit Webhook
        </Button>
      </div>

      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
        className="rounded-b-xl cross focus:outline-none"
      >
        <Modal.Header className=" first-bg h-20 fourth-text">
          {" "}
          <p className="sm:text-3xl text-white text-xl"> Edit Webhook</p>
        </Modal.Header>
        <Modal.Body className="fourth-bg rounded-b-xl">
          <div className="flex flex-col">
            <div className="p-3">
              <div className="p-3 ">
                <div className="flex w-full items-center justify-center gap-2 my-5  ">
                  <FiSearch size={30} className="text-gray-500" />
                  <input
                    type="text"
                    className="w-full border-none  rounded-md border-b focus:outline-none outline-none text-xl"
                  />
                </div>

                {/* render search inputs here */}
                {<div></div>}

                <div className="flex items-center justify-between gap-4  flex-col first-text">
                  <div className="flex w-full justify-between items-center">
                    <label htmlFor="" className="text-lg font-semibold">
                      Transfer Method *
                    </label>
                    <select
                      name=""
                      id=""
                      className="w-64 border-none rounded-md"
                    >
                      <option value="" className=" ">
                        {" "}
                        Transfer Method
                      </option>
                      <option value=""> Transfer Method</option>
                      <option value=""> Transfer Method</option>
                      <option value=""> Transfer Method</option>
                    </select>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <label htmlFor="" className="text-lg font-semibold">
                      Amount *
                    </label>
                    <input
                      name=""
                      type=" number"
                      id=""
                      className="w-64 h-10 outline-none  pl-2 focus:outline-none border-none rounded-md"
                    />
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <label htmlFor="" className="text-lg font-semibold">
                      Remarks *
                    </label>
                    <textarea
                      name=""
                      type=" number"
                      id=""
                      className="w-64 h-40 outline-none   pl-2 focus:outline-none border-none rounded-md"
                    />
                  </div>
                  <button className="bg-[#8b5cf6] mt-2 w-[200px] py-2  rounded-md fourth-text">
                    Cancel
                  </button>
                  <button className="bg-[#8b5cf6] mt-2 w-[200px] py-2  rounded-md fourth-text">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        <TanStackTable
          headers={headers}
          className="second-bg"
          component={<DropDown />}
        />
      </div>
    </div>
  );
};

export default Webhook;
