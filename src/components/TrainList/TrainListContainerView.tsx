import React from "react";

import Loading from "../Common/Loading";
import TrainRowContainer from "./TrainRowContainer";

interface TTrainListContainerView {
  trainList: TParsedTrainInfo[];
  fromTo: TFromTo;
  leg: number;
  loading: boolean;
  finalDestination: string;
}
const TrainListContainerView = ({
  trainList,
  fromTo,
  leg,
  loading,
  finalDestination,
}: TTrainListContainerView) => {
  if (!fromTo.from)
    // NO from station is entered
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by entering the departure station in the 'from' field.
      </div>
    );

  // NO data return
  if (!trainList)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, currently no direct trains between the two stations are found.
        Please check back later.
      </div>
    );

  return (
    <div className="relative min-h-[80px]">
      {loading && <Loading />}
      {trainList.map((trainDetails) => (
        <TrainRowContainer
          key={trainDetails.serviceIdUrlSafe}
          trainDetails={trainDetails}
          leg={leg}
          fromTo={fromTo}
          finalDestination={finalDestination}
        />
      ))}
    </div>
  );
};

export default TrainListContainerView;
