import { isTimeFormat, isTime1LaterThanTime2, currentTime } from "./helpers";

import { TrainStatus } from "../types/customTypes";

export const getTrainStatus = (
  train: TTrainInfo,
  arrivalTime: string | null
): TrainStatus => {
  let status = TrainStatus.ontime;
  if (train.delayReason !== null || train.etd === "Delayed")
    status = isTimeFormat(train.etd)
      ? TrainStatus.delayedWithNewArrivalTime
      : TrainStatus.delayed;
  arrivalTime &&
    isTime1LaterThanTime2(currentTime(), arrivalTime) &&
    (status = TrainStatus.departed);
  if (train.isCancelled || train.cancelReason) status = TrainStatus.cancelled;
  return status;
};

export const findToilets = (formation: TTrainInfo["formation"]): boolean => {
  if (formation && Array.isArray(formation?.coaches)) {
    return formation.coaches.reduce(
      (acc, cur) => cur.toilet?.status === 1 || acc,
      false
    );
  }
  return false;
};

const parseTrainInfo = (
  train: TTrainInfo,
  to: string | null,
  from: string | null,
  destinationStation?: string
): TParsedTrainInfo => {
  const {
    subsequentCallingPoints,
    etd,
    std,
    destination,
    platform,
    serviceIdUrlSafe,
    delayReason,
    cancelReason,
    formation,
    destinationPlatform,
  } = train;

  const arrivalTime =
    etd === "Cancelled" || etd === "Delayed"
      ? null
      : isTimeFormat(etd)
      ? etd
      : std;
  const status = getTrainStatus(train, arrivalTime);
  const runningStatus = [
    TrainStatus.ontime,
    TrainStatus.delayedWithNewArrivalTime,
  ];
  const isRunning = runningStatus.includes(status);
  const callingPoint = Array.isArray(subsequentCallingPoints)
    ? subsequentCallingPoints[0].callingPoint
    : [];
  // Add back the starting station
  if (callingPoint.length !== 0 && callingPoint.at(-1)?.locationName !== from) {
    callingPoint.unshift({
      locationName: from || "",
      crs: "FROM",
      st: std,
      et: etd,
    });
  }
  const destinationStationInfo = callingPoint.filter(
    (station) => station.crs === to
  )[0];
  const toStationArrivalTime = isTimeFormat(destinationStationInfo?.et)
    ? destinationStationInfo?.et
    : destinationStationInfo?.st || null;
  const endStation = Array.isArray(destination)
    ? destination[0]?.locationName
    : "";
  const endStationCRS = Array.isArray(destination) ? destination[0]?.crs : "";
  const reason = cancelReason || delayReason || null;
  const hasToilet = findToilets(formation);
  const fastest = false;
  let isDirect = false;
  let arrivalTimeFinalDestination = "";
  if (destinationStation) {
    isDirect = callingPoint.some(
      (station) => station.crs === destinationStation
    );
  }
  if (isDirect) {
    const arrivalFinalDestination =
      callingPoint.length === 0
        ? { et: "", st: "" }
        : callingPoint.filter(
            (station) => station.crs === destinationStation
          )[0];
    arrivalTimeFinalDestination = isTimeFormat(arrivalFinalDestination.et)
      ? arrivalFinalDestination.et
      : arrivalFinalDestination.st || "";
  }
  const toStationPlatform = destinationPlatform;
  const toStation = to;

  const formattedTrainInfo = {
    serviceIdUrlSafe,
    endStation,
    endStationCRS,
    isRunning,
    status,
    std,
    platform,
    callingPoint,
    arrivalTime,
    reason,
    hasToilet,
    fastest,
    isDirect,
    toStation,
    toStationPlatform,
    toStationArrivalTime,
    arrivalTimeFinalDestination,
  };
  return formattedTrainInfo;
};

export default parseTrainInfo;
