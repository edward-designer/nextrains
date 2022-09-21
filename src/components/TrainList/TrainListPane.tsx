import React, { useContext } from "react";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import TrainInfoContextWrapper from "../../contexts/TrainInfoContext";
import ErrorBoundary from "../ErrorBoundary";
import TrainListContainer from "./TrainListContainer";

import TrainListTitleBar from "./TrainListTitleBar";

type TTrainListPane = {
  fromTo: TFromTo;
  leg: number;
};

const TrainListPane = ({ leg, fromTo }: TTrainListPane) => {
  const selected = useContext(SelectedTrainContext);
  const previousLegSelectedTrain = selected.selectedTrains.has(leg - 1)
    ? selected.selectedTrains.get(leg - 1)
    : null;

  const earliestTimeForConnectingTrain = previousLegSelectedTrain
    ? previousLegSelectedTrain?.arrivalTimeDestination
    : null;

  return (
    <ErrorBoundary>
      <TrainInfoContextWrapper
        fromTo={fromTo}
        leg={leg}
        earliestTimeForConnectingTrain={earliestTimeForConnectingTrain}
      >
        <div className="shadow-md">
          <TrainListTitleBar />
          <TrainListContainer />
        </div>
      </TrainInfoContextWrapper>
    </ErrorBoundary>
  );
};

export default TrainListPane;
