import React, { useContext, useEffect } from "react";

import TrainListContainerView from "./TrainListContainerView";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import { TrainInfoContext } from "../../contexts/TrainInfoContext";

import { isTime1LaterThanTime2, currentTime } from "../../Utils/helpers";

const TrainListContainer = () => {
  const {
    fromTo,
    leg,
    earliestTimeForConnectingTrain,
    finalDestination,
    response,
    loading,
    refetch,
  } = useContext(TrainInfoContext);
  const { selectedTrains, onTrain } = useContext(SelectedTrainContext);
  const currentLegSelectedTrain = selectedTrains.has(leg)
    ? selectedTrains.get(leg)
    : null;
  const fromTime = currentLegSelectedTrain?.arrivalTime || null;
  const onTrainSelected = onTrain.has(leg);
  // refresh when tab becomes active/visible
  useEffect(() => {
    const document = window.document;
    const reloadWhenActive = () => {
      if (!document.hidden && !currentLegSelectedTrain && !onTrainSelected) {
        refetch(earliestTimeForConnectingTrain);
      }
    };
    document.addEventListener("visibilitychange", reloadWhenActive);
    return () =>
      document.removeEventListener("visibilitychange", reloadWhenActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentLegSelectedTrain,
    earliestTimeForConnectingTrain,
    onTrainSelected,
  ]);

  // auto refresh every 60 seconds
  useEffect(() => {
    const timer = window.setInterval(
      () =>
        // to retain the info for seleted trains that has departed
        !(
          currentLegSelectedTrain &&
          isTime1LaterThanTime2(currentTime(), fromTime)
        ) &&
        !onTrainSelected &&
        refetch(earliestTimeForConnectingTrain),
      60000
    );
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earliestTimeForConnectingTrain, fromTime]);

  // refresh if previousLegSelectedTrain is changed
  useEffect(() => {
    if (!onTrainSelected) {
      refetch(earliestTimeForConnectingTrain);
    }
  }, [earliestTimeForConnectingTrain, onTrainSelected, refetch]);

  return (
    <TrainListContainerView
      trainList={response}
      fromTo={fromTo}
      leg={leg}
      loading={loading}
      finalDestination={finalDestination}
    />
  );
};

export default TrainListContainer;
