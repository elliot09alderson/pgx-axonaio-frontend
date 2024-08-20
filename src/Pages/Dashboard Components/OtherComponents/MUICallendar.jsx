import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function MUICallendar() {
  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoItem label="Uncontrolled picker" component="DateRangePicker">
          <DateRangePicker
            defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
          />
        </DemoItem> */}
      <DateRangePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
