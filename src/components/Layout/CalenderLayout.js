import axios from "axios";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../utils/requestMethod";
import Calendar from "react-calendar";
import onFailure from "../../utils/error";
import "react-calendar/dist/Calendar.css";
const CalenderMainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CalendarContainer = styled.div`
  position: absolute;
  left: ${(props) => props.left};
  width: 70%;
  height: 400px;
  background-color: #fff;
  /* z-index: 100; */
  top: ${(props) => props.top};
`;
const CalenderDiv = styled.div`
  display: flex;
  padding: 40px 30px 30px 0px;
`;
const CalenderEachDiv = styled.div`
  padding: 10px;
  color: white;
`;
const CalenderLabel = styled.label`
  color: #ccc;
`;
const CalenderButtonDiv = styled.div`
  padding: 20px 20px 0px 0px;
`;
const CalenderButton = styled.button`
  padding: 10px;
  border-radius: 10px;
`;

const CalendarLayout = ({
  onHandleCalender,
  mode,
  left = "300px",
  top = "",
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [dateSetting, setDateSetting] = useState({
    from: new Date(),
    to: new Date(),
  });
  const date_select = new Date(
    new Date(dateSetting?.from).getTime() + 30 * 24 * 60 * 60 * 1000
  );
  const maxDate = date_select > new Date() ? new Date() : date_select;
  const onClickCalender = async () => {
    try {
      let currentDate = moment(new Date());
      let fromDateDiff = currentDate.diff(moment(dateSetting?.from), "days");
      let toDateDiff = currentDate.diff(moment(dateSetting?.to), "days");
      let dateDiff = moment(dateSetting?.to).diff(
        moment(dateSetting?.from),
        "days"
      );
      const tz = "Asia/Kolkata";
      if (
        currentDate >= 0 &&
        fromDateDiff >= 0 &&
        toDateDiff >= 0 &&
        dateDiff >= 0
      ) {
        if (mode !== "change") {
          const res = await axios.get(`${BASE_URL}/${mode}/fetch`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
            },
            params: {
              from: moment(dateSetting?.from)
                .tz(tz)
                .startOf("day")
                .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
              to: moment(dateSetting?.to)
                .tz(tz)
                .endOf("day")
                .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
            },
          });

          if (res.data) {
            onHandleCalender(res.data);
          }
        } else {
          const res = await axios.get(
            `${BASE_URL}/transaction/dashboard/transactionstats`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
              },
              params: {
                from: moment(dateSetting?.from)
                  .tz(tz)
                  .startOf("day")
                  .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
                to: moment(dateSetting?.to)
                  .tz(tz)
                  .endOf("day")
                  .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
              },
            }
          );
          const res2 = await axios.get(
            `${BASE_URL}/transaction/dashboard/dashboardGraphData`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
              },
              params: {
                from: moment(dateSetting?.from)
                  .tz(tz)
                  .startOf("day")
                  .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
                to: moment(dateSetting?.to)
                  .tz(tz)
                  .endOf("day")
                  .format("YYYY-MM-DDTHH:mm:ss.sssZ"),
              },
            }
          );
          onHandleCalender(res.data, res2.data);
        }
      } else {
        enqueueSnackbar(
          "Date should be less than current Date as well less than equal for one month!"
        );
      }
    } catch (error) {
      console.log(error);
      let status = onFailure(error);
      if (status) onHandleCalender([]);
    }
  };
  return (
    <div className="flex absolute left-0 top-10 third-bg rounded-md z-20 w-[60vw] md:w-auto  overflow-y-scroll">
      <div className="flex flex-col overflow-y-scroll">
        <div className="flex flex-col w-full ">
          <div className=" overflow-y-scroll">
            <div className="p-1 text-xs font-bold z-0">From date:</div>
            <Calendar
              className="text-xs sm:text-sm"
              onChange={(e) => setDateSetting({ ...dateSetting, from: e })}
              value={dateSetting?.from}
              maxDate={dateSetting?.to}
            />
          </div>
          <div>
            <div className="p-1 text-xs font-bold">To date:</div>
            <Calendar
              className="text-xs sm:text-sm"
              onChange={(e) => setDateSetting({ ...dateSetting, to: e })}
              value={dateSetting?.to}
              minDate={dateSetting?.from}
              maxDate={maxDate}
            />
          </div>
          <div className="">
            <button
              className="text-xs font-bold pl-2"
              onClick={onClickCalender}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLayout;
