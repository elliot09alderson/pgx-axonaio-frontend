import React from "react";
import TanStackTable from "../TansStackTable";
import { useState } from "react";
import ReactCallender from "../OtherComponents/ReactCallender";
import ReactModal from "../OtherComponents/ReactModal";
import MultiStepForm from "../multi-step-form/MultiStepForm";
import MainComponentPage from "../../BusinessForm/MainFormPage";

const headers = [
  { header: "M-Id", accessorKey: "profile" },
  { header: "Order Id", accessorKey: "order_id" },
  { header: "Transaction Id", accessorKey: "transaction_id" },
  { header: "Amount Transfered", accessorKey: "amount_transfered" },
  { header: "UTR", accessorKey: "utr" },
  { header: "Beneficiary Id", accessorKey: "beneficiary_id" },
  { header: "Account Name", accessorKey: "account_name" },
  { header: "Account Number", accessorKey: "account_number" },
  { header: "IFSC Code", accessorKey: "ifsc_code" },
  { header: "Status", accessorKey: "status" },
  { header: "Mode", accessorKey: "mode" },
  { header: "Udf1", accessorKey: "udf1" },
  { header: "TDR Charged", accessorKey: "tdr_charged" },
  {
    header: "Action",
    accessorKey: "",
    cell: (info) => "Edit | Delete",
  },
];
const ManageMerchant = () => {
  const [openModal, setOpenModal] = useState(undefined);
  const btnObj = { func: () => setOpenModal("default"), name: "Add Merchant" };
  return (
    <div>
      <div className="w-[500px]">
        <MultiStepForm openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <h1 className="text-center drop-shadow-sm font-bold first-text text-4xl p-2 mt-4">
        Merchant Table
      </h1>
      <div className=" w-full sm:px-[2vw] sm:py-1 h-full">
        <TanStackTable
          headers={headers}
          className="second-bg rounded-lg"
          btnObj={btnObj}
        />
      </div>
    </div>
  );
};

export default ManageMerchant;
