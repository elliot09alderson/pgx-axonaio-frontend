// import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
const InputDiv = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
`;
function TwoDatePick({ startDate, endDate, handleStartDate, handleEndDate }) {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const maxDate = new Date();

  return (
    <div className="flex w-full justify-center items-center ">
      <div className="flex flex-col px-1">
        <label className="text-sm sm:text-sm font-bold sm:font-semibold first-text ">
          Start Date:
        </label>
        <DatePicker
          className="flex w-full"
          selected={startDate}
          onChange={handleStartDate}
          dateFormat="dd-MMM-yyyy"
          placeholderText="Select a start date"
          maxDate={endDate}
        />
      </div>
      <div className="flex flex-col  px-1">
        <label className="text-sm sm:text-sm font-bold sm:font-semibold first-text ">
          End Date:
        </label>
        <DatePicker
          className="flex w-full"
          selected={endDate}
          onChange={handleEndDate}
          dateFormat="dd-MMM-yyyy"
          placeholderText="Select an end date"
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
}

export default TwoDatePick;
