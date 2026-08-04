function getFormattedDate(value, type, inMS, timezoneOffsetSec) {
  if (!type) return value;

  let valMs = inMS ? value : value * 1000;
  const useUTC = typeof timezoneOffsetSec === "number";

  if (useUTC) {
    valMs += timezoneOffsetSec * 1000;
  }

  const date = new Date(valMs);

  let options = {};

  if (type === "date") {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  } else if (type === "time") {
    options = {
      hour: "numeric",
      minute: "numeric",
    };
  }

  if (useUTC) {
    options.timeZone = "UTC";
  }

  return new Intl.DateTimeFormat("en-us", options).format(date);
}

export { getFormattedDate };
