import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  fetch_datewise_settlements,
  get_settlements,
  messageClear,
} from "../../../redux/payin/settlementReducer";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../../utils/dateConverter";
import { useSnackbar } from "notistack";
import moment from "moment";

const LiveSettlement = () => {
  const headers = [
    { header: "chargeback", accessorKey: "chargeback" },
    { header: "charges", accessorKey: "charges" },
    { header: "cut Off", accessorKey: "cutOff" },
    { header: "cycle", accessorKey: "cycle" },
    { header: "difference", accessorKey: "difference" },
    { header: "fund Released", accessorKey: "fundReleased" },
    {
      header: "merchant Name",
      accessorKey: "merchantName",
    },
    { header: "net Settlement", accessorKey: "netSettlement" },
    { header: "partner Id  ", accessorKey: "partnerId" },
    { header: "payee Vpa", accessorKey: "payeeVpa" },
    { header: "prevDayCreditAdj", accessorKey: "prevDayCreditAdj" },
    { header: "remarks", accessorKey: "remarks" },
    { header: "settlement Date", accessorKey: "settlementDate" },
    { header: "success Count", accessorKey: "successCount" },
    { header: "success Volume", accessorKey: "successVolume" },
    { header: "timeout Volume", accessorKey: "timeoutVolume" },
    { header: "timeout Count", accessorKey: "timeoutCount" },
    { header: "total Count", accessorKey: "totalCount" },
    { header: "totalVolume", accessorKey: "totalVolume" },
    { header: "transferred", accessorKey: "transferred" },
    { header: "utrNo", accessorKey: "utrNo" },
    { header: " prevDayCreditAdj", accessorKey: "prevDayCreditAdj" },
    {
      header: "from now",
      accessorKey: "createdAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
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

  const { settlementData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.settlement
  );
  const { mode } = useSelector((state) => state.user);
  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_settlements({
          startDate: start,
          endDate: end,mode
        })
      );
    } else {
      dispatch(get_settlements({mode}));
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
        {/* <Callendar
          startDate={startDate}
          dateEnd={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate} 
          dateInput={dateInput}
          setDateInput={setDateInput}
        /> */}

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
          data={settlementData}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default LiveSettlement;
