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
  get_radmin_fundstatement_byDate,
  get_radmin_reseller,
  get_radmin_resellers_merchant,
  get_radmin_today_fundstatement,
  get_radmin_today_transactions,
  get_radmin_today_transfer,
  get_radmin_transactions_byDate,
  get_radmin_transfer_byDate,
} from "../../redux/resellerAdmin/resellerAdmin";
import moment from "moment";

const ResellerWiseFundStatement = () => {
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
      cell: (row) => convertUtcToIst(row.row.original.createdAt),
    },

    { header: "utr", accessorKey: "utr" },
  ];

  const {
    radminMerchants,
    fundStatement,
    radminResellers,
    resellerMerchants,

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
    dispatch(get_radmin_reseller({ mode }));
  }, []);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const start = moment(startDate.$d).utc().toDate().toISOString();
      const end = convertToEndDate(endDate.$d);
      if (!merchant?.m_id) {
        enqueueSnackbar("please select the merchant");
      } else if (!reseller?.r_id) {
        enqueueSnackbar("please select the reseller");
      } else {
        dispatch(
          get_radmin_fundstatement_byDate({
            id: merchant?.m_id,
            startDate: start,
            endDate: end,
            mode,
          })
        );
      }
    } else {
      if (reseller?.r_id) {
        if (merchant?.m_id) {
          dispatch(get_radmin_today_fundstatement({ id: merchant.m_id, mode }));
        } else {
          enqueueSnackbar("please select merchant");
        }
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
    dispatch(get_radmin_today_transfer({ id: m_id, mode }));
    setMerchant({ m_id, name });
  }
  // _______select reseller
  function selectReseller(r_id, name) {
    dispatch(get_radmin_resellers_merchant({ rid: r_id, mode }));
    setReseller({ r_id, name });
  }
  const { isOpen } = useSelector((slice) => slice.sidebar);

  // ____________________________
  return (
    <div
      className={`  h-full ${
        isOpen === true ? " w-[84vw] " : "  w-[96vw] "
      }   sm:py-1`}
    >
      <div className="my-4 w-full py-8 flex lg:flex-row flex-col rounded-lg bg-[#a3b1cc]/70 gap-8 px-8 lg:gap-12 z-[99999] items-center justify-center">
        <div className="flex flex-col  lg:flex-row w-full   lg:gap-4 gap-8">
          <div className="  flex">
            <Dropdown
              label={reseller ? reseller.name : `Select Reseller`}
              gradientDuoTone="purpleToBlue"
              // dismissOnClick={false}
            >
              {radminResellers.map((item, idx) => (
                <div key={idx}>
                  <Dropdown.Item
                    onClick={() => {
                      selectReseller(item.r_id, item.name);
                    }}
                  >
                    {item.name}{" "}
                  </Dropdown.Item>
                </div>
              ))}
            </Dropdown>
          </div>
          <div className=" flex">
            <Dropdown
              label={merchant ? merchant.name : `Select Mercahant`}
              gradientDuoTone="purpleToBlue"
              // dismissOnClick={false}
            >
              {resellerMerchants.map((item, idx) => (
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
        <div>
          <TanStackTable
            headers={headers}
            successMessage={successMessage}
            data={fundStatement}
            clearMessage={messageClear}
            className="second-bg rounded-t-md"
          />
        </div>
      )}
    </div>
  );
};

export default ResellerWiseFundStatement;
