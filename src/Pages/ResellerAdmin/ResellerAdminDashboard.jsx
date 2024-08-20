import React, { useEffect, useState } from "react";
// import { PolarArea } from "react-chartjs-2";

import AreaChart from "../Dashboard Components/Graph&Chart/AreaChart";
import BarChart from "../Dashboard Components/Graph&Chart/BarChart";
import { Dropdown } from "flowbite-react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  get_radmin_reseller,
  get_radmin_resellers_merchant,
  messageClear,
} from "../../redux/resellerAdmin/resellerAdmin";
import { useSnackbar } from "notistack";

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const AreaChartData = [200, 300, 600, 200, 300];

const ResellerAdminDashboard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [reseller, setReseller] = useState(null);
  const [merchant, setMerchant] = useState(null);
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

  useEffect(() => {
    dispatch(get_radmin_reseller());
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                         when reseller gets selected                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (reseller) {
      dispatch(get_radmin_resellers_merchant({ rid: reseller.rid, mode }));
    }
  }, [reseller]);

  // ____________________________________________________

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
    <div className="bg-[#e5e9ee] w-full  flex items-center  flex-col gap-4 px-2">
      <div className="w-full bg-white rounded-xl py-8 lg:flex-row flex-col flex px-12 lg:gap-0 gap-8 items-center justify-center my-5 ">
        <div className="flex flex-row w-full  lg:gap-4 gap-8">
          <div className="  flex ">
            <Dropdown
              label={reseller ? reseller.name : "select reseller"}
              gradientDuoTone="purpleToBlue"
              dismissOnClick={true}
            >
              <Dropdown.Item> select all </Dropdown.Item>
              {radminResellers.length > 0 &&
                radminResellers.map((reseller, idx) => (
                  <Dropdown.Item onClick={() => setReseller(reseller)}>
                    {reseller.name}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
          <div className=" w-72    flex">
            <Dropdown
              label={merchant ? merchant.name : "select merchant"}
              gradientDuoTone="purpleToBlue"
              dismissOnClick={true}
            >
              {resellerMerchants.length > 0 &&
                resellerMerchants.map((merchant, idx) => (
                  <Dropdown.Item onClick={() => setMerchant(merchant)}>
                    {merchant.name}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
        </div>

        <div className="callendar lg:flex-row flex-col flex gap-4 w-full items-center justify-center ">
          <div className="">
            <h1 className="">From</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h1>To</h1>
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <div className="card-group flex lg:flex-row flex-col  items-center justify-center my-12  gap-20 w-full lg:px-12 px-2 ">
        <div className="bg-white tairo-text w-full flex gap-8 px-4 py-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer duration-500 ">
          <div className="flex flex-col   gap-4 justify-center p-4">
            <h1 className="">Success transactions</h1>
            <h1 className=" ">total transactions</h1>
            <h1 className=" ">Failed transactions</h1>
          </div>
          <div className="flex flex-col  gap-4 justify-center p-4">
            <h2 className="font-semibold tairo-text-blue">50000</h2>
            <h2 className="font-semibold tairo-text-blue">67000</h2>
            <h2 className="font-semibold tairo-text-blue">200</h2>
          </div>
        </div>

        <div className="bg-white tairo-text w-full flex gap-8 px-4 py-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer duration-500 ">
          <div className="flex flex-col  gap-4 justify-center p-4">
            <h1 className="">Success Volume</h1>
            <h1 className=" ">total Volume</h1>
            <h1 className=" ">Failed Volume</h1>
          </div>
          <div className="flex flex-col  gap-4 justify-center p-4">
            <h2 className="font-semibold tairo-text-blue">50000</h2>
            <h2 className="font-semibold tairo-text-blue">67000</h2>
            <h2 className="font-semibold tairo-text-blue">200</h2>
          </div>
        </div>
      </div>

      <div className="flex gap-20 items-center w-full lg:px-0 px-2 lg:flex-row flex-col justify-center">
        <div className=" bg-white rounded-xl p-4 w-full lg:w-[32vw] lg:h-[34vh] shadow-sm hover:shadow-md duration-500 cursor-pointer">
          <AreaChart
            title_1={"Success Volume"}
            data_1={AreaChartData}
            data_2={AreaChartData}
            title_2={"Total Volume"}
          />
        </div>
        <div className=" bg-white rounded-xl w-full lg:w-[32vw] lg:h-[34vh] p-4 shadow-sm hover:shadow-md duration-500 cursor-pointer">
          <AreaChart
            title_1={"Success Volume"}
            data_1={AreaChartData}
            data_2={AreaChartData}
            title_2={"Total Volume"}
          />
        </div>
      </div>

      <div className="flex lg:p-12 p-0 w-full">
        <div className="w-full bg-white  lg:h-[70vh]  h-full  rounded-xl p-4">
          <BarChart
            data_1={[400, 200, 100, 230, 422, 342]}
            data_2={[400, 400, 500, 230, 492, 342]}
            title_1={"Chargebacks"}
            title_2={"Refunds"}
            bgColor_1={"#a3b1cc"}
            bgColor_2={"#a5bde1"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellerAdminDashboard;
