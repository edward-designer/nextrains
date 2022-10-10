import React, { useContext, useEffect } from "react";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import TrainInfoContextWrapper from "../../contexts/TrainInfoContext";
import ErrorBoundary from "../ErrorBoundary";
import TrainListContainer from "../TrainList/TrainListContainer";

import TrainListTitleBar from "../TrainList/TrainListTitleBar";

type TJourney = {
  fromTo: TFromTo;
  leg: number;
  finalDestination: string;
};

const Journey = ({ leg, fromTo, finalDestination }: TJourney) => {
  const { selectedTrains, setSelectedTrains, onTrain, setOnTrain } =
    useContext(SelectedTrainContext);
  const previousLegSelectedTrain = selectedTrains.has(leg - 1)
    ? selectedTrains.get(leg - 1)
    : null;
  const earliestTimeForConnectingTrain =
    previousLegSelectedTrain?.toStationArrivalTime || null;

  useEffect(() => {
    const resetSelectedTrains = new Map();
    const resetOnTrain = new Map();
    setSelectedTrains(resetSelectedTrains);
    setOnTrain(resetOnTrain);
  }, []);

  return (
    <ErrorBoundary>
      <TrainInfoContextWrapper
        fromTo={fromTo}
        leg={leg}
        earliestTimeForConnectingTrain={earliestTimeForConnectingTrain}
        finalDestination={finalDestination}
      >
        <section
          className={`relative shadow-md mt-1 basis-full md:basis-[calc((100%-8px)/2)] md:items-start md:gap-3 ${
            leg === 1 ? "flex-1" : ""
          }   `}
        >
          <TrainListTitleBar />
          <TrainListContainer />
        </section>
      </TrainInfoContextWrapper>
    </ErrorBoundary>
  );
};

export default Journey;
