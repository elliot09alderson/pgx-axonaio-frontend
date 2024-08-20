import React, { useState } from "react";

import { Button, Modal } from "flowbite-react";
import TanStackTable from "../TansStackTable";
export const SideBar = () => {
  return (
    <div className="flex items-center  border-0 justify-center third-bg h-[100vh] w-full">
      <p className="vertical text-5xl first-text  font-[Fantasy] tracking-wide">
        Common-settings
      </p>
    </div>
  );
};
const whiteListHeaders = [
  { header: "TYPE", accessorKey: "profile" },
  { header: "IP", accessorKey: "firstName" },
  { header: "API Key", accessorKey: "lastName" },
  { header: "Status", accessorKey: "visits" },
  { header: "Date", accessorKey: "visits" },
  {
    header: "Operation",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];
const keyHeaders = [
  { header: "TYPE", accessorKey: "profile" },
  { header: "MID Key", accessorKey: "firstName" },
  { header: "API Key", accessorKey: "lastName" },
  { header: "Encrypted Key", accessorKey: "age" },
  { header: "Salt Key", accessorKey: "visits" },
  { header: "Status", accessorKey: "visits" },
  { header: "Date", accessorKey: "visits" },
  {
    header: "Edit",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];
const webhookHeaders = [
  { header: "TYPE", accessorKey: "profile" },
  { header: "WebHook URL", accessorKey: "firstName" },
  { header: "Status", accessorKey: "lastName" },
  { header: "Date", accessorKey: "age" },
  { header: "Visits", accessorKey: "visits" },
  {
    header: "Edit",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];

const CommonSetting = () => {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [active, setActive] = useState("Webhook"); //APIKey WhiteList
  return (
    <div className=" w-full  rounded-b-lg overflow-hidden  ">
      <div className=" second-bg  my-10 rounded-t-xl">
        <div
          className={` flex justify-start  third-bg rounded-t-xl rounded-b-lg w-full sm:text-lg  items-end  text-sm font-semibold `}
        >
          <div
            className={`px-[3vw] ${
              active === "Webhook" ? "second-bg fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base   border-gray-400 hover-bg-second transition-all delay-600 ease-in  py-2 shadow-lg  `}
            onClick={() => setActive("Webhook")}
          >
            Webhook
          </div>
          <div
            className={` px-[3vw] ${
              active === "APIkey" ? "second-bg fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base   border-gray-400 hover-bg-second transition-all delay-600 ease-in   py-2 shadow-lg `}
            onClick={() => setActive("APIkey")}
          >
            API Keys
          </div>
          <div
            className={` px-[3vw] ${
              active === "WhiteList" ? "second-bg fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base    border-gray-400 hover-bg-second transition-all delay-600 ease-in  py-2 shadow-lg `}
            onClick={() => setActive("WhiteList")}
          >
            IP White Listing
          </div>
        </div>

        {active === "Webhook" && (
          <div className="  w-full gap-5 my-5 second-bg rounded-b-xl">
            <div className="flex flex-col">
              <button
                className="px-4 py-2 sm:text-sm text-xs  third-bg   focus:outline-none font-semibold self-end mr-1 sm:md-6 md:mr-8 xl:mr-10"
                onClick={() => props.setOpenModal("dismissible")}
              >
                Add WebHook
              </button>
            </div>
            <Modal
              dismissible
              show={props.openModal === "dismissible"}
              onClose={() => props.setOpenModal(undefined)}
              className="cross focus:outline-none  "
            >
              <Modal.Header className="h-20 first-bg">
                {" "}
                <p className="text-lg text-white ">Add WebHook URL</p>
              </Modal.Header>
              <Modal.Body className="fourth-bg">
                <div className="flex flex-col w-full ">
                  <div className="flex items-center justify-between px-4 ">
                    <label htmlFor="">Webhook Url</label>
                    <input
                      type="text"
                      className="h-10 border-none border-b w-64"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 ">
                    <label htmlFor="">Written Url</label>
                    <input
                      type="text"
                      className="h-10 border-none border-b w-64"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 ">
                    <label htmlFor="">last updated</label>
                    <input
                      type="text"
                      value={"27/01/2000"}
                      disabled
                      className="h-10 border-none border-b w-64"
                    />
                  </div>
                </div>
                {/* <div className=" flex items-center  px-6 justify-center  py-2 gap-12 sm:gap-24">
                  <div className="flex flex-col  gap-8">
                    <label htmlFor=""> Type </label>
                    <label htmlFor=""> URL</label>
                    <label htmlFor=""> Active </label>
                  </div>
                  <div className="flex flex-col gap-7">
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                  </div>
                  <div className="flex flex-col gap-7">
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                  </div>
                </div> */}
              </Modal.Body>
              <Modal.Footer className="border fourth-bg border-gray-400">
                <Button
                  onClick={() => props.setOpenModal(undefined)}
                  className="second-bg rounded-sm py-1"
                >
                  {" "}
                  <span className="text-xs sm:text-sm md:text-base">
                    Add Webhook
                  </span>
                </Button>
                <Button
                  // onClick={() => props.setOpenModal(undefined)}
                  className="second-bg rounded-sm py-1"
                >
                  {" "}
                  <span className="text-xs sm:text-sm md:text-base">
                    Edit Webhook
                  </span>
                </Button>
                <Button
                  className="first-bg rounded-sm py-1"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  <span className="text-xs sm:text-sm md:text-base">
                    Cancel
                  </span>
                </Button>
              </Modal.Footer>
            </Modal>
            <div>{/* <TanStackTable headers={webhookHeaders} /> */}</div>
          </div>
        )}

        {active === "APIkey" && (
          <div className="  w-full h-full gap-5 second-bg rounded-b-xl my-5">
            <div className="flex flex-col ">
              <button
                className="px-4 py-2 sm:text-base text-xs third-bg  focus:outline-none self-end sm:mr-5 mr-1 sm:md-6 md:mr-8 xl:mr-10 font-semibold "
                onClick={() => props.setOpenModal("dismissible")}
              >
                Generate API KEY
              </button>
            </div>

            <Modal
              dismissible
              show={props.openModal === "dismissible"}
              onClose={() => props.setOpenModal(undefined)}
              className="cross focus:outline-none   "
            >
              <Modal.Header className="h-20 first-bg">
                {" "}
                <p className="text-lg text-white ">Add API Key</p>
              </Modal.Header>
              <Modal.Body className="fourth-bg">
                <div className=" flex items-center  sm:px-6 px-2 justify-center  py-2 gap-4 sm:gap-24">
                  <div className="flex flex-col  gap-7">
                    <label htmlFor=""> Type </label>
                    <label htmlFor=""> MID Key</label>
                    <label htmlFor=""> Encrypted Key</label>
                    <label htmlFor=""> API Key</label>
                    <label htmlFor=""> Salt Key</label>
                  </div>
                  <div className="flex flex-col gap-6">
                    <select
                      name=""
                      id=""
                      className="ring-1 ring-gray-500 h-8 rounded-sm pl-2 "
                    >
                      <option value="" className="px-2 py-1">
                        Pay In{" "}
                      </option>
                      <option value="" className="px-2 py-1">
                        Pay Out
                      </option>
                    </select>
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div>{/* <TanStackTable headers={keyHeaders} /> */}</div>
          </div>
        )}

        {active === "WhiteList" && (
          <div className="second-bg rounded-b-xl my-5 w-full h-full gap-5 ">
            <div className="flex w-full flex-col">
              <button
                className="px-4 py-2 sm:text-sm text-xs third-bg  focus:outline-none font-semibold self-end  mr-1 sm:md-6 md:mr-8 xl:mr-10"
                onClick={() => props.setOpenModal("dismissible")}
              >
                Add IP
              </button>
            </div>
            <Modal
              dismissible
              show={props.openModal === "dismissible"}
              onClose={() => props.setOpenModal(undefined)}
              className="cross focus:outline-none   "
            >
              <Modal.Header className="h-20   first-bg  ">
                {" "}
                <p className="text-lg text-white ">
                  Add Ip Address to WhiteList
                </p>
              </Modal.Header>
              <Modal.Body className="fourth-bg">
                <div className=" flex items-center  px-6 justify-center  py-2 gap-12 sm:gap-24">
                  <div className="flex flex-col  gap-7">
                    <label htmlFor=""> Type </label>
                    <label htmlFor=""> IP</label>
                    <label htmlFor=""> Active </label>
                  </div>
                  <div className="flex flex-col gap-6">
                    <select
                      name=""
                      id=""
                      className="ring-1 ring-gray-500 h-8 rounded-sm pl-2 "
                    >
                      <option value="" className="px-2 py-1">
                        Pay In{" "}
                      </option>
                      <option value="" className="px-2 py-1">
                        Pay Out
                      </option>
                    </select>
                    <input
                      type="text"
                      className="ring-1 ring-gray-500  rounded-sm pl-2 h-8 "
                    />
                    <div className="flex gap-8 items-center">
                      <div className="flex items-center gap-2">
                        <p className="text-xs m-0  font-bold first-text">Yes</p>
                        <input
                          type="radio"
                          className="w-6 h-6 cursor-pointer first-text first-bg"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs m-0  font-bold first-text">No</p>
                        <input
                          type="radio"
                          className="w-6 h-6 cursor-pointer first-text first-bg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border border-gray-400 fourth-bg">
                <Button
                  onClick={() => props.setOpenModal(undefined)}
                  className="second-bg rounded-sm py-[4px] "
                >
                  <span className="text-xs sm:text-sm md:text-base">
                    Add to WhiteList
                  </span>
                </Button>
                <Button
                  className="first-bg rounded-sm py-[4px]  "
                  onClick={() => props.setOpenModal(undefined)}
                >
                  <span className="text-xs sm:text-sm md:text-base">
                    Discard
                  </span>
                </Button>
              </Modal.Footer>
            </Modal>
            {/* <TanStackTable headers={whiteListHeaders} /> */}
          </div>
        )}
      </div>

      {/* <div>
        {active === "WhiteList" ? (
          <TableTransaction headers={whiteListHeaders} />
        ) : active === "APIkey" ? (
          <TableTransaction headers={keyHeaders} />
        ) : active === "Webhook" ? (
          <TableTransaction headers={webhookHeaders} />
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default CommonSetting;
