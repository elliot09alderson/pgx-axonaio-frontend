import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../utils/requestMethod";
import onFailure from "../../utils/error";
import { useDispatch } from "react-redux";
import Calendar from "./CalenderLayout";
import { getDateTimeRange } from "../../utils/formateDate";
export const DropDownDiv = styled.div`
  width: ${(props) => props.wt};
  height: ${(props) => props.ht};
  margin-top: 30px;
`;
export const SelectDiv = styled.div`
  background-color: rgb(255, 255, 255);
  color: black;
`;
export const SelectMethod = styled.select`
  padding: 10px;
  cursor: pointer;
`;
export const SelectOptions = styled.option`
  cursor: pointer;
`;
const DropdownList = ({
  onMessage,
  mode,
  dropOptionIndex = 0,
  onHandleCommonTab,
  isButtonShow,
  wt = "100px",
  ht = "60px",
}) => {
  const dispatch = useDispatch();
  const [openCalender, setOpenCalender] = useState(false);
  const constantOptions = [
    "Today",
    "This Month",
    "Last Month",
    "Custom Data Range",
  ];
  const fetchTransactiondata = async ({ from, to }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${mode}/fetch`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
        params: { from: from, to: to },
      });
      return res.data;
    } catch (error) {
      let status = onFailure(error, dispatch);
      if (status) onMessage([]);
      return null;
    }
  };
  const fetchTransactionByTime = async (time) => {
    try {
      setOpenCalender(false);
      if (time === 0) {
        let data = await fetchTransactiondata(getDateTimeRange("day"));
        if (data) {
          console.log("time 0", data);
          onMessage(data);
        }
      } else if (time === 1) {
        let data = await fetchTransactiondata(getDateTimeRange("month"));
        if (data) {
          onMessage(data);
        }
      } else if (time === 2) {
        let data = await fetchTransactiondata(getDateTimeRange("lastmonth"));
        if (data) {
          onMessage(data);
        }
      }
    } catch (error) {
      let status = onFailure(error);
      if (status) onMessage([]);
    }
  };
  const onChangeHandler = (item) => {
    switch (item) {
      case constantOptions[0]:
        fetchTransactionByTime(0);
        onHandleCommonTab(0);
        break;
      case constantOptions[1]:
        fetchTransactionByTime(1);
        onHandleCommonTab(1);
        break;
      case constantOptions[2]:
        fetchTransactionByTime(2);
        onHandleCommonTab(2);
        break;
      default:
        setOpenCalender(true);
        onHandleCommonTab(3);
    }
  };
  const onHandleCalender = async (data) => {
    setOpenCalender(false);
    onMessage(data);
  };
  useEffect(() => {
    onChangeHandler(constantOptions[dropOptionIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonShow]);
  return (
    <div className="m-3 p-1 ">
      <div className="relative">
        <select
          value={constantOptions[dropOptionIndex]}
          className=" third-bg first-text text-sm rounded-md select-none py-1 px-2 focus:select-none font-bold cursor-pointer "
          onChange={(e) => onChangeHandler(e.target.value)}
        >
          {constantOptions.map((item, index) => {
            return (
              <option
                className="my-1 p-1 cursor-pointer "
                key={item}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
        <div className="">
          {openCalender && (
            <Calendar onHandleCalender={onHandleCalender} mode={mode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownList;
