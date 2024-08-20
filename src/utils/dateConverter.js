// import moment from "moment";
import moment from "moment-timezone";
export function convertToUTC(dateString) {
  // Create a Date object from the input string
  const localDate = new Date(dateString + " GMT+0530 (India Standard Time)");
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  );
  return utcDate.toISOString().split("T")[0];
}

export function convertToEndDate(dateString) {
  // Parse input date string into Moment.js object
  const momentDate = moment.utc(dateString);

  // Add one day to the date
  const incrementedDate = momentDate.add(1, "day");

  // Convert to JavaScript Date object and then to ISO string
  const isoDateString = incrementedDate.toDate().toISOString();
  console.log(isoDateString);
  return isoDateString;
}

export function convertUtcToIst(utcDate) {
  const momentDate = moment.utc(utcDate);
  if (!momentDate.isValid()) {
    throw new Error("Invalid date");
  }
  return momentDate
    .utc(utcDate)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
}

export function getRelativeTime(date) {
  return moment(date).fromNow();
}
