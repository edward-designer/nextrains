import React, { useContext, useEffect } from "react";

import TrainRowContainer from "./TrainRowContainer";
import Loading from "../Common/Loading";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import { TrainInfoContext } from "../../contexts/TrainInfoContext";

import { isTime1LaterThanTime2, currentTime } from "../../Utils/helpers";

const TrainListContainer = () => {
  const {
    fromTo,
    leg,
    earliestTimeForConnectingTrain,
    response,
    loading,
    refetch,
  } = useContext(TrainInfoContext);
  const selected = useContext(SelectedTrainContext);
  const previousLegSelectedTrain = selected.selectedTrains.has(leg - 1)
    ? selected.selectedTrains.get(leg - 1)
    : null;

  const fromTime = previousLegSelectedTrain
    ? previousLegSelectedTrain?.arrivalTime
    : null;

  // refresh when tab becomes active/visible
  useEffect(() => {
    const document = window.document;
    const reloadWhenActive = () => {
      if (!document.hidden && !previousLegSelectedTrain) {
        refetch(earliestTimeForConnectingTrain);
      }
    };
    document.addEventListener("visibilitychange", reloadWhenActive);
    return () =>
      document.removeEventListener("visibilitychange", reloadWhenActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousLegSelectedTrain, earliestTimeForConnectingTrain]);

  // auto refresh every 60 seconds
  useEffect(() => {
    const timer = window.setInterval(
      () =>
        (!previousLegSelectedTrain ||
          isTime1LaterThanTime2(fromTime, currentTime())) &&
        refetch(earliestTimeForConnectingTrain),
      60000
    );
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousLegSelectedTrain, earliestTimeForConnectingTrain]);

  if (!fromTo.from)
    // NO from station is entered
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by entering the departure station in the 'from' field.
      </div>
    );

  // NO data return
  if (!response)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, no direct trains between the two stations are found.
      </div>
    );

  const trainList = response;

  return (
    <div className="relative">
      {loading && <Loading />}
      <>
        {trainList &&
          trainList.map((trainDetails) => (
            <TrainRowContainer
              key={trainDetails.serviceIdUrlSafe}
              trainDetails={trainDetails}
            />
          ))}
        {trainList.length === 0 && (
          <div className="p-4 text-text-inactive text-xs">
            Sorry, no trains are found currently. Check back later to look for
            available trains.
          </div>
        )}
      </>
    </div>
  );
};

export default TrainListContainer;
