import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import TanStackTable from "../TansStackTable";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaCopy } from "react-icons/fa";

import {
  create_webhook_data,
  create_whitelist_ip,
  delete_webhook_data,
  delete_whitelist_ip,
  edit_webhook_data,
  edit_whitelist_ip,
  generate_api_keys,
  get_api_keys,
  get_webhook_data,
  get_whitelist_ip,
  messageClear,
} from "../../../redux/payout/payoutSettingReducer";
import { useSnackbar } from "notistack";

// ___________________________ POPUP _________________________

export const PayoutSettings = () => {
  const {
    whitelistData,
    keysData,
    loader,
    successMessage,
    errorMessage,
    webhookData,
  } = useSelector((state) => state.payoutsettings);
  const { mode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleWebhookEdit(row) {
    // console.log(row);
    Swal.fire({
      title: "<strong>Edit</strong>",
      icon: "info",
      html: `
        <div>
        <label>Webhook url</label>
        <input type=text value=${row.webhook_url} id="webhookUrlInput" >
        </div>
        <div>
        <label>Written url</label>
        <input type=text value=${row.written_url} id="writtenUrlInput" >
        </div>
      `,

      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Edit!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
       Cancel
      `,
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        const webhookUrlInput = document.getElementById("webhookUrlInput");
        const writtenUrlInput = document.getElementById("writtenUrlInput");

        dispatch(
          edit_webhook_data({
            id: row.webhook_id,
            editwebhook: {
              webhook_url: webhookUrlInput.value,
              written_url: writtenUrlInput.value,
            },
            mode,
          })
        ).then(() => {
          dispatch(get_webhook_data({ mode }));
        });
      }
    });
  }

  function handleWhitelistEdit(row) {
    Swal.fire({
      title: "<strong>Edit</strong>",
      icon: "info",
      html: `
        <div>
        <label>Ip Address</label>
        <input type=text value=${row.ip_address} id="ipAddressInput" >
        </div>
      `,

      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Edit!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
       Cancel
      `,
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        const ipAddressInput = document.getElementById("ipAddressInput");

        dispatch(
          edit_whitelist_ip({
            id: row.whitelist_id,
            editwhitelist: {
              ip_address: ipAddressInput.value,
              mode,
            },
          })
        ).then(() => {
          dispatch(get_whitelist_ip({ mode }));
        });
      }
    });
  }

  function handleDelete(id, ip) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn text-white ml-4 px-4 py-2 rounded-lg bg-green-500",
        cancelButton: "btn text-white mr-4 px-4 py-2 bg-red-600 rounded-lg",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (ip) {
            console.log("deleting ", id);
            dispatch(delete_whitelist_ip({ id, mode })).then(() => {
              dispatch(get_whitelist_ip({ mode }));
            });
          } else {
            console.log("deleting ", id);
            dispatch(delete_webhook_data({ id, mode })).then(() => {
              dispatch(get_webhook_data({ mode }));
            });
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }
  const webhookHeaders = [
    { header: "Webhook URL", accessorKey: "webhook_url" },
    // { header: "Written URL", accessorKey: "written_url" },
    { header: "Merchant id", accessorKey: "m_id" },
    { header: "Created Date", accessorKey: "createdAt" },
    { header: "Updated Date", accessorKey: "updatedAt" },
    {
      header: "Action",
      accessorKey: "",
      cell: (row) => (
        <div className="flex justify-between ">
          <FaEdit
            className="cursor-pointer"
            size={20}
            onClick={(e) => {
              handleWebhookEdit(row.row.original);
            }}
          />

          <MdDelete
            className="cursor-pointer"
            size={20}
            onClick={(e) => {
              handleDelete(row.row.original.webhook_id);
            }}
          />
        </div>
      ),
    },
  ];
  const whiteListHeaders = [
    { header: "ip address", accessorKey: "ip_address" },
    { header: "merchant id ", accessorKey: "m_id" },
    { header: "Created Date", accessorKey: "createdAt" },
    { header: "Updated Date", accessorKey: "updatedAt" },
    // { header: "Date", accessorKey: "visits" },
    {
      header: "Operation",
      accessorKey: "",
      cell: (row) => (
        <div className="flex justify-between px-5">
          <FaEdit
            className="cursor-pointer"
            size={20}
            onClick={(e) => {
              handleWhitelistEdit(row.row.original);
            }}
          />

          <MdDelete
            className="cursor-pointer"
            size={20}
            onClick={(e) => {
              handleDelete(row.row.original.whitelist_id, "ip");
            }}
          />
        </div>
      ),
    },
  ];

  const [keys, setKeys] = useState([]);
  const [webhookurl, setwebhookurl] = useState("");
  const [writtenurl, setwrittenurl] = useState("");
  const [webhookdata, setWebhookdata] = useState([]);
  const [whitelistdata, setWhitelistdata] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [ip, setIp] = useState("");

  useEffect(() => {
    if (webhookData?.length > 0) {
      setWebhookdata(webhookData);
    }
    if (whitelistData?.length > 0) {
      setWhitelistdata(whitelistData);
    }
    if (keysData?.length > 0) {
      setKeys(keysData);
    }
    console.log("keys=>", keys);
  }, [whitelistData, keysData, webhookData]);

  useEffect(() => {
    dispatch(get_api_keys({ mode }));
    dispatch(get_webhook_data({ mode }));
    dispatch(get_whitelist_ip({ mode }));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage);
    }
    if (successMessage) {
      enqueueSnackbar(successMessage);
    }
    dispatch(messageClear());
  }, [errorMessage, successMessage]);

  // ___________________KACHRA____________________________

  function maskKey(key) {
    if (key.length <= 6) {
      return key; // If the key has 6 or fewer characters, return it as it is
    } else {
      const visibleChars = key.substring(0, 3);
      const hiddenChars = "*".repeat(key.length - 6); // Replace the middle characters with *
      const lastChars = key.substring(key.length - 3);
      return visibleChars + hiddenChars + lastChars;
    }
  }
  function askRegenerate() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn text-white ml-4 px-4 py-2 rounded-lg bg-green-500",
        cancelButton: "btn text-white mr-4 px-4 py-2 bg-red-600 rounded-lg",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Your Keys will be replaced",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Regenerate it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(generate_api_keys({ mode })).then(() => {
            dispatch(get_api_keys({ mode }));
          });
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your keys has been regenerated.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Operation Cancelled ",
            text: "Your Keys are safe :)",
            icon: "error",
          });
        }
      });
  }
  // ---------------------------------
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const [active, setActive] = useState("Webhook"); //APIKey WhiteList

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const { isOpen } = useSelector((slice) => slice.sidebar);

  return (
    <div className={`rounded-b-lg relative overflow-hidden `}>
      <div className="w-full flex items-center justify-center flex-col  bg-[#ede9fe]   my-10 rounded-t-xl">
        <div
          className={` flex justify-start   bg-[#ede9fe] rounded-t-xl  w-full sm:text-lg  items-end  text-sm font-semibold `}
        >
          <div
            className={`px-[3vw] ${
              active === "Webhook" ? "bg-blue-700 fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base    hover-bg-blue-700 transition-all delay-600 ease-in  py-2 shadow-lg  `}
            onClick={() => setActive("Webhook")}
          >
            Webhook
          </div>
          <div
            className={` px-[3vw] ${
              active === "APIkey" ? "bg-blue-700 fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base    hover-bg-blue-700 transition-all delay-600 ease-in   py-2 shadow-lg `}
            onClick={() => setActive("APIkey")}
          >
            API Keys
          </div>
          <div
            className={` px-[3vw] ${
              active === "WhiteList" ? "bg-blue-700 fourth-text" : ""
            } cursor-pointer rounded-t-md border-r-2 text-xs sm:text-base     hover-bg-blue-700 transition-all delay-600 ease-in  py-2 shadow-lg `}
            onClick={() => setActive("WhiteList")}
          >
            IP White Listing
          </div>
        </div>

        {active === "Webhook" && (
          <div className="  w-full gap-5 my-5  bg-[#ede9fe] rounded-b-xl">
            <div className="flex flex-col">
              <button
                className="px-5 py-2 sm:text-lg text-xs  bg-blue-700 rounded-lg text-white  focus:outline-none font-semibold self-end mr-2"
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
                <p className="text-lg text-white ">Add WebHook </p>
              </Modal.Header>
              <Modal.Body className="fourth-bg">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex items-center justify-between px-6 lg:px-12 ">
                    <label htmlFor="">Webhook Url</label>
                    <input
                      type="text"
                      value={webhookurl}
                      onChange={(e) => setwebhookurl(e.target.value)}
                      className="lg:h-10 border-none border-b lg:w-64 w-32 h-8 "
                    />
                  </div>
                  <div className="flex items-center justify-between px-6 lg:px-12 ">
                    <label htmlFor="">Written Url</label>
                    <input
                      value={writtenurl}
                      onChange={(e) => setwrittenurl(e.target.value)}
                      type="text"
                      className="lg:h-10 border-none border-b lg:w-64 w-32 h-8  "
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border fourth-bg border-gray-400">
                <Button
                  onClick={() => {
                    dispatch(
                      create_webhook_data({
                        webhookData: {
                          written_url: writtenurl,
                          webhook_url: webhookurl,
                        },
                        mode,
                      })
                    ).then(() => {
                      setwebhookurl("");
                      setwrittenurl("");
                      dispatch(get_webhook_data({ mode }));

                      props.setOpenModal(undefined);
                    });
                  }}
                  className="second-bg rounded-sm py-1"
                >
                  {" "}
                  Add Webhook
                </Button>
                <Button
                  // onClick={() => props.setOpenModal(undefined)}
                  className="second-bg rounded-sm py-1"
                >
                  Edit Webhook
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 rounded-sm py-1"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <div>
              <TanStackTable headers={webhookHeaders} data={webhookdata} />
            </div>
          </div>
        )}

        {active === "APIkey" && (
          <div className="  w-full h-full gap-5 bg-[#ede9fe] rounded-b-xl my-5">
            <div className="flex flex-col ">
              <button
                className="px-4 py-2 sm:text-base text-xs bg-blue-700 rounded-lg text-white  focus:outline-none self-end mr-5  xl:mr-10 font-semibold "
                onClick={() => {
                  // props.setOpenModal("dismissible");
                  askRegenerate();
                }}
              >
                Generate API KEY
              </button>
            </div>
            {keys.length > 0 && (
              <div className="w-full   text-white flex flex-col items-center justify-center gap-4 my-4 lg:flex-row px-4 lg:px-8">
                <div className=" bg-blue-700 rounded-lg  w-72 lg:w-full flex flex-col gap-4 border-red-500 py-4 items-center justify-center">
                  <h1 className="font-semibold">AES key </h1>
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-white text-xl font-semibold">
                      {maskKey(keys[0]?.AES_key)}
                    </p>
                    <FaCopy
                      size={20}
                      onClick={() => copyToClipboard(keys[0]?.AES_key)}
                      className=" text-white"
                    />
                  </div>
                </div>
                <div className="   bg-blue-700 rounded-lg  w-72 lg:w-full flex flex-col gap-4 border-red-500 py-4 items-center justify-center  ">
                  <h1 className="font-semibold">MID key </h1>
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-white  font-semibold">
                      {maskKey(keys[0]?.mid_key)}
                    </p>
                    <FaCopy
                      size={20}
                      onClick={() => copyToClipboard(keys[0]?.mid_key)}
                      className=" text-white "
                    />
                  </div>
                </div>
                <div className="   bg-blue-700 rounded-lg  w-72 lg:w-full flex flex-col gap-4 border-red-500 py-4 items-center justify-center ">
                  <h1 className="font-semibold">SALT key </h1>
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-white font-semibold">
                      {maskKey(keys[0]?.salt_key)}
                    </p>
                    <FaCopy
                      size={20}
                      onClick={() => copyToClipboard(keys[0]?.salt_key)}
                      className=" text-white"
                    />
                  </div>
                </div>
                <div className="   bg-blue-700 rounded-lg  w-72 lg:w-full flex flex-col gap-4 border-red-500 py-4 items-center justify-center ">
                  <h1 className="font-semibold">SECRET KEY </h1>
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-white font-semibold">
                      {maskKey(keys[0]?.secret_key)}
                    </p>
                    <FaCopy
                      size={20}
                      onClick={() => copyToClipboard(keys[0]?.secret_key)}
                      className=" text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {active === "WhiteList" && (
          <div className="bg-[#ede9fe] rounded-b-xl my-5 w-full h-full gap-5 ">
            <div className="flex w-full flex-col">
              <button
                className="px-4 py-2 rounded-lg text-white sm:text-lg text-xs bg-blue-700  focus:outline-none font-semibold self-end  mr-1 sm:md-6 md:mr-8 xl:mr-10"
                onClick={() => {
                  props.setOpenModal("dismissible");
                }}
              >
                Add IP
              </button>
            </div>

            <Modal
              dismissible
              show={props.openModal === "dismissible"}
              onClose={() => props.setOpenModal(undefined)}
              className="cross focus:outline-none"
            >
              <Modal.Header className="h-20 first-bg">
                {" "}
                <p className="text-lg text-white ">Whitelist</p>
              </Modal.Header>
              <Modal.Body className="fourth-bg">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex items-center justify-between px-6 lg:px-12 ">
                    <label htmlFor="">IP Address</label>
                    <input
                      // disabled
                      value={ip}
                      type="text"
                      onChange={(e) => setIp(e.target.value)}
                      className=" h-8 lg:h-10 border-none border-b w-32 lg:w-64 "
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border fourth-bg border-gray-400">
                <Button
                  onClick={() => {
                    // console.log(ip);
                    console.log("ip is creating ", ip);
                    dispatch(create_whitelist_ip({ ip, mode })).then(() => {
                      dispatch(get_whitelist_ip({ mode }));
                      setIp("");
                      props.setOpenModal(undefined);
                    });
                  }}
                  className="second-bg rounded-sm py-1"
                >
                  {" "}
                  <span className="text-xs sm:text-sm md:text-base">
                    Add IP
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
            <TanStackTable headers={whiteListHeaders} data={whitelistdata} />
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
export default PayoutSettings;
