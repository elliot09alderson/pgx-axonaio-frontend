import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";
// import Callendar from "../Callendar/Callendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  create_merchant,
  get_reseller_payin_transaction_by_date,
  get_reseller_merchant,
  messageClear,
  get_reseller_payin_transaction,
} from "../../redux/ResellerReducer/resellerReducer";
import { Dropdown } from "flowbite-react";

import { useSnackbar } from "notistack";
import moment from "moment";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../utils/dateConverter";

const MerchantWiseTransaction = () => {
  const headers = [
    { header: "Transaction id", accessorKey: "transaction_id" },
    { header: " Transaction method Id", accessorKey: "transaction_method_id" },
    { header: "Bank ref no ", accessorKey: "bank_ref_no" },
    { header: "Order id", accessorKey: "order_id" },

    { header: "Transaction Contact", accessorKey: "transaction_contact" },
    { header: "transaction_amount ", accessorKey: "transaction_amount" },
    { header: "status", accessorKey: "transaction_status" },
    { header: "transaction_mode", accessorKey: "transaction_mode" },
    { header: "adjustment done", accessorKey: "adjustment_done" },
    { header: "transaction_motes", accessorKey: "transaction_motes" },
    {
      header: "Transaction Description",
      accessorKey: "Transaction_description",
    },
    { header: "Axonaio_tax", accessorKey: "axonaio_tax" },
    { header: "GST", accessorKey: "goods_service_tax" },
    { header: "transaction_date", accessorKey: "transaction_date" },
    { header: "transaction_ip", accessorKey: "transaction_ip" },
    {
      header: "created date",
      accessorKey: "createdAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
    },
    {
      header: "updated date",
      accessorKey: "updatedAt",
      cell: (row) => convertUtcToIst(row.row.original.updatedAt),
    },
  ];

  const {
    resellerMerchant,
    payinTransaction,
    successMessage,
    errorMessage,
    loader,
  } = useSelector((state) => state.reseller);
  const { mode } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    setMerchantData(resellerMerchant);
  }, [resellerMerchant]);

  useEffect(() => {
    dispatch(get_reseller_merchant({ mode }));
    console.log(resellerMerchant);
  }, []);

  useEffect(() => {
    setData(payinTransaction);
  }, [payinTransaction]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      if (!merchant?.m_id) {
        enqueueSnackbar("plese select the merchant");
      } else {
        dispatch(
          get_reseller_payin_transaction_by_date({
            id: merchant?.m_id,
            startDate: start,
            endDate: end,
            mode,
          })
        );
      }
    } else {
      if (merchant?.m_id) {
        dispatch(get_reseller_payin_transaction({ id: merchant.m_id, mode }));
      }
    }

    if (successMessage) {
      console.log("setting the data in table");
      setData(payinTransaction);
      dispatch(messageClear());
    }
  }, [startDate, merchant, endDate]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage);
    }
    if (successMessage) {
      enqueueSnackbar(successMessage);
    }
    dispatch(messageClear());
  }, [errorMessage, successMessage]);

  // _______select merchant________
  function selectMerchant(m_id, name) {
    dispatch(get_reseller_payin_transaction({ id: m_id, mode }));
    setMerchant({ m_id, name });
  }
  // ____________________________
  return (
    <div className=" w-full h-full  sm:py-1">
      <div className="my-4 w-full py-8 flex lg:flex-row flex-col rounded-lg bg-[#a3b1cc]/70 gap-8 px-8 lg:gap-12 z-[99999] items-center justify-center">
        <div className="flex flex-row w-full  lg:gap-4 gap-8">
          <div className=" flex">
            <Dropdown
              label={merchant ? merchant.name : `Select Mercahant`}
              gradientDuoTone="purpleToBlue"
              // dismissOnClick={false}
            >
              {merchantData.map((item, idx) => (
                <div key={idx}>
                  <Dropdown.Item
                    onClick={() => {
                      selectMerchant(item.m_id, item.name);
                    }}
                  >
                    {item.name}{" "}
                  </Dropdown.Item>
                </div>
              ))}
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
          data={payinTransaction}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default MerchantWiseTransaction;
