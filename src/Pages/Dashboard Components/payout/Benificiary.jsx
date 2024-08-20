import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createBeneficiary,
  get_beneficiary,
  delete_beneficiary,
  messageClear,
} from "../../../redux/payout/beneficiaryReducer";
import Swal from "sweetalert2";
import TanStackTable from "../TansStackTable";
import { useSnackbar } from "notistack";
import { MdDelete } from "react-icons/md";
const Benificiary = () => {
  const [active, setActive] = useState("instant");

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const { mode } = useSelector((state) => state.user);
  function handleDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn text-white ml-4 px-4 py-2 rounded-lg bg-green-500",
        cancelButton: "btn text-white mr-4 px-4 py-2 bg-red-600 rounded-lg",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(delete_beneficiary({ id, mode })).then(() => {
            dispatch(get_beneficiary({ mode }));
          });

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Beneficiary has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your beneficiary acc is safe :)",
            icon: "error",
          });
        }
      });
  }

  const headers = [
    { header: "Beneficiary Id", accessorKey: "ben_id" },
    { header: "Name", accessorKey: "ben_name" },
    { header: "IFSC", accessorKey: "ben_ifsc_code" },
    { header: "Mobile", accessorKey: "ben_mobile" },
    { header: "Email", accessorKey: "ben_email" },
    // { header: "Upi Id", accessorKey: "visits" },
    { header: "Account Number", accessorKey: "ben_bank_acc" },
    { header: "Address", accessorKey: "ben_address" },
    { header: "PinCode", accessorKey: "ben_pincode" },
    {
      header: "Action",
      accessorKey: "ben_id",
      cell: (row) => (
        <div className="flex justify-between ">
          <MdDelete
            className="cursor-pointer"
            size={20}
            onClick={(e) => {
              handleDelete(row.row.original.ben_id);
            }}
          />
        </div>
      ),
    },
  ];

  const validationSchema = Yup.object().shape({
    ben_name: Yup.string().required("Name is required"),
    ben_mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    ben_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    ben_address: Yup.string().required("Address is required"),
    ben_state: Yup.string().required("State is required"),
    ben_pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
    ben_bank_acc: Yup.string().required("Bank account number is required"),
    ben_ifsc_code: Yup.string()
      .required("IFSC code is required")
      .matches(/^[A-Za-z]{4}\d{7}$/, "Invalid IFSC code"),
  });
  const { enqueueSnackbar } = useSnackbar();
  const { beneficiaryData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.beneficiary
  );

  const initialValues = {
    ben_name: "",
    ben_mobile: "",
    ben_email: "",
    ben_address: "",
    ben_state: "",
    ben_pincode: "",
    ben_bank_acc: "",
    ben_ifsc_code: "",
  };

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
  }, []);

  return (
    <div className=" flex flex-col ">
      <div className=" mt-4 items-center flex sm:justify-start sm:px-6 justify-center">
        <Button
          gradientDuoTone="purpleToBlue"
          onClick={() => props.setOpenModal("dismissible")}
          className="bg-blue-400 w-64  first-bg fourth-text"
        >
          Add Beneficiary
        </Button>
      </div>

      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        size={"md"}
        onClose={() => props.setOpenModal(undefined)}
        className="rounded-b-xl cross focus:outline-none"
      >
        <Modal.Header className=" h-20 text-black">
          {" "}
          <p className="sm:text-xl text-tairo-blue  text-sm">
            {" "}
            Add Beneficiary
          </p>
        </Modal.Header>
        <Modal.Body className="rounded-b-xl">
          <div className="flex flex-col bg-white ">
            <nav className="flex gap-4  w-full items-center justify-center border-b-2 shadow-sm">
              <li
                className={`px-5  ${
                  active === "instant"
                    ? "   tairo-bg tairo-text-blue "
                    : " tairo-text "
                } py-2 cursor-pointer rounded-t  list-none transition-all  text-sm `}
                onClick={() => setActive("instant")}
              >
                Enter Beneficiary Details
              </li>
              <li
                className={`px-4 ${
                  active === "Bulk"
                    ? " tairo-bg tairo-text-blue "
                    : " tairo-text "
                }  py-2 cursor-pointer text-sm list-none rounded-t `}
                onClick={() => setActive("Bulk")}
              >
                Add Bulk Beneficiary
              </li>
            </nav>
            {active === "instant" && (
              <div className="flex flex-col gap-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    dispatch(createBeneficiary({ datax: values, mode })).then(
                      (response) => {
                        if (response.payload.status) {
                          resetForm();
                        }
                      }
                    );
                  }}
                >
                  {({ isSubmitting, resetForm }) => (
                    <Form className="flex flex-col gap-5 my-4">
                      {[
                        "ben_name",
                        "ben_mobile",
                        "ben_email",
                        "ben_address",
                        "ben_state",
                        "ben_pincode",
                        "ben_bank_acc",
                        "ben_ifsc_code",
                      ].map((field, index) => (
                        <div
                          key={index}
                          className="flex  flex-col justify-between   "
                        >
                          <Label htmlFor={field} className="text-sm   ">
                            {field
                              .replace("ben_", "")
                              .replace("_", " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </Label>
                          <div className="flex flex-col gap-4">
                            <Field type="text" name={field}>
                              {({ field }) => (
                                <TextInput
                                  {...field}
                                  type="text"
                                  // placeholder="xxxxxxxx"
                                  required
                                  className="h-8 "
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={field}
                              className="text-xs text-red-500"
                              component="div"
                            />
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-center my-4">
                        <Button
                          className=" mt-2 w-[200px]   rounded-md "
                          gradientDuoTone="purpleToBlue"
                          type="submit"
                        >
                          Add
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
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
      {loader ? (
        <div className="flex items-center justify-center tetx-xl">
          Loading ........
        </div>
      ) : (
        <TanStackTable
          headers={headers}
          successMessage={successMessage}
          data={beneficiaryData}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
        />
      )}
    </div>
  );
};

export default Benificiary;
