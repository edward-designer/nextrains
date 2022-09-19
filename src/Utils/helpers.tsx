import { TFromTo } from "../Types/types";

export const currentTime = () => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const currentDayofWeek = () => new Date().getDay();

export const isNextDay = (time: string) => {
  const [hour] = time.split(":");
  return Number(new Date().getHours()) > parseInt(hour);
};

export const convertArrToFromToObject = (
  arr: string[]
): { returnArr: TFromTo[]; destination: string } => {
  let returnArr: TFromTo[] = [];
  let destination = "";
  const filteredArr = arr.filter(Boolean);
  const arrCount = filteredArr.length;
  if (arrCount > 1) {
    filteredArr.forEach((item: string, ind: number) => {
      if (ind < arrCount - 1)
        returnArr.push({ from: item, to: filteredArr[ind + 1] });
    });
  } else {
    returnArr.push({ from: arr[0], to: arr.at(-1) as string });
  }
  if (arr.filter(Boolean).length === 3) {
    destination = arr[2];
  }
  return { returnArr, destination };
};

export const isTime1LaterThanTime2 = (
  time1: string | null,
  time2: string | null
): boolean | undefined => {
  if (time1 === null || time2 === null) return;
  if (!(isTimeFormat(time1) && isTimeFormat(time2))) return;
  const [hour1] = time1.split(":");
  const [hour2] = time2.split(":");
  if (parseInt(hour1) - parseInt(hour2) > 12) {
    return false;
  } else if (parseInt(hour2) - parseInt(hour1) > 12) {
    return true;
  }
  return time1 > time2;
};

export const isTimeFormat = (time: string | null): boolean => {
  if (time === null) return false;
  return /^\d{2}:\d{2}$/.test(time);
};

export const minutesDifference = (
  timeArrival: string,
  timeDeparture: string
): string | null => {
  const changeTime = minutesDifferenceNumber(timeArrival, timeDeparture);
  return changeTime === null
    ? null
    : changeTime > 60
    ? ">1h"
    : `${changeTime}m`;
};

export const minutesDifferenceNumber = (
  timeArrival: string,
  timeDeparture: string
): number => {
  const date1 = new Date();
  const [hour1, minute1] = timeArrival.split(":");
  date1.setHours(parseInt(hour1));
  date1.setMinutes(parseInt(minute1));
  date1.setSeconds(0);
  const date2 = new Date();
  const [hour2, minute2] = timeDeparture.split(":");
  if (isNextDay(timeArrival) !== isNextDay(timeDeparture)) {
    date2.setHours(parseInt(hour2));
    date2.setDate(date2.getDate() + 1);
  } else {
    date2.setHours(parseInt(hour2));
  }
  date2.setMinutes(parseInt(minute2));
  date2.setSeconds(0);
  const changeTime = Math.floor(
    (date2.valueOf() - date1.valueOf()) / (1000 * 60)
  );
  const returnedChangeTime = changeTime >= 0 ? changeTime : 0;
  return returnedChangeTime;
};

export const minutesFromNow = (time: string): number => {
  const result = minutesDifferenceNumber(currentTime(), time);
  return result ? (result >= 120 ? 119 : result) : 0;
};

export const checkPeakHours = (fromStation: string | null): boolean => {
  const londonStations = ["PAD", "KGX", "WAT", "VIC"];
  const time = currentTime();
  const dateOfWeek = currentDayofWeek();
  if (!fromStation) return false;
  return dateOfWeek <= 5 && dateOfWeek >= 1
    ? (time <= "09:30" && time >= "06:30") ||
        (time >= "16:00" &&
          time <= "19:00" &&
          londonStations.includes(fromStation))
    : false;
};

export const checkParams = (param: string | undefined) => {
  if (!param) return "";
  const match = param.match(/[A-Z]{3}/);
  return match ? match[0] : "";
};
