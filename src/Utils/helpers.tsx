export const formatStations = (stations: TStations) => {
  const stationsWithValues = stations.filter(Boolean);
  const stationCount = stationsWithValues.length;
  switch (stationCount) {
    case 0:
      return ["", ""];
    case 1:
      return [...stationsWithValues, ""];
    default:
      return stationsWithValues;
  }
};

export const addAStation = (
  stations: TStations,
  index: number,
  station: string = ""
): TStations => {
  const tempStations = [...stations];
  if (index >= tempStations.length) tempStations.push(station);
  else {
    tempStations.splice(index, 0, station);
  }
  return tempStations;
};

export const removeAStation = (
  stations: TStations,
  index: number,
  station: string = ""
): TStations => {
  const tempStations = [...stations];
  tempStations.splice(index, 1);
  return tempStations;
};

export const parseStationsIntoRoutes = (stations: TStations) => {
  const formattedStations = formatStations(stations);
  let parsedRouteArr = [];
  for (let i = 0; i < formattedStations.length - 1; i++) {
    parsedRouteArr.push({
      from: formattedStations[i],
      to: formattedStations[i + 1],
    });
  }
  return parsedRouteArr;
};

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
  return Number(new Date().getHours()) > parseInt(hour) + 12;
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
  /*const returnedChangeTime = changeTime >= 0 ? changeTime : 0;
  return returnedChangeTime;*/
  return changeTime;
};

export const minutesFromNow = (time: string): number => {
  const result = minutesDifferenceNumber(currentTime(), time);
  return result ? (result >= 120 ? 119 : result) : 0;
};

export const countDownTimer = (time: string): string => {
  const result = minutesDifferenceNumber(currentTime(), time);
  return result === 0 ? "due" : result > 60 ? ">1hr" : `${result}m`;
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

export const timeMinusMinutes = (
  time: string | null,
  minsToMinus: number
): string => {
  const date = new Date();
  if (time) {
    const [hour, minute] = time.split(":");
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute) - minsToMinus);
  } else {
    date.setMinutes(date.getMinutes() - minsToMinus);
  }
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const checkParams = (param: string | undefined) => {
  if (!param) return "";
  const match = param.match(/[A-Z]{3}/);
  return match ? match[0] : "";
};

export const replacer = (key: string | number, value: unknown) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: [...value],
    };
  } else {
    return value;
  }
};

type TStringifiedMap = {
  dataType: string;
  value: [string, string][];
};

export const reviver = (key: string | number, value: TStringifiedMap) => {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
};
