import { IANATimeZone, Person } from "@/types";

//TODO refactor to Temporal API when widely available
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
const getPersonsCurrentStatus = (
  location: IANATimeZone,
): Person["currentStatus"] => {
  const date = new Date();
  const currentTimeInUTC9 = new Date(
    date.toLocaleString("en-US", { timeZone: location || "Asia/Tokyo" }),
  );
  const currentHour = currentTimeInUTC9.getHours();
  const currentDayInNumber = currentTimeInUTC9.getDay();
  const daysMapped = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  } as const;
  const currentDay = daysMapped[currentDayInNumber as keyof typeof daysMapped];

  switch (currentHour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return "sleeping";
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      if (currentDay === "Saturday" || currentDay === "Sunday") {
        return "relaxing";
      } else {
        return "coding";
      }
    case 17:
    case 18:
      return "running";
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      return "gaming";
    default:
      return "relaxing";
  }
};
export { getPersonsCurrentStatus };
