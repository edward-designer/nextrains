import React from "react";

import { TrainStatus } from "../../types/customTypes";

type TCellDestination = {
  destination: string;
  subsequentCallingPoints: {
    locationName: string;
    crs: string;
    st: string;
    et: string;
  }[];
  fromTo: TFromTo;
  status: TrainStatus;
  finalDestination: string;
  destinationPlatform: string;
  isSelected: boolean;
  isDirect: boolean;
};

const CellDestination = ({
  destination,
  subsequentCallingPoints,
  fromTo,
  status,
  finalDestination,
  destinationPlatform,
  isSelected,
  isDirect,
}: TCellDestination) => {
  return (
    <div className="basis-7/12 flex flex-col text-sm pt-2">
      <span
        className={`text-text-tertiary  ${
          isSelected ? "text-lg leading-4 mb-2" : "text:md"
        }`}
      >
        <span className="font-bold">→</span> {destination}
      </span>
      {isSelected && subsequentCallingPoints !== null && (
        <ul className="text-[8px] leading-4 ml-8 text-text-primary">
          {subsequentCallingPoints.length === 0 ||
          status === TrainStatus.cancelled
            ? ""
            : subsequentCallingPoints.map((station, index) => (
                <li
                  key={station.crs}
                  className={`relative before:absolute before:-left-3 before:w-1 before:h-full before:border-solid before:border-l-2 before:border-l-text-notice-icon ${
                    station.crs === fromTo.to ? "font-bold text-[12px]" : ""
                  } ${
                    station.crs === finalDestination
                      ? "font-bold text-train-direct text-[12px]"
                      : ""
                  }
                  last:before:h-3

                  `}
                >
                  <span
                    className={`${
                      station.crs === fromTo.to
                        ? "w-3 h-3 border-text-notice-icon bg-text-notice-icon text-text-notice-icon -ml-[17px]  top-[3px]"
                        : station.crs === finalDestination
                        ? "w-3 h-3 border-train-direct bg-train-direct -ml-[17px] top-[3px]"
                        : "w-2 h-2 border-text-notice-icon bg-background-main -ml-[15px]  top-[30%]"
                    } 
                    absolute border-2 bg-background-main rounded-full`}
                  ></span>
                  <span className={`block ${index === 0 ? "font-bold" : ""}`}>
                    {`${station.locationName}
                    ${
                      station?.et !== "On time"
                        ? `(${station.et})`
                        : `(${station.st})`
                    }
                    `}
                  </span>
                  <span className="block text-[10px] font-normal relative text-text-text-countdown -top-[2px]">
                    {station.crs === fromTo.to
                      ? destinationPlatform
                        ? ` @ Platform ${destinationPlatform}`
                        : `Platform pending`
                      : ""}
                  </span>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default CellDestination;
