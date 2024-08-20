import React from "react";
import { useState } from "react";
import { Button, FileInput, Modal } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TanStackTable from "../TansStackTable";
import { DropDown } from "../DashboardPayout/TransactionPayout";
import { FiSearch } from "react-icons/fi";

const Apikeys = () => {
  const [active, setActive] = useState("select");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

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
    <div className=" flex flex-col ">
      <div className=" mt-4 items-center flex sm:justify-start sm:px-6 justify-center">
        <Button
          onClick={() => props.setOpenModal("dismissible")}
          className="bg-[#8b5cf6]  mt-2 w-[200px]  ml:0 lg:ml-12  rounded-md fourth-text"
        >
          Quick Transfer
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
          <p className="sm:text-3xl text-white text-xl"> Quick Transfer</p>
        </Modal.Header>
        <Modal.Body className="fourth-bg rounded-b-xl">
          <div className="flex flex-col">
            <nav className="flex gap-4  w-full items-center justify-center border-b-2 shadow-sm">
              <li
                className={`px-4  second-text ${
                  active === "add" ? "  second-bg fourth-text" : ""
                } py-2 cursor-pointer  list-none transition-all `}
                onClick={() => setActive("add")}
              >
                Add Beneficiary
              </li>
              <li
                className={`px-4 ${
                  active === "select"
                    ? "   second-bg   bg-[#ede9fe] fourth-text"
                    : ""
                } second-text py-2 cursor-pointer  list-none `}
                onClick={() => setActive("select")}
              >
                Enter Beneficiary Id
              </li>
            </nav>
            {active === "add" && (
              <div className="border">
                <div className="flex my-3  gap-4  flex-col w-full  max-h-[40vh] overflow-y-scroll">
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
            {active === "select" && (
              <div className="p-3">
                <div className="flex w-full items-center justify-center gap-2  ">
                  <FiSearch size={30} className="text-gray-500" />
                  <input
                    type="text"
                    className="w-full border-none  rounded-md border-b focus:outline-none outline-none text-xl"
                  />
                </div>

                {/* render search inputs here */}
                {<div></div>}

                <div className="flex items-center justify-center">
                  <button className="bg-[#8b5cf6] mt-2 w-[200px] py-2  rounded-md fourth-text">
                    Transfer
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        {/* <TanStackTable
          headers={headers}
          className="second-bg"
          component={<DropDown />}
        /> */}
      </div>
    </div>
  );
};

export default Apikeys;
