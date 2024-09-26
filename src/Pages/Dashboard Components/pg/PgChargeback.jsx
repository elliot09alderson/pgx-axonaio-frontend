import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  fetch_datewise_chargebacks,
  get_chargebacks,
  messageClear,
} from "../../../redux/payin/chargebackReducer";
import { useSnackbar } from "notistack";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import moment from "moment";

const PgChargeback = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Refund Gid", accessorKey: "chargeback_gid" },
    { header: "Chargeback status", accessorKey: "chargeback_status" },
    { header: "Transaction Gid", accessorKey: "transaction_gid" },
    {
      header: "Chargeback Amount",
      accessorKey: "chargeback_amount",
    },
    { header: "Cahrgeback type", accessorKey: "chargeback_type" },
    {
      header: "from now",
      accessorKey: "createdAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
    },
    {
      header: "updated Date",
      accessorKey: "updatedAt",
      cell: (row) => convertUtcToIst(row.row.original.updatedAt),
    },
  ];

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { chargebackData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.chargeback
  );
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_chargebacks({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_chargebacks({ mode }));
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
    <div className={` h-full  sm:py-1`}>
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
          data={chargebackData}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default PgChargeback;
