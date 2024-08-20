import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";
// import Callendar from "../Callendar/Callendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  convertToEndDate,
  convertToUTC,
  convertUtcToIst,
  getRelativeTime,
} from "../../utils/dateConverter";
import {
  create_merchant,
  get_reseller_payin_transaction_by_date,
  get_reseller_merchant,
  messageClear,
  get_reseller_payin_transaction,
} from "../../redux/ResellerReducer/resellerReducer";
import { useSnackbar } from "notistack";
import { Dropdown } from "flowbite-react";
import {
  get_radmin_merchant,
  get_radmin_reseller,
  get_radmin_resellers_merchant,
  get_radmin_today_transactions,
  get_radmin_transactions_byDate,
} from "../../redux/resellerAdmin/resellerAdmin";
import moment from "moment";

const MerchantWiseTransaction = () => {
  const headers = [
    // { header: "id", accessorKey: "_id" },
    { header: "Transaction id", accessorKey: "transaction_id" },
    { header: " Transaction method Id", accessorKey: "transaction_method_id" },
    // { header: "Vendor Id", accessorKey: "vendor_id" },
    { header: "Bank ref no ", accessorKey: "bank_ref_no" },
    { header: "Order id", accessorKey: "order_id" },

    { header: "Transaction Contact", accessorKey: "transaction_contact" },
    { header: "transaction_amount ", accessorKey: "transaction_amount" },
    { header: "status", accessorKey: "transaction_status" },
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
    {
      header: "from now",
      accessorKey: "createdAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
    },
    {
      header: "created date",
      accessorKey: "updatedAt",
      cell: (row) => convertUtcToIst(row.row.original.updatedAt),
    },
  ];

  const {
    radminMerchants,
    radminResellers,
    resellerMerchants,
    payinTransaction,
    loader,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.reselleradmin);
  const { mode } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [merchant, setMerchant] = useState(null);
  const [reseller, setReseller] = useState(null);

  useEffect(() => {
    dispatch(get_radmin_merchant({ mode }));
  }, []);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      if (!merchant?.m_id) {
        enqueueSnackbar("please select the merchant");
      } else {
        dispatch(
          get_radmin_transactions_byDate({
            id: merchant?.m_id,
            startDate: start,
            endDate: end,
          })
        );
      }
    } else {
      if (merchant?.m_id) {
        dispatch(get_radmin_today_transactions({ id: merchant.m_id, mode }));
      } else {
        enqueueSnackbar("please select merchant");
      }
    }
  }, [startDate, merchant, reseller, endDate]);

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
    dispatch(get_radmin_today_transactions({ id: m_id, mode }));
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
              {radminMerchants.map((item, idx) => (
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
