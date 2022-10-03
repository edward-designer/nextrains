import React from "react";

import Loading from "../Common/Loading";
import TrainRowContainer from "./TrainRowContainer";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import RailwayAlertTwoToneIcon from "@mui/icons-material/RailwayAlertTwoTone";

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
      <div className="bg-background-form p-20 text-text-inactive text-xs flex items-center justify-center flex-col">
        <ManageSearchIcon
          sx={{
            fontSize: "8em",
            display: "block",
            color: "var(--background-title)",
          }}
        />
        <div>
          Please begin by entering the departure station in the 'from' field.
        </div>
      </div>
    );

  // NO data return
  if (!trainList)
    return (
      <div className="bg-background-form p-20 text-text-inactive text-xs flex items-center justify-center flex-col">
        <RailwayAlertTwoToneIcon
          sx={{
            fontSize: "8em",
            display: "block",
            color: "var(--background-title)",
          }}
        />
        <div>
          Sorry, currently no direct trains are found. Please check back later.
        </div>
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
