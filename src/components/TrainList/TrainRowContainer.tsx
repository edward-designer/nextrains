import React, { useContext } from "react";

import CellTags from "./CellTags";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import CellPlatformTimerContainer from "./CellPlatformTimerContainer";
import CellReasons from "./CellReason";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";

import { minutesDifference } from "../../Utils/helpers";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { TrainStatus } from "../../types/customTypes";

interface TTrainRowContainer {
  trainDetails: TParsedTrainInfo;
  leg: number;
  fromTo: TFromTo;
  finalDestination: string;
}

const TrainRowContainer = ({
  trainDetails,
  leg,
  fromTo,
  finalDestination,
}: TTrainRowContainer) => {
  const { selectedTrains, setSelectedTrains } =
    useContext(SelectedTrainContext);
  const currentLegSelectedTrain = selectedTrains.has(leg)
    ? selectedTrains.get(leg)
    : null;
  const previousLegSelectedTrain = selectedTrains.has(leg - 1)
    ? selectedTrains.get(leg - 1)
    : null;

  const {
    serviceIdUrlSafe,
    isRunning,
    status,
    arrivalTime,
    std,
    platform,
    endStation,
    arrivalTimeFinalDestination,
    callingPoint,
    reason,
    fastest,
    isDirect,
    toStationPlatform,
    toStationArrivalTime,
  } = trainDetails;

  const isSelected =
    serviceIdUrlSafe === currentLegSelectedTrain?.serviceIdUrlSafe;
  if (currentLegSelectedTrain && !isSelected) return null;

  const toStation = previousLegSelectedTrain?.toStation || "";
  const toTime = previousLegSelectedTrain?.toStationArrivalTime || "";
  const toPlatform = previousLegSelectedTrain?.toStationPlatform || "";

  /* if a train is selected, the connecting trains will show the time for changing platforms */
  const isConnecting = toStation === fromTo.from && isRunning;
  let changeTime =
    arrivalTime && isConnecting ? minutesDifference(toTime, arrivalTime) : null;

  const toggleTrainSelect = () => {
    if (status !== TrainStatus.cancelled) {
      if (isSelected) {
        const tempSelectedTrains = new Map(selectedTrains);
        tempSelectedTrains.delete(leg);
        setSelectedTrains(tempSelectedTrains);
      } else {
        const tempSelectedTrains = new Map(selectedTrains);
        tempSelectedTrains.set(leg, trainDetails);
        setSelectedTrains(tempSelectedTrains);
      }
    }
  };

  const rowBackgroundCSS = (status: TrainStatus) => {
    switch (status) {
      case TrainStatus.delayedWithNewArrivalTime:
        return "bg-background-delayed";
      case TrainStatus.delayed:
        return "bg-background-delayed cursor-default";
      case TrainStatus.cancelled:
        return "bg-background-cancelled cursor-default";
      case TrainStatus.departed:
        return "bg-background-departed";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={toggleTrainSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleTrainSelect();
      }}
      className={`flex flex-col border-b-background-form border-b-4 border-dotted
      ${rowBackgroundCSS(status)}`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <CellTags
        isDirect={isDirect}
        changeStation={fromTo.to}
        fastest={fastest}
        isSelected={isSelected}
      />
      <div className="flex flex-row gap-1 items-center py-3">
        <div className="w-3 flex items-center justify-center text-xs text-button-color">
          {isSelected && <TaskAltIcon sx={{ fontSize: "14px" }} />}
        </div>
        <CellTime
          status={status}
          arrivalTime={arrivalTime}
          arrivalTimeDestination={toStationArrivalTime}
          arrivalTimeFinalDestination={arrivalTimeFinalDestination}
          std={std}
        />
        <CellPlatformTimerContainer
          status={status}
          platform={platform}
          toPlatform={isConnecting ? toPlatform : ""}
          changeTime={changeTime}
          arrivalTime={arrivalTime}
          isRunning={isRunning}
          isConnecting={isConnecting}
        />
        <CellDestination
          endStation={endStation}
          subsequentCallingPoints={callingPoint}
          fromTo={fromTo}
          status={status}
          finalDestination={finalDestination}
          destinationPlatform={toStationPlatform}
          isSelected={isSelected}
        />
      </div>
      <CellReasons reason={reason} />
    </div>
  );
};

export default TrainRowContainer;
