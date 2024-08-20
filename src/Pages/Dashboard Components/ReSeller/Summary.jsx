import React from "react";
import MultiLineChart from "./MultiLineChart";
import ReactCallender from "../OtherComponents/ReactCallender";
import { useState, useEffect } from "react";
import DateRangePickerComp from "../../../components/DateRangePicker/DateRangePickerComp";
import { addDays } from "date-fns";



function Card({ className, heading }) {
  return (
    <div
      className={`${className} p-6 rounded-md   third-bg    sm:min-w-[200px] w-[300px]`}
    >
      <h1 className=" mb-4 second-text tracking-wider font-bold">{heading}</h1>
      <div className="gap-4 flex  flex-col">
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">
            Success Volume:
          </span>{" "}
          <span></span>
        </div>
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">
            Tansaction Count:
          </span>{" "}
          <span></span>
        </div>
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">
            Success Count:
          </span>{" "}
          <span></span>
        </div>
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">
            Failed Count:
          </span>{" "}
          <span></span>
        </div>
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">
            Total Fees
          </span>{" "}
          <span></span>
        </div>
        <div className="mb-1">
          <span className="first-text tracking-wider semi-bold">Total Tax</span>{" "}
          <span></span>
        </div>
      </div>
    </div>
  );
}

function Commission({ comission, pendingComission }) {
  return (
    <div className=" min-h-72 h-[335px] flex-wrap flex flex-col justify-between third-bg p-4 rounded-md">
      <div>
        <h1 className="text-md text-center font-bold second-text my-2 ">
          Recent Commision Details
        </h1>
        {comission.map(
          (com, idx) =>
            idx < 3 && (
              <p
                value=""
                className="text-center block first-text tracking-wider "
                key={idx}
              >
                {com}{" "}
              </p>
            )
        )}
      </div>
      <div>
        <h1 className="text-md text-center my-2 font-bold second-text ">
          Recent Pending Commision Details
        </h1>
        <div className="flex flex-col">
          {pendingComission.map(
            (com, idx) =>
              idx < 3 && (
                <p
                  value=""
                  className="text-center block first-text tracking-wider "
                  key={idx}
                >
                  {com}{" "}
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
}
export const SelectDateRange = ({ comission }) => {
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  return (
    <div className="flex sm:flex-row flex-col second-bg items-center justify-center p-4 gap-14 rounded-md  w-full min-h-36 shadow-md ">
      <div className="flex flex-col w-[400px]">
        <ReactCallender
          dateOne={dateOne}
          setDateOne={setDateOne}
          dateTwo={dateTwo}
          setDateTwo={setDateTwo}
        />
      </div>

      <button
        type="submit"
        className="px-8 rounded-md py-2 first-bg flex  text-white mb-2  shadow-sm self-end"
      >
        Submit
      </button>
    </div>
  );
};

const Summary = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const resellersMerchant = [1, 2, 3, 4, 4];
  useEffect(() => {
    console.log(range[0].startDate, range[0].endDate);
  }, [range]);

  const comission = ["A", "B", "C", "D", "E", "F"];
  const pendingComission = ["xyz", "xyzB", "xyzC", "D", "E", "F"];
  return (
    <div className="flex flex-col items-center gap-5   justify-center w-full ">
      <div className="flex justify-center items-center gap-8">
        <div className="w-64  ">
          <h1 className="my-2 text-center text-2xl mb-4 text-gray-700 ">
            Select Merchant
          </h1>
          <select className="w-64 rounded-md outline-none border-none focus:outline-none">
            <option className="">Select Merchant</option>
            {resellersMerchant.map((rs, idx) => (
              <option key={rs + idx}>{rs}</option>
            ))}
          </select>
        </div>
        <DateRangePickerComp setRange={setRange} range={range} />
        <button className="text-center px-6 py-2 self-end mb-2 third-bg second-text font-bold tracking-wider rounded-md h-10">
          View
        </button>
      </div>
      <div className="  flex   bg-none w-11/12 p-8 rounded-xl flex-col items-center justify-center gap-8">
        <div className="flex sm:flex-row flex-col items-center justify-center gap-8 ">
          <Card heading={"pay in"} />
          <Card heading={"pay out"} />
          <Commission
            comission={comission}
            pendingComission={pendingComission}
          />
        </div>
      </div>

      <div className="mt-4">
        <MultiLineChart />
      </div>
    </div>
  );
};

export default Summary;
