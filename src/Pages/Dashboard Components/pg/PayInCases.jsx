import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  fetch_datewise_cases,
  get_cases,
  messageClear,
} from "../../../redux/payin/payIncaseReducer";
import { useSnackbar } from "notistack";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import moment from "moment";

const PayInCases = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Refund Gid", accessorKey: "case_gid" },
    { header: "case status", accessorKey: "case_status" },
    { header: "Transaction Gid", accessorKey: "transaction_gid" },
    {
      header: "case Amount",
      accessorKey: "case_amount",
    },
    { header: "case type", accessorKey: "case_type" },
    {
      header: "updated at",
      accessorKey: "updatedAt",
      cell: (row) => getRelativeTime(row.row.original.updatedAt),
    },
    {
      header: "created date",
      accessorKey: "createdAt",
      cell: (row) => convertUtcToIst(row.row.original.createdAt),
    },
  ];

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [data, setData] = useState([]);

  const { caseData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.case
  );
  const { mode } = useSelector((state) => state.user);
  useEffect(() => {
    setData(caseData);
  }, [caseData]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_cases({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_cases({ mode }));
    }

    if (successMessage) {
      console.log("setting the data in table");

      setData(caseData);
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
    <div className={`  h-full   sm:py-1`}>
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
          data={data}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default PayInCases;
