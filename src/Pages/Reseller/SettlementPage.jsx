import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";
// import Callendar from "../Callendar/Callendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  fetch_datewise_transaction,
  get_transactions,
  messageClear,
} from "../../redux/payin/transactionReducer";
import { Dropdown } from "flowbite-react";
const SettlementPage = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Transaction Gid", accessorKey: "transaction_gid" },
    { header: "Vendor Transaction Id", accessorKey: "vendor_transaction_id" },
    { header: "Vendor Id", accessorKey: "vendor_id" },
    { header: "Bank ref no ", accessorKey: "bank_ref_no" },
    { header: "Order id", accessorKey: "order_id" },
    { header: "Transaction Response", accessorKey: "transaction_response" },
    { header: "Transaction Method", accessorKey: "transaction_method" },
    { header: "Transaction Type", accessorKey: "transaction_type" },
    { header: "Transaction Username", accessorKey: "transaction_username" },
    { header: "Transaction Email", accessorKey: "transaction_email" },
    { header: "Transaction Contact", accessorKey: "transaction_contact" },
    { header: "transaction_amount ", accessorKey: "transaction_amount" },
    { header: "transaction_status", accessorKey: "transaction_status" },
    { header: "transaction_mode", accessorKey: "transaction_mode" },
    { header: "transaction_motes", accessorKey: "transaction_motes" },
    {
      header: "Transaction Description",
      accessorKey: "Transaction_description",
    },
    { header: "Axonaio_tax", accessorKey: "axonaio_tax" },
    { header: "GST", accessorKey: "goods_service_tax" },
    { header: "adjustment_done", accessorKey: "adjustment_done" },
    { header: "transaction_date", accessorKey: "transaction_date" },
    { header: "transaction_ip", accessorKey: "transaction_ip" },

    // {
    //   header: "Action",
    //   accessorKey: "",
    //   cell: (info) => "Edit | Delete",
    // },
  ];
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [dateInput, setDateInput] = useState(null);
  const [data, setData] = useState([]);

  const { transactionData, successMessage, loader } = useSelector(
    (state) => state.transaction
  );
  const { mode } = useSelector((state) => state.user);

  useEffect(() => {
    if (transactionData.length > 0) {
      setData(transactionData[0].documents);
    }
  }, [transactionData]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      dispatch(
        get_transactions({ startDate: startDate.$d, endDate: endDate.$d, mode })
      );
    }
    dispatch(get_transactions({ startDate: null, endDate: null, mode }));

    if (successMessage) {
      console.log("setting the data in table");
      setData(transactionData[0].documents);
      dispatch(messageClear());
    }
  }, [startDate, endDate]);
  const { isOpen } = useSelector((slice) => slice.sidebar);

  return (
    <div
      className={` h-full  ${
        isOpen === true ? " w-[86vw] " : "  w-[94vw] "
      } sm:py-1`}
    >
      <div className="my-4 w-full py-8 flex lg:flex-row flex-col rounded-lg bg-[#a3b1cc]/70 gap-8 px-8 lg:gap-12 z-[99999] items-center justify-center">
        <div className="flex flex-row w-full  lg:gap-4 gap-8">
          <div className="    flex">
            <Dropdown
              label="Select Mercahant"
              gradientDuoTone="purpleToBlue"
              dismissOnClick={false}
            >
              <Dropdown.Item>merchant 1 </Dropdown.Item>
              <Dropdown.Item>merchant 2</Dropdown.Item>
              <Dropdown.Item>merchant 3</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="  flex">
            <Dropdown
              label=" Select "
              gradientDuoTone="purpleToBlue"
              dismissOnClick={false}
            >
              <Dropdown.Item>pay In</Dropdown.Item>
              <Dropdown.Item>pay Out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="flex items-center justify-center w-full  gap-8">
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

export default SettlementPage;
