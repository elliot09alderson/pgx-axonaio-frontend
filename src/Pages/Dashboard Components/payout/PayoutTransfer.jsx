import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Dropdown,
  FileInput,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import moment from "moment";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  get_beneficiary,
  messageClear,
} from "../../../redux/payout/beneficiaryReducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  createtransfer,
  get_transfer,
  get_transfer_by_date,
} from "../../../redux/payout/transferReducer";
import TanStackTable from "../TansStackTable";

const PayoutTransfer = () => {
  const [active, setActive] = useState("instant");
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { mode } = useSelector((state) => state.user);
  const headers = [
    { header: "transaction_id", accessorKey: "transaction_id" },
    { header: "beneficiary id", accessorKey: "ben_id" },
    { header: "Name", accessorKey: "payout_name" },
    { header: "amount", accessorKey: "amount" },
    { header: "Account Number", accessorKey: "payout_bank_acc" },
    { header: "IFSC", accessorKey: "payout_ifsc" },
    { header: "transfer_method", accessorKey: "transfer_method" },

    { header: "Mobile", accessorKey: "payout_phone" },
    { header: "Email", accessorKey: "payout_email" },
    { header: "remark", accessorKey: "remark" },
  ];

  const [beneData, setBeneData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { beneficiaryData } = useSelector((state) => state.beneficiary);
  const { transferData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.transfer
  );
  useEffect(() => {
    setBeneData(beneficiaryData);
  }, [beneficiaryData]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage);
    }
    if (successMessage) {
      enqueueSnackbar(successMessage);
    }
    dispatch(messageClear());
  }, [errorMessage, successMessage]);

  useEffect(() => {
    dispatch(get_beneficiary({ mode }));
    dispatch(get_transfer({ mode }));
  }, []);
  const validationSchema = Yup.object().shape({
    ben_id: Yup.string()
      .required("Beneficiary is required")
      .min(3, "Beneficiary must be at least 3 characters")
      .max(50, "Beneficiary must be at most 50 characters"),
    transfer_method: Yup.string()
      .required("Transfer method is required")
      .oneOf(["upi", "account no", "neft", "rtgs"], "Invalid transfer method"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(1, "Amount must be at least 1")
      .max(1000000, "Amount must be at most 1,000,000"),
    remark: Yup.string()
      .required("Remarks are required")
      .min(10, "Remarks must be at least 10 characters")
      .max(200, "Remarks must be at most 200 characters"),
  });

  const [beneficiaryLabel, setBeneficiaryLabel] = useState(
    "Select Beneficiary id"
  );
  const [transferMethodLabel, setTransferMethodLabel] = useState(
    "Select Transfer Method"
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        get_transfer_by_date({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_transfer({ mode }));
    }
  }, [startDate, endDate]);
  return (
    <div className=" flex flex-col  ">
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
        className="rounded-b-xl cross  focus:outline-none"
      >
        <Modal.Header
          gradientDuoTone="purpleToBlue"
          className="  h-20  tairo-bg-blue  text-white"
        >
          {" "}
          <p className="sm:text-3xl text-white text-xl"> Make Transfer</p>
        </Modal.Header>
        <Modal.Body className="rounded-b-xl  bg-stone-300">
          <div className="flex flex-col bg-stone-300">
            <nav className="flex gap-4  w-full items-center justify-center border-b-2 shadow-sm">
              <li
                className={`px-5  ${
                  active === "instant"
                    ? "   tairo-bg tairo-text-blue "
                    : " tairo-text "
                } py-2 cursor-pointer rounded-t  list-none transition-all `}
                onClick={() => setActive("instant")}
              >
                Single Transfer
              </li>
              <li
                className={`px-4 ${
                  active === "Bulk"
                    ? " tairo-bg tairo-text-blue "
                    : " tairo-text "
                }  py-2 cursor-pointer  list-none rounded-t `}
                onClick={() => setActive("Bulk")}
              >
                Bulk Transfer
              </li>
            </nav>
            {active === "instant" && (
              <Formik
                initialValues={{
                  ben_id: "",
                  transfer_method: "",
                  amount: "",
                  remark: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log(values);
                  dispatch(createtransfer({ datax: values, mode })).then(() => {
                    dispatch(get_transfer({ mode }));
                  });
                  setBeneficiaryLabel("Select Beneficiary id");
                  setTransferMethodLabel("Select Transfer Method");
                  resetForm();
                  setOpenModal(false);
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="flex py-8 gap-5 flex-col w-full max-h-[50vh] overflow-y-scroll">
                      <div className="flex lg:flex-row gap-2 lg:gap-0 flex-col items-start lg:items-center justify-between lg:px-12 px-2">
                        <label className="lg:text-base text-sm font-semibold tairo-text text-left">
                          Select Beneficiary*
                        </label>
                        <Dropdown
                          size="md"
                          gradientDuoTone="purpleToBlue"
                          label={beneficiaryLabel}
                          dismissOnClick={true}
                          // className="bg-[#a07bf8]"
                          color="blue"
                          // value={}
                        >
                          {beneData.map((bene) => (
                            <Dropdown.Item
                              onClick={(e) => {
                                setFieldValue("ben_id", bene.ben_id);
                                setBeneficiaryLabel(bene.ben_id);
                              }}
                              key={bene.ben_id}
                              value={bene.ben_id}
                            >
                              {bene.ben_id}
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                        <ErrorMessage
                          name="ben_id"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex items-center flex justify-between lg:px-12 px-2">
                        <label className="lg:text-base text-sm font-semibold tairo-text">
                          Transfer Method*
                        </label>
                        <div className="flex flex-col">
                          <Dropdown
                            color="blue"
                            gradientDuoTone="purpleToBlue"
                            size="md"
                            label={transferMethodLabel}
                            dismissOnClick={true}
                          >
                            {["upi", "account no", "neft", "rtgs"].map(
                              (method, idx) => (
                                <Dropdown.Item
                                  onClick={() => {
                                    setFieldValue("transfer_method", method);
                                    setTransferMethodLabel(`Method ${method}`);
                                  }}
                                  key={method}
                                  value={method}
                                >
                                  {method}
                                </Dropdown.Item>
                              )
                            )}
                          </Dropdown>
                          <ErrorMessage
                            name="transfer_method"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex py-2 gap-5 flex-col w-full max-h-[50vh] overflow-y-scroll">
                      <div className="flex items-center justify-between lg:px-12 px-2">
                        <label className="lg:text-base text-sm font-semibold tairo-text">
                          Amount*
                        </label>
                        <div className="flex flex-col">
                          <Field
                            name="amount"
                            type="number"
                            as={TextInput}
                            required
                          />
                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="text-red-500 ml-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between lg:px-12 px-2">
                        <label className="lg:text-base text-sm font-semibold tairo-text">
                          Remarks*
                        </label>
                        <div className="flex flex-col">
                          <Field
                            name="remark"
                            as={Textarea}
                            placeholder="Leave a comment..."
                            required
                            rows={4}
                            className="ml-2"
                          />
                          <ErrorMessage
                            name="remark"
                            component="div"
                            className="text-red-500 text-sm ml-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center my-4">
                      <Button
                        className="mt-2 w-[200px] rounded-md"
                        gradientDuoTone="purpleToBlue"
                        type="submit"
                        disabled={loader}
                        // onClick={console.log("heeek")}
                      >
                        Add
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
            {active === "Bulk" && (
              <div className="p-3">
                <div className="flex my-2 items-center w-full justify-center  flex-col gap-4">
                  <div className="flex items-center w-full flex-col gap-3 ">
                    <p className="  lg:text-xl tairo-text text-lg drop-shadow-sm  font-normal">
                      Beneficiaries File Upload
                    </p>

                    <div className="flex w-full items-center justify-center">
                      <Label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <FileInput id="dropzone-file" className="hidden" />
                      </Label>
                    </div>
                    {/* <button className="text-green-700 focus:select-none underline flex items-center">
                      Choose a File
                      <AiOutlineCloudUpload
                        size={30}
                        className="text-green-700 pl-2"
                      />
                    </button> */}
                  </div>
                  <div className="btn-div flex gap-8 px-2 my-3">
                    {" "}
                    <Button
                      gradientDuoTone="purpleToBlue"
                      className="bg-green-500 sm:px-4  px-4 text-white"
                    >
                      Upload
                    </Button>
                    <Button
                      gradientDuoTone="pinkToOrange"
                      className="bg-red-400  sm:px-4 px-4  fourth-text"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <div className="my-4 w-full py-8 flex rounded-lg bg-[#a3b1cc]/70 gap-8 px-8 lg:gap-12 z-[10] items-center justify-center flex flex-col lg:flex-row">
        <div className=" mt-4 items-center flex sm:justify-start sm:px-6 justify-center">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => props.setOpenModal("dismissible")}
            className="bg-blue-400 w-64  first-bg fourth-text"
          >
            Make Transfer
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
      </div>
      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        {loader ? (
          <div className="flex items-center justify-center tetx-xl">
            Loading ........
          </div>
        ) : (
          <TanStackTable
            headers={headers}
            successMessage={successMessage}
            data={transferData}
            clearMessage={messageClear}
            className="second-bg rounded-t-md"
            // component={<DropDown />}
          />
        )}
      </div>
    </div>
  );
};

export default PayoutTransfer;
