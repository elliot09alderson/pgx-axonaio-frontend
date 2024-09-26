import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  fetch_datewise_refund,
  get_refund,
  messageClear,
} from "../../../redux/payin/refundReducer";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import moment from "moment";
import { useSnackbar } from "notistack";

const LiveRefund = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Refund Gid", accessorKey: "refund_id" },
    { header: "Transaction Gid", accessorKey: "transaction_id" },
    {
      header: "Refund Amount",
      accessorKey: "refund_amount",
    },
    { header: "Refund Notes", accessorKey: "refund_notes" },
    { header: "Refund Status ", accessorKey: "refund_status" },

    {
      header: "last updated ",
      accessorKey: "updatedAt",
      cell: (row) => getRelativeTime(row.row.original.updatedAt),
    },
    {
      header: "created date",
      accessorKey: "createdAt",
      cell: (row) => {
        console.log(row.row.original.createdAt);
        return convertUtcToIst(row.row.original.createdAt);
      },
    },
  ];
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { refundData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.refund
  );
  const { mode } = useSelector((state) => state.user);
  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_refund({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_refund({ mode }));
    }

    if (successMessage) {
      console.log("setting the data in table");

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
  const { isOpen } = useSelector((slice) => slice.sidebar);

  return (
    <div
      className={` w-full h-full ${
        isOpen === true ? " w-[84vw] " : "  w-[96vw] "
      }  sm:py-1`}
    >
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
        <div className="flex items-center justify-center tetx-xl">
          Loading ........
        </div>
      ) : (
        <TanStackTable
          headers={headers}
          successMessage={successMessage}
          data={refundData}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default LiveRefund;
