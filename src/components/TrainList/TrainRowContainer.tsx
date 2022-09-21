import React, { useContext } from "react";

import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import RowTag from "./RowTag";

import { TrainInfoContext } from "../../contexts/TrainInfoContext";
import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";

import { minutesDifference, isNextDay } from "../../Utils/helpers";

import CellPlatformTimerContainer from "./CellPlatformTimerContainer";

import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { TrainStatus } from "../../types/customTypes";

type TTrainRowContainer = {
  trainDetails: TParsedTrainInfo;
};

const TrainRowContainer = ({ trainDetails }: TTrainRowContainer) => {
  const {
    fromTo,
    leg,
    earliestTimeForConnectingTrain,
    response,
    loading,
    refetch,
  } = useContext(TrainInfoContext);

  const { selectedTrains, setSelectedTrains } =
    useContext(SelectedTrainContext);
  const currentLegSelectedTrain = selectedTrains.has(leg)
    ? selectedTrains.get(leg)
    : null;

  const {
    serviceIdUrlSafe,
    isRunning,
    status,
    arrivalTime,
    std,
    platform,
    endStation,
    arrivalTimeDestination,
    arrivalTimeFinalDestination,
    callingPoint,
    reason,
    fastest,
    isDirect,
    destinationPlatform,
  } = trainDetails;

  const isSelected =
    serviceIdUrlSafe === currentLegSelectedTrain?.serviceIdUrlSafe;
  const toStation = "";
  const toTime = "";
  const toPlatform = "";
  const finalDestination = "";

  /* if a train is selected, the connecting trains will show the time for changing platforms */
  const isConnecting = toStation === fromTo.from && isRunning;
  let changeTime = null;
  if (arrivalTime && isConnecting) {
    changeTime = minutesDifference(toTime, arrivalTime);
  }

  let departureDateObj;
  if (isRunning && arrivalTime) {
    /* departureDateObj for countdown to CellCountDown */
    departureDateObj = new Date();
    const [hour, minute] = arrivalTime.split(":");
    if (departureDateObj) {
      departureDateObj.setHours(parseInt(hour));
      departureDateObj.setMinutes(parseInt(minute));
      departureDateObj.setSeconds(0);
      if (isNextDay(arrivalTime)) {
        departureDateObj.setDate(departureDateObj.getDate() + 1);
      }
    }
  }
  const toggleTrainSelect = () => {
    if (isSelected) {
      const tempSelectedTrains = new Map(selectedTrains);
      tempSelectedTrains.delete(leg);
      setSelectedTrains(tempSelectedTrains);
    } else {
      const tempSelectedTrains = new Map(selectedTrains);
      tempSelectedTrains.set(leg, trainDetails);
      setSelectedTrains(tempSelectedTrains);
    }
  };

  const showTags = isDirect || fastest;

  if (currentLegSelectedTrain && !isSelected) return null;

  return (
    <div
      onClick={toggleTrainSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleTrainSelect();
      }}
      className={`flex flex-col border-b-background-form border-b-4 border-dotted
      ${isRunning ? "" : `cursor-default`} 
        ${status === TrainStatus.departed ? `bg-background-departed` : ""} 
        ${
          status === TrainStatus.delayed ||
          status === TrainStatus.delayedWithNewArrivalTime
            ? `bg-background-delayed`
            : status === TrainStatus.cancelled
            ? `bg-background-cancelled`
            : ""
        }
        `}
      role="button"
      tabIndex={0}
      aria-pressed="false"
    >
      {showTags && (
        <div className="-mt-1 -mb-4">
          {fastest && (
            <RowTag className="z-20 bg-hover-color after:border-l-hover-color">
              Fastest
            </RowTag>
          )}
          {isDirect && (
            <RowTag className="z-10 bg-train-direct after:border-l-train-direct">
              Direct
            </RowTag>
          )}
          {isSelected && isDirect && (
            <RowTag className="w-[180px] z-1 bg-background-nochange after:border-l-background-nochange">
              No need to change at {fromTo.to}
            </RowTag>
          )}
        </div>
      )}
      <div className="flex flex-row gap-1 items-center py-3">
        <div className="w-3 flex items-center justify-center text-xs text-button-color">
          {!isRunning ? (
            ""
          ) : isSelected ? (
            <TaskAltIcon sx={{ fontSize: "14px" }} />
          ) : (
            ""
          )}
        </div>
        <CellTime
          status={status}
          arrivalTime={arrivalTime}
          arrivalTimeDestination={arrivalTimeDestination}
          arrivalTimeFinalDestination={arrivalTimeFinalDestination}
          std={std}
        />
        {/*<CellPlatformTimerContainer
          status={status}
          platform={platform}
          toPlatform={isConnecting ? toPlatform : ""}
          changeTime={changeTime}
          departureDateObj={departureDateObj}
          isRunning={isRunning}
          isConnecting={isConnecting}
        />*/}
        <CellDestination
          destination={endStation}
          subsequentCallingPoints={callingPoint}
          fromTo={fromTo}
          status={status}
          finalDestination={finalDestination}
          destinationPlatform={destinationPlatform}
          isSelected={isSelected}
          isDirect={isDirect}
        />
      </div>
      {reason && (
        <div className="flex items-center text-[7pt] -mt-3 leading-3 p-1 italic text-text-highlight">
          <RailwayAlertIcon className="text-text-highlight px-1" />
          <div>{reason}</div>
        </div>
      )}
    </div>
  );
};

export default TrainRowContainer;
