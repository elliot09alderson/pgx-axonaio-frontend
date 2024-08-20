import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  get_fundStatement_by_date,
  get_fundStatement,
  messageClear,
} from "../../../redux/payout/fundStatementReducer";
import { useSnackbar } from "notistack";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import moment from "moment";

const FundStatement = () => {
  const headers = [
    { header: "Disbursement Date & Time", accessorKey: "profile" },
    { header: "Transaction Id", accessorKey: "firstName" },
    { header: "Account Name", accessorKey: "firstName" },
    { header: "IFSC Code", accessorKey: "firstName" },
    { header: "TDR Charged", accessorKey: "firstName" },
    { header: "Account Number", accessorKey: "firstName" },
    { header: "Udf1", accessorKey: "firstName" },
    { header: "API Key", accessorKey: "lastName" },
    { header: "Order Id", accessorKey: "age" },
    { header: "Status", accessorKey: "age" },
    { header: "Mode", accessorKey: "age" },
    { header: "Order Id", accessorKey: "age" },
    { header: "Amount Transferred", accessorKey: "visits" },
    { header: "Utr", accessorKey: "visits" },
    { header: "Beneficiary Id", accessorKey: "visits" },
    { header: "GST Charged", accessorKey: "visits" },
    { header: "Error", accessorKey: "visits" },

    {
      header: "last updated",
      accessorKey: "updatedAt",
      cell: (row) => getRelativeTime(row.row.original.updatedAt),
    },
    {
      header: "updated Date",
      accessorKey: "updatedAt",
      cell: (row) => convertUtcToIst(row.row.original.createdAt),
    },
  ];

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { fundStatementData, successMessage, loader, errorMessage } =
    useSelector((state) => state.fundstatement);
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        get_fundStatement_by_date({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_fundStatement({mode}));
    }

    if (successMessage) {
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
        <div className="flex items-center justify-center tetx-xl">
          Loading ........
        </div>
      ) : (
        <TanStackTable
          headers={headers}
          successMessage={successMessage}
          data={fundStatementData}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default FundStatement;
