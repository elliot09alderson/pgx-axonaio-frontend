const moment = require('moment-timezone');
export const formatDate = (date) => {
  if (date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return "";
}


export function getDateTimeRange(input) {
  const tz = 'Asia/Kolkata'; // Indian timezone
  let start, end;

  if (input === 'day') {
    start = moment().tz(tz).startOf('day');
    end = moment().tz(tz).endOf('day');
  } else if (input === 'month') {
    start = moment().tz(tz).startOf('month');
    end = moment().tz(tz).endOf('month');
  } else if (input === 'lastmonth') {
    start = moment().tz(tz).subtract(1, 'month').startOf('month');
    end = moment().tz(tz).subtract(1, 'month').endOf('month');
  } else {
    throw new Error(`Invalid input: ${input}`);
  }

  return {
    from: start.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    to: end.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  };
}