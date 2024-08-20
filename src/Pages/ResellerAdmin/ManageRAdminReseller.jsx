import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import {
  get_radmin_reseller,
  get_radmin_resellers_merchant,
  messageClear,
  get_radmin_merchant,
  toggle_activate_reseller,
} from "../../redux/resellerAdmin/resellerAdmin";
import OnboardReseller from "./AddReseller/OnboardReseller";

export default function ManageRAdminReseller() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const emailInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const [active, setActive] = useState(false);
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "reseller id", accessorKey: "r_id" },
    { header: "reseller name", accessorKey: "name" },
    { header: "reseller email", accessorKey: "email" },
    { header: "phone number", accessorKey: "phonenumber" },
    {
      header: "toggle activate",
      accessorKey: "",
      cell: (row) => (
        <div
          className="flex justify-between  "
          onClick={(e) => {
            toggleActive(row.row.original.r_id, row.row.original.is_active);
          }}
        >
          {row.row.original.is_active ? (
            <BsToggle2On className="cursor-pointer text-green-500" size={30} />
          ) : (
            <BsToggle2Off
              className="cursor-pointer  text-red-500 stroke-red-500"
              size={30}
            />
          )}
        </div>
      ),
    },
  ];

  function toggleActive(id, is_active) {
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
        text: is_active
          ? ` Are you sure to deactivate this account ?`
          : " This account will be activated are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("deleting ", id);
          dispatch(toggle_activate_reseller({ id })).then(() => {
            dispatch(get_radmin_reseller());
          });

          if (is_active) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your account has been deactivated.",
              icon: "success",
            });
          } else {
            swalWithBootstrapButtons.fire({
              title: "Activated !",
              text: "Your account is activated now.",
              icon: "success",
            });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "No changes done to your account :)",
            icon: "error",
          });
        }
      });
  }

  const [reseller, setReseller] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const {
    radminMerchants,
    radminResellers,
    resellerMerchants,
    payinTransaction,
    loader,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.reselleradmin);

  useEffect(() => {
    dispatch(get_radmin_reseller());
    console.log("radminResellers", radminResellers);
    messageClear();
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

  return (
    <>
      <div className="my-5 ">
        <Button
          className="lg:ml-5 ml-4 "
          gradientDuoTone="purpleToBlue"
          onClick={() => setOpenModal((prev) => !openModal)}
        >
          Onboard Reseller
        </Button>

        {openModal && <OnboardReseller setOpenModal={setOpenModal} />}

        {loader ? (
          <div className="flex items-center justify-center text-xl">
            Loading ........
          </div>
        ) : (
          <div className="mt-4">
            <TanStackTable
              headers={headers}
              data={radminResellers}
              className="second-bg rounded-t-md"
            />
          </div>
        )}
      </div>
    </>
  );
}
