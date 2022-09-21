import React from "react";

import CellDestinationStation from "./CellDestinationStation";

import { TrainStatus } from "../../types/customTypes";

interface TCellDestination {
  endStation: string;
  subsequentCallingPoints: TStation[];
  fromTo: TFromTo;
  status: TrainStatus;
  finalDestination: string;
  destinationPlatform: string;
  isSelected: boolean;
}

const CellDestination = ({
  endStation,
  subsequentCallingPoints,
  fromTo,
  status,
  finalDestination,
  destinationPlatform,
  isSelected,
}: TCellDestination) => {
  return (
    <div className="basis-7/12 flex flex-col text-sm pt-2">
      {subsequentCallingPoints?.length !== 0 && isSelected ? (
        <>
          <span className={`text-text-tertiary text-lg leading-4 mb-2`}>
            <span className="font-bold">→</span> {endStation}
          </span>
          <ul className="text-[8px] leading-4 ml-8 text-text-primary">
            {subsequentCallingPoints.map((station, index) => (
              <CellDestinationStation
                station={station}
                key={station.crs}
                fromTo={fromTo}
                finalDestination={finalDestination}
                destinationPlatform={destinationPlatform}
              />
            ))}
          </ul>
        </>
      ) : (
        <span className={`text-text-tertiary text:md`}>
          <span className="font-bold">→</span> {endStation}
        </span>
      )}
    </div>
  );
};

export default CellDestination;
