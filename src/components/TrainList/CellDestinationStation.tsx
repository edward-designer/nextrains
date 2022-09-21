import React from "react";

interface TCellDestinationStation {
  station: TStation;
  fromTo: TFromTo;
  finalDestination: string;
  destinationPlatform: string;
}

const CellDestinationStation = ({
  station,
  fromTo,
  finalDestination,
  destinationPlatform,
}: TCellDestinationStation) => {
  switch (station.crs) {
    case "FROM":
      return (
        <CellDestinationStationTypes
          station={station}
          customStyle="font-bold text-text-tertiary"
          customBulletStyle="w-2 h-2 border-text-notice-icon bg-background-main -ml-[15px]  top-[30%]"
        />
      );
    case fromTo.to:
      return (
        <CellDestinationStationTypes
          station={station}
          customStyle="font-bold text-[12px]"
          customBulletStyle="w-3 h-3 border-text-notice-icon bg-text-notice-icon text-text-notice-icon -ml-[17px] top-[3px]"
          platformInfo={
            <span className="block text-[10px] font-normal relative text-text-text-countdown -top-[2px]">
              {destinationPlatform
                ? ` @ Platform ${destinationPlatform}`
                : `Platform pending`}
            </span>
          }
        />
      );
    case finalDestination:
      return (
        <CellDestinationStationTypes
          station={station}
          customStyle="font-bold text-train-direct text-[12px]"
          customBulletStyle="w-3 h-3 border-train-direct bg-train-direct -ml-[17px] top-[3px]"
        />
      );
    default:
      return (
        <CellDestinationStationTypes
          station={station}
          customBulletStyle="w-2 h-2 border-text-notice-icon bg-background-main -ml-[15px]  top-[30%]"
        />
      );
  }
};

export default CellDestinationStation;

interface TCellDestinationStationType {
  station: TStation;
  customStyle?: string;
  customBulletStyle?: string;
  platformInfo?: React.ReactNode | null;
}

const CellDestinationStationTypes = ({
  station,
  customStyle = "",
  customBulletStyle = "",
  platformInfo = null,
}: TCellDestinationStationType) => {
  return (
    <li
      className={`relative before:absolute before:-left-3 before:w-1 before:h-full before:border-solid before:border-l-2 before:border-l-text-notice-icon last:before:h-3 ${customStyle}`}
    >
      <span
        className={`absolute border-2 bg-background-main rounded-full ${customBulletStyle}`}
      ></span>
      <span className="block">
        {`${station.locationName} ${
          station?.et !== "On time" ? `(${station.et})` : `(${station.st})`
        }`}
      </span>
      {platformInfo}
    </li>
  );
};
