import moment from "moment-timezone";
import { timeFrameFilter } from "./FilterBar/constants";

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const datePart = date.toLocaleDateString("en-GB", options);
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} at ${timePart}`;
};

export const getLaunchStatus = (launch) => {
  if (launch?.upcoming) {
    return "Upcoming";
  } else if (launch?.launch_success) {
    return "Success";
  } else {
    return "Failed";
  }
};

export const findRangeFilter = (value) =>
  timeFrameFilter?.find((filter) => filter?.value === value);

export const timeformat = (value) => {
  const parsedDate = moment.tz(value, "DD MMMM YYYY HH:mm", "Asia/Kolkata");

  const isoDateString = parsedDate.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return isoDateString;
};
