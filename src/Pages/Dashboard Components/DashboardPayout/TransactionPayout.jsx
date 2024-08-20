import React from "react";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";

export function DropDown() {
  return (
    <div className="flex first-bg items-center justify-between focus:select-none mx-2 shadow-md md:mx-0 flex-col sm:flex-row gap-2   pl-2">
      <div className="left flex flex-wrap flex-col sm:flex-row gap-2  ">
        <select className="py-2 px-4 focus:select-none focus:outline-none border-0 mx-2 focus:border-0  fourth-text  first-bg rounded-sm  transition-all duration-500 ease-out">
          <option className="px-2 py-1">Column Visibility</option>
          <option className="px-2 py-1">Column Visibility</option>
          <option className="px-2 py-1">Column Visibility</option>
          <option className="px-2 py-1">Column Visibility</option>
          <option className="px-2 py-1">Column Visibility</option>
          <option className="px-2 py-1">Column Visibility</option>
        </select>
      </div>
    </div>
  );
}
const TransactionPayout = () => {
  const [active, setActive] = useState("instant");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const headers = [
    { header: "id", accessorKey: "_id" },
    { header: "Transaction Gid", accessorKey: "transaction_gid" },
    { header: "Vendor Transaction Id", accessorKey: "vendor_transaction_id" },
    { header: "Vendor Id", accessorKey: "vendor_id" },
    { header: "Bank ref no ", accessorKey: "bank_ref_no" },
    { header: "Order id", accessorKey: "order_id" },
    { header: "Transaction Response", accessorKey: "transaction_response" },
    { header: "Transaction Method", accessorKey: "transaction_method" },
    { header: "Transaction Type", accessorKey: "transaction_type" },
    { header: "Transaction Username", accessorKey: "transaction_username" },
    { header: "Transaction Email", accessorKey: "transaction_email" },
    { header: "Transaction Contact", accessorKey: "transaction_contact" },
    { header: "transaction_amount ", accessorKey: "transaction_amount" },
    { header: "transaction_status", accessorKey: "transaction_status" },
    { header: "transaction_mode", accessorKey: "transaction_mode" },
    { header: "transaction_motes", accessorKey: "transaction_motes" },
    {
      header: "Transaction Description",
      accessorKey: "Transaction_description",
    },
    { header: "Axonaio_tax", accessorKey: "axonaio_tax" },
    { header: "GST", accessorKey: "goods_service_tax" },
    { header: "adjustment done", accessorKey: "adjustment_done" },
    { header: "transaction_date", accessorKey: "transaction_date" },
    { header: "transaction_ip", accessorKey: "transaction_ip" },

    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];

  return (
    <div className=" flex flex-col  ">
      {/* <div className=" my-4  items-center flex sm:justify-start justify-center">
        <Button
          onClick={() => props.setOpenModal("dismissible")}
          className="first-bg w-64 focus:outline-none"
        >
          Toggle modal
        </Button>
      </div> */}

      {/* <div>
        <Modal
          dismissible
          show={props.openModal === "dismissible"}
          onClose={() => props.setOpenModal(undefined)}
          className="rounded-b-xl cross focus:outline-none"
        >
          <Modal.Header className="first-bg h-20 fourth-text">
            {" "}
            <p className="text-3xl text-white">Instant Transfer</p>
          </Modal.Header>
          <Modal.Body className="fourth-bg rounded-b-xl">
            <div className="flex flex-col">
              <nav className="flex gap-4  w-full items-center justify-center border-b-2 shadow-sm">
                <li
                  className={`px-4  py-2 ${
                    active === "instant"
                      ? "   third-bg first-text font-medium shadow-md"
                      : "second-text"
                  } cursor-pointer rounded-t-md list-none `}
                  onClick={() => setActive("instant")}
                >
                  Instant Transfer
                </li>
                <li
                  className={`px-4  py-2 ${
                    active === "Bulk"
                      ? "   third-bg first-text font-medium shadow-md"
                      : "second-text"
                  } cursor-pointer rounded-t-md   list-none `}
                  onClick={() => setActive("Bulk")}
                >
                  Bulk Transfer
                </li>
              </nav>
              {active === "instant" && (
                <div className="border">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 border ">
                    <div className="flex my-3 items-center justify-between px-4 ">
                      <label
                        className="text-xs sm:text-sm font-semibold first-text"
                        htmlFor=""
                      >
                        Benificiary
                      </label>
                      <select className="m-0 px-2 py-1 rounded-sm sm:text-sm text-xs font-normal ">
                        <option value="">select</option>
                        <option value="">select</option>
                        <option value="">select</option>
                        <option className="" value="">
                          add New
                        </option>
                      </select>
                    </div>
                    <div className="flex my-3 items-center justify-between pr-4 gap-2">
                      <label
                        className="text-xs sm:text-sm font-semibold first-text"
                        htmlFor=""
                      >
                        {" "}
                        Payment Instrument Id:
                      </label>
                      <input
                        type="text"
                        className="border rounded-sm pl-2 w-auto h-8 focus:outline-none"
                      />
                    </div>

                    <div className="flex  items-center justify-between px-4">
                      <label
                        className="text-xs sm:text-sm font-semibold first-text"
                        htmlFor=""
                      >
                        Transfer Method
                      </label>
                      <select className="m-0 px-2 py-1 rounded-sm sm:text-sm text-xs font-normal ">
                        <option value="">select</option>
                        <option value="">select</option>
                        <option value="">select</option>
                        <option className="px-4 py-2" value="">
                          add New
                        </option>
                      </select>
                    </div>
                    <div className="flex  items-center justify-between pr-4">
                      <label
                        className="text-xs sm:text-sm font-semibold first-text"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        className="border w-auto h-8 pl-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between  my-4 px-4 ">
                    <label
                      className="text-xs sm:text-sm font-semibold first-text"
                      htmlFor=""
                    >
                      Remark
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="40"
                      rows="5"
                      className="border "
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="second-bg w-[200px] py-2  rounded-md fourth-text">
                      Submit
                    </button>
                  </div>
                </div>
              )}
              {active === "Bulk" && (
                <div className="p-3">
                  <div>
                    <i className="text-xs sm:text-sm font-bold">Note</i>:{" "}
                    <p className="text-xs sm:text-sm pl-2 first-text font-semibold">
                      Download this{" "}
                      <span className="underline text-green-700 cursor-pointer">
                        sample file
                      </span>{" "}
                      for your reference
                    </p>
                  </div>

                  <h1 className="text-center sm:text-3xl text-xl first-text">
                    Only XL's, XLSX files can upload{" "}
                  </h1>

                  <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-3 ">
                      <p className="m-0 second-text text-md font-normal">
                        Beneficiaries File Upload
                      </p>
                      <button className="text-green-700 focus:select-none underline flex items-center">
                        Choose a File
                        <AiOutlineCloudUpload
                          size={20}
                          className="text-green-700 pl-2"
                        />
                      </button>
                    </div>
                    <div className="btn-div flex gap-8 px-2 my-3">
                      {" "}
                      <button className="bg-green-500 sm:px-4 sm:py-2 px-4 py-2 fourth-text">
                        Upload
                      </button>
                      <button className="bg-red-400  sm:px-4 sm:py-2 px-4 py-2 fourth-text">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div> */}

      <div className=" w-full h-full overflow-x-scroll sm:py-1">
        <TanStackTable
          headers={headers}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      </div>
    </div>
  );
};

export default TransactionPayout;
