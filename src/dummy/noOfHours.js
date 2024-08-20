// import moment from 'moment-timezone';
export function addDaysToCurrentDate(stringValue) {
  const temp = stringValue.split(" ")[0]
  const numDays = Number(temp)
  var currentDate = new Date();
  var resultDate = new Date(currentDate.getTime() + numDays * 24 * 60 * 60 * 1000);
  return resultDate.toISOString();
}