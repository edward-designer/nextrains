import React, { useContext } from "react";

import Autocomplete from "../Autocomplete/Autocomplete";
import InterchangeControl from "./InterchangeControl";
import OtherControls from "./OtherControls";
import FavContextWrapper from "../../contexts/FavContext";
import { ControlContext } from "../../contexts/ControlContext";

import { StationsLabel } from "../../types/customTypes";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

interface TStationInput {
  label: StationsLabel;
  value: [number, string];
  setStationsHandler: (order: number, value: string) => void;
}

const StationInput = ({ label, value, setStationsHandler }: TStationInput) => (
  <div className="flex items-center my-2 md:basis-1/4">
    <Autocomplete
      label={label}
      changeHandler={setStationsHandler}
      value={value}
    />
    {label === StationsLabel.from && (
      <DoubleArrowIcon
        sx={{ fontSize: "small", color: "var(--text-tertiary)" }}
      />
    )}
  </div>
);

const Controls = () => {
  const { stations, setStations } = useContext(ControlContext);
  const stationsLength = stations.length;

  const setStationsHandler = (order: number, value: string) => {
    setStations((stations: TStations) => {
      const tempStationsArr = [...stations] as TStations;
      tempStationsArr[order] = value;
      return tempStationsArr;
    });
  };

  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex flex-1 flex-row flex-wrap bg-background-form pr-0 shadow-md  min-h-[120px]">
        <div className="flex-1 flex flex-col p-3 shadow-black md:flex-wrap md:flex-row md:items-center md:justify-center md:gap-2">
          <StationInput
            label={StationsLabel.from}
            value={[0, stations[0]]}
            setStationsHandler={setStationsHandler}
          />

          <InterchangeControl setStationsHandler={setStationsHandler} />

          <StationInput
            label={StationsLabel.to}
            value={[stationsLength - 1, stations[stationsLength - 1]]}
            setStationsHandler={setStationsHandler}
          />
        </div>
      </div>
      <FavContextWrapper>
        <OtherControls />
      </FavContextWrapper>
    </div>
  );
};

export default Controls;
