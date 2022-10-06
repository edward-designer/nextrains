import React, { useContext } from "react";

import Button from "../Common/Button";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import { TrainInfoContext } from "../../contexts/TrainInfoContext";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const AlreadyOnTrainControl = () => {
  const { leg, earliestTimeForConnectingTrain, refetch, fetchPreviousTrains } =
    useContext(TrainInfoContext);
  const { selectedTrains, setSelectedTrains, onTrain, setOnTrain } =
    useContext(SelectedTrainContext);
  const onTrainSelected = onTrain.has(leg);

  const clickHandler = () => {
    const tempOnTrain = new Map(onTrain);
    if (onTrainSelected) {
      refetch(earliestTimeForConnectingTrain);
      const tempSelectedTrains = new Map(selectedTrains);
      tempSelectedTrains.delete(leg);
      setSelectedTrains(tempSelectedTrains);
      tempOnTrain.delete(leg);
    } else {
      fetchPreviousTrains();
      tempOnTrain.set(leg, true);
    }
    setOnTrain(tempOnTrain);
  };
  return (
    <>
      {onTrainSelected ? (
        <Button
          ariaLabel="Click to get latest train info"
          label="Back"
          clickHandler={clickHandler}
          customStyle="bg-background-title"
        >
          <ArrowCircleLeftIcon />
        </Button>
      ) : (
        <Button
          ariaLabel="Click to retrieve departed train info"
          label="Previous Trains"
          clickHandler={clickHandler}
          customStyle="bg-background-title"
        >
          <AccessTimeIcon />
        </Button>
      )}
    </>
  );
};

export default AlreadyOnTrainControl;
