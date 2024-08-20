import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import DatePresets from "./DatePresets";
import "./Date.css";
import moment from "moment";

export default function Callendar({
  startDate,
  dateEnd,
  setStartDate,
  setEndDate,
  setDateInput,
  dateInput,
}) {
  const dateFormat = "DD/MM/YYYY";

  return (
    <div className="  p-4 cursor-pointer ">
      <DateRangePicker
        startDate={startDate}
        startDateId="s_id"
        endDate={dateEnd}
        endDateId="e_id"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={dateInput}
        // minDate={}
        onFocusChange={(e) => setDateInput(e)}
        dateFormat={dateFormat}
        renderCalendarInfo={() => (
          <DatePresets
            startDate={startDate}
            endDate={dateEnd}
            dateFormat={dateFormat}
            handlePresets={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        )}
      />
      {/* <div className="mt-3 ">
        <div>
          <strong>Start date: </strong>
          {startDate && startDate.format("ll")}
        </div>
        <div>
          <strong>End date: </strong>
          {dateEnd && dateEnd.format("ll")}
        </div>
      </div> */}
    </div>
  );
}
