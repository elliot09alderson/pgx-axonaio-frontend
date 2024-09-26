import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Dashboard Components/TansStackTable";
// import Callendar from "../Callendar/Callendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  get_reseller_merchant,
  messageClear,
  get_reseller_payout_fundstatement,
  get_reseller_payout_fundstatement_by_date,
} from "../../redux/ResellerReducer/resellerReducer";
import { Dropdown } from "flowbite-react";

import { useSnackbar } from "notistack";
import moment from "moment";
import {
  convertToEndDate,
  convertUtcToIst,
  getRelativeTime,
} from "../../utils/dateConverter";

const MerchantWiseFundStatement = () => {
  const headers = [
    { header: "Fund Id", accessorKey: "fund_id" },
    { header: "Reference Id", accessorKey: "reference_id" },
    { header: "amount ", accessorKey: "amount" },
    {
      header: "Operation Type",
      accessorKey: "type",
      cell: (row) => (
        <p
          className={`${
            row.row.original.type === "CR" ? " bg-green-500 " : " bg-red-800 "
          } rounded text-white text-center`}
        >
          {row.row.original.type}
        </p>
      ),
    },
    { header: "opening balnce", accessorKey: "opening_balance" },
    { header: "closing balnce", accessorKey: "closing_balance" },
    {
      header: "last updated",
      accessorKey: "updatedAt",
      cell: (row) => getRelativeTime(row.row.original.createdAt),
    },
    {
      header: "created date",
      accessorKey: "createdAt",
      cell: (row) => convertUtcToIst(row.row.original.updatedAt),
    },

    { header: "utr", accessorKey: "utr" },
  ];

  const {
    resellerMerchant,
    payoutTransfer,
    fundStatement,
    successMessage,
    errorMessage,
    loader,
  } = useSelector((state) => state.reseller);
  const { mode } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [merchantData, setMerchantData] = useState([]);
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    setMerchantData(resellerMerchant);
  }, [resellerMerchant]);

  useEffect(() => {
    dispatch(get_reseller_merchant({ mode }));
  }, []);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      if (!merchant?.m_id) {
        enqueueSnackbar("plese select the merchant");
      } else {
        dispatch(
          get_reseller_payout_fundstatement_by_date({
            id: merchant?.m_id,
            startDate: start,
            endDate: end,
            mode,
          })
        );
      }
    } else {
      if (merchant?.m_id) {
        dispatch(
          get_reseller_payout_fundstatement({ id: merchant.m_id, mode })
        );
      }
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
    dispatch(get_reseller_payout_fundstatement({ id: m_id, mode }));
    setMerchant({ m_id, name });
  }
  const { isOpen } = useSelector((slice) => slice.sidebar);

  // ____________________________
  return (
    <div
      className={` ${
        isOpen === true ? " w-[84vw] " : "  w-[96vw] "
      }  w-full h-full  sm:py-1`}
    >
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
          data={fundStatement}
          clearMessage={messageClear}
          className="second-bg rounded-t-md"
          // component={<DropDown />}
        />
      )}
    </div>
  );
};

export default MerchantWiseFundStatement;
