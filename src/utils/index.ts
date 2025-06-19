export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TIME_SLOTS = Array.from(
  { length: 24 },
  (_, i) =>
    `${i === 0 ? "GMT+01" : i > 12 ? i - 12 : i} ${
      i === 0 ? "" : i < 12 ? "AM" : "PM"
    }`
);
