import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";

import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  get_reseller_merchant,
  messageClear,
  toggle_activate_merchant,
  get_reseller_payin_transaction,
} from "../../redux/ResellerReducer/resellerReducer";

import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { useSnackbar } from "notistack";

import OnboardMerchant from "./AddMerchant/OnboardMerchant";

export default function ManageMerchant() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "merchant id", accessorKey: "m_id" },
    { header: "merchant name", accessorKey: "name" },
    { header: "merchant email", accessorKey: "email" },
    { header: "phone number", accessorKey: "phonenumber" },
    {
      header: "toggle activate",
      accessorKey: "",
      cell: (row) => (
        <div
          className="flex justify-between  "
          onClick={(e) => {
            console.log(row.row.original);
            toggleActive(row.row.original.m_id, row.row.original.is_active);
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
          dispatch(toggle_activate_merchant({ id, mode })).then(() => {
            dispatch(get_reseller_merchant({ mode }));
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
  // _____________ manage merchant section  _________
  const { resellerMerchant, successMessage, errorMessage, loader } =
    useSelector((state) => state.reseller);
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(get_reseller_merchant({ mode }));

    console.log("resellerMerchant ===>", resellerMerchant);
  }, []);

  // ____________________________________________________

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
          Onboard Merchant
        </Button>

        {openModal && <OnboardMerchant setOpenModal={setOpenModal} />}

        {loader ? (
          <div className="flex items-center justify-center text-xl">
            Loading ........
          </div>
        ) : (
          <div className="mt-4">
            <TanStackTable
              headers={headers}
              data={resellerMerchant}
              className="second-bg rounded-t-md"
            />
          </div>
        )}
      </div>
    </>
  );
}
