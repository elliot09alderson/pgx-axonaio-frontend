export const divideMonthDatesIntoRanges = (month) => {
  const days = []; // create an empty array to store the days
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0); // get the end date of the month

  for (let i = 1; i <= endDate.getDate(); i++) {
    days.push(i); // push each day number in the array
  }

  const ranges = [];
  for (let i = 0; i < days.length; i += 3) {
    const range = [];
    range.push(days[i]);
    if (i + 1 < days.length) {
      range.push(days[i + 1]);
    }
    if (i + 2 < days.length) {
      range.push(days[i + 2]);
    }
    const rangeStr =
      range.length === 1
        ? `${range[0]}`
        : `${range[0]}-${range[range.length - 1]}`; // create the range string
    ranges.push(rangeStr);
  }

  return ranges;
};

export const getDateRange = (date) => {
  const day = date.getDate(); // get the day number of the date
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // get the end date of the month

  let startRange = 1; // initialize the start of the range
  let endRange = 3; // initialize the end of the range
  let rangeString = ""; // initialize the range string

  for (let i = startRange; i <= endDate.getDate(); i += 3) {
    if (day >= startRange && day <= endRange) {
      // if the day is within the current range
      rangeString = `${startRange}-${endRange}`; // create the range string
      break; // exit the loop
    } else {
      startRange = endRange + 1; // update the start of the next range
      endRange = startRange + 2; // update the end of the next range
    }
  }

  // if the day is not within any range, return an empty string
  return rangeString;
};

export const createArrayOfObjects = (mainData, array2) => {
  const result = [];
  const objj = {
    dateRange: "0-0",
    amount: 0,
  };
  result.push(objj);
  for (let i = 0; i < mainData.length; i++) {
    const dateRange = getDateRange(new Date(mainData[i]?.createdAt));

    // const isMatch = array2.includes(dateRange);
    const obj = {
      dateRange,
      amount: mainData[i].amount,
    };
    result.push(obj);
  }
  for (let i = 0; i < array2.length; i++) {
    const element = array2[i];
    let isMatch = false;
    for (let i = 0; i < mainData.length; i++) {
      const dateRange = getDateRange(new Date(mainData[i]?.createdAt));
      isMatch = [dateRange].includes(element);
      if (isMatch) break;
    }
    if (!isMatch) {
      const obj = {
        dateRange: element,
        amount: 0,
      };
      result.push(obj);
    }
  }
  result.sort(function (a, b) {
    const date1 = a.dateRange.split("-");
    const date2 = b.dateRange.split("-");
    const startDate1 = parseInt(date1[0]);
    const endDate1 = parseInt(date1[1]);
    const startDate2 = parseInt(date2[0]);
    const endDate2 = parseInt(date2[1]);

    if (startDate1 < startDate2) {
      return -1;
    } else if (startDate1 > startDate2) {
      return 1;
    } else {
      if (endDate1 < endDate2) {
        return -1;
      } else if (endDate1 > endDate2) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  return result;
};

export function reduceObjectsByKey(arr) {
  return arr.reduce((acc, curr) => {
    const dateRange = curr.dateRange;
    const amount = curr.amount;

    // Check if the dateRange already exists in the accumulator
    const existingObj = acc.find(obj => obj.dateRange === dateRange);
    if (existingObj) {
      // If the dateRange already exists, add the value to the existing object
      existingObj.amount += amount;
    } else {
      // If the dateRange doesn't exist, create a new object with the dateRange and value
      acc.push({ dateRange: dateRange, amount: amount });
    }

    return acc;
  }, []);
}
