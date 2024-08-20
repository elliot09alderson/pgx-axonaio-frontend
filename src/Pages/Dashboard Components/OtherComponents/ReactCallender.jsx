import React, { useState } from "react";
import Calendar from "react-calendar";

const ReactCallender = ({
  dateOne = Date.now().toString(),
  setDateOne,
  dateTwo = Date.now().toString(),
  setDateTwo,
  className,
}) => {
  const [calendarOne, setCalendarOne] = useState(false);
  const [calendarTwo, setCalendarTwo] = useState(false);

  const onChangeOne = (date) => {
    setCalendarOne((prev) => !prev);

    setDateOne(date);
  };
  const onChangeTwo = (date) => {
    setDateTwo(date);
    setCalendarTwo((prev) => !prev);
  };
  function toggleCalendarOne() {
    setCalendarOne((prev) => !prev);
  }
  function toggleCalendarTwo() {
    setCalendarTwo((prev) => !prev);
  }
  return (
    <div className={`flex flex-col my-2 ${className} z-0 `}>
      <h1 className="text-center mt-3 font-semibold"> Pick Date </h1>
      <div className="flex sm:flex-row flex-col items-center justify-center  gap-8 mt-4">
        <div className="flex flex-col  w-full">
          <input
            type="text"
            value={dateOne}
            onChange={(e) => setDateOne(e.target.value)}
            className=" h-10 rounded-md px-2 cursor-pointer "
            onClick={toggleCalendarOne}
          />
          {calendarOne && (
            <div className="w-[250px]">
              <Calendar
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={onChangeOne}
                // value={dateOne}
                className="rounded-md w-[200px] absolute"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col ">
          <input
            type="text"
            value={dateTwo}
            onChange={(e) => setDateTwo(e.target.value)}
            className=" h-10 rounded-md px-2 cursor-pointer"
            onClick={toggleCalendarTwo}
          />
          {calendarTwo && (
            <div className="w-[250px]">
              <Calendar
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={onChangeTwo}
                // value={dateTwo}
                className="rounded-md absolute w-[200px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactCallender;
