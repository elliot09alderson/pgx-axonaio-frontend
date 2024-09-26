import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../TansStackTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  fetch_datewise_orders,
  get_orders,
  messageClear,
} from "../../../redux/payin/OrderReducer";
import { useSnackbar } from "notistack";
import { convertToEndDate } from "../../../utils/dateConverter";
import moment from "moment";
import { convertUtcToIst, getRelativeTime } from "../../../utils/dateConverter";
const PgOrders = () => {
  const headers = [
    { header: "Order id", accessorKey: "order_id" },
    { header: "transaction id", accessorKey: "transaction_id" },

    { header: "Order Amount ", accessorKey: "order_amount" },
    { header: "Order Attempts", accessorKey: "order_attempts" },
    { header: "Order Receipt", accessorKey: "order_receipt" },
    { header: "Order Status", accessorKey: "order_status" },

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
  // const [dateInput, setDateInput] = useState(null);
  const [data, setData] = useState([]);

  const { orderData, successMessage, loader, errorMessage } = useSelector(
    (state) => state.order
  );
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    setData(orderData);
  }, [orderData]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      dispatch(
        fetch_datewise_orders({
          startDate: start,
          endDate: end,
          mode,
        })
      );
    } else {
      dispatch(get_orders({ mode }));
    }

    if (successMessage) {
      console.log("setting the data in table");

      setData(orderData);
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
    <div className={`  h-full  sm:py-1`}>
      <div className="my-4 w-full py-8 flex rounded-lg bg-stone-300 gap-8 px-8 lg:gap-12 z-[99999] items-center justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h1>from</h1>
          <DatePicker
            className="text-slate-700 border-slate-700"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h1 className="text-slate-700">to</h1>
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

export default PgOrders;
