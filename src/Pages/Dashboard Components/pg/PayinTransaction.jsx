import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
// import Callendar from "../Callendar/Callendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  fetch_datewise_transaction,
  get_transactions,
  messageClear,
} from "../../../redux/payin/transactionReducer";
import { useSnackbar } from "notistack";
import moment from "moment";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";

const PayinTransaction = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    // { header: "Transaction Gid", accessorKey: "transaction_gid" },
    { header: "Transaction Id", accessorKey: "transaction_id" },
    { header: "amount ", accessorKey: "transaction_amount" },
    // { header: "Axon aio", accessorKey: "axonaio_tax" },
    { header: "Order id", accessorKey: "order_id" },
    { header: "transaction_mode", accessorKey: "transaction_mode" },
    {
      header: "from now",
      accessorKey: "createdAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
    },
    {
      header: "created date",
      accessorKey: "createdAt",
      cell: (row) => convertUtcToIst(row.row.original.createdAt),
    },
    { header: "Transaction Response", accessorKey: "transaction_response" },
    { header: "Transaction Method", accessorKey: "transaction_method" },
    { header: "Transaction Type", accessorKey: "transaction_type" },
    { header: " Username", accessorKey: "transaction_username" },
    { header: " Email", accessorKey: "transaction_email" },
    { header: "Vendor Id", accessorKey: "vendor_id" },
    { header: "Transaction Contact", accessorKey: "transaction_contact" },
    { header: "status", accessorKey: "transaction_status" },
    { header: "Bank ref no ", accessorKey: "bank_ref_no" },
    { header: "notes", accessorKey: "transaction_otes" },
    {
      header: "Description",
      accessorKey: "Transaction_description",
    },
    { header: "Axonaio tax", accessorKey: "axonaio_tax" },
    { header: "GST", accessorKey: "goods_service_tax" },
    { header: "adjustment done", accessorKey: "adjustment_done" },
    { header: "transaction_date", accessorKey: "transaction_date" },
    { header: "transaction_ip", accessorKey: "transaction_ip" },
  ];

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [dateInput, setDateInput] = useState(null);
  const [data, setData] = useState([]);

  const { transactionData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.transaction
  );
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    setData(transactionData);
  }, [transactionData]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_transaction({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_transactions({ mode }));
    }

    if (successMessage) {
      console.log("setting the data in table");

      setData(transactionData);
      dispatch(messageClear());
    }
  }, [startDate, endDate]);

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
    <div className=" w-full h-full  sm:py-1">
      <div className="my-4 w-full py-8 flex rounded-lg bg-[#a3b1cc]/70 gap-8 px-8 lg:gap-12 z-[99999] items-center justify-center">
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

      {loader ? (
        <div className="flex items-center justify-center text-xl">
          Loading ........
        </div>
      ) : (
        <TanStackTable
          headers={headers}
          successMessage={successMessage}
          data={data}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default PayinTransaction;
