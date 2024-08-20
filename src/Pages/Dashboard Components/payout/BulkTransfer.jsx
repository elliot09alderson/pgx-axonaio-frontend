import React from "react";
import { useState } from "react";
import { Button, FileInput, Modal } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";
import { DropDown } from "../DashboardPayout/TransactionPayout.jsx";

const BulkTransfer = () => {
  const [active, setActive] = useState("instant");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const headers = [
    { header: "Beneficiary Id", accessorKey: "profile" },
    { header: "Name", accessorKey: "firstName" },
    { header: "API Key", accessorKey: "lastName" },
    { header: "Mobile", accessorKey: "age" },
    { header: "Email", accessorKey: "visits" },
    { header: "Upi Id", accessorKey: "visits" },
    { header: "Account Number", accessorKey: "visits" },
    { header: "IFSC CODE", accessorKey: "visits" },
    { header: "Address", accessorKey: "visits" },
    { header: "PinCode", accessorKey: "visits" },
    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];

  const addBenificiaryTags = [
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
    <div className=" flex flex-col my-2 ">
      <div className=" mt-4 items-center flex sm:justify-start sm:px-6 justify-center">
        <Button
          onClick={() => props.setOpenModal("dismissible")}
          className="bg-[#8b5cf6]  mt-2 w-[200px] ml-0 lg:ml-6  rounded-md fourth-text"
        >
          Quick Transfer
        </Button>
      </div>

      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
        className="rounded-b-xl cross focus:outline-none z-[999999]"
      >
        <Modal.Header className="first-bg h-20 fourth-text">
          {" "}
          <p className="sm:text-3xl text-white text-xl">Bulk Transfer</p>
        </Modal.Header>
        <Modal.Body className="fourth-bg rounded-b-xl">
          <div className="flex flex-col">
            <nav className="flex gap-4  w-full items-center justify-center border-b-2 shadow-sm">
              <li
                className={`px-4 second-text ${
                  active === "instant" ? "   third-bg fourth-text" : ""
                } py-2 cursor-pointer  list-none transition-all `}
                onClick={() => setActive("instant")}
              >
                Add Beneficiary
              </li>
              <li
                className={`px-4 ${
                  active === "Bulk" ? "   third-bg fourth-text" : ""
                } second-text py-2 cursor-pointer  list-none `}
                onClick={() => setActive("Bulk")}
              >
                Bulk Transfer
              </li>
            </nav>
            {active === "instant" && (
              <div className="border">
                <div className="flex my-3  gap-4  flex-col w-full max-h-[40vh] overflow-y-scroll">
                  {addBenificiaryTags.map((name, idx) =>
                    idx === 4 ? (
                      <div
                        className="flex  items-center justify-between px-2 "
                        key={idx}
                      >
                        <label
                          className="text-xs sm:text-sm font-semibold first-text"
                          htmlFor=""
                        >
                          Transfer Method
                        </label>
                        <select className="m-0 px-2 py-1 rounded-sm sm:text-sm text-xs font-normal h-8 w-1/3">
                          <option value="">select</option>
                          <option value="">select</option>
                          <option value="">select</option>
                          <option className="px-4 py-2" value="">
                            add New
                          </option>
                        </select>
                      </div>
                    ) : (
                      <div
                        className="flex   items-center justify-between px-2"
                        key={idx}
                      >
                        <label
                          className="text-xs sm:text-sm font-semibold first-text"
                          htmlFor=""
                        >
                          {name}
                        </label>
                        <input
                          type="text"
                          className="border w-auto h-8 pl-2 focus:outline-none"
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="flex items-center justify-center my-4">
                  <button className="bg-[#8b5cf6] mt-2 w-[200px] py-2  rounded-md fourth-text">
                    Transfer
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
                    <span className="underline text-green-700 cursor-pointer ">
                      sample file
                    </span>{" "}
                    for your reference
                  </p>
                </div>

                <h1 className="text-center sm:text-3xl text-xl first-text mt-2 mb-1">
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

export default BulkTransfer;
