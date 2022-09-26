import Autocomplete from "../Autocomplete/Autocomplete";

import { StationsLabel } from "../../types/customTypes";

import React from "react";

interface TStationInput {
  label: StationsLabel;
  value: [number, string];
  setStationsHandler: (order: number, value: string) => void;
  children?: React.ReactNode;
  arrow?: React.ReactNode;
}

const StationInput = ({
  children,
  label,
  value,
  setStationsHandler,
  arrow,
}: TStationInput) => (
  <>
    <div className="flex items-center my-2 md:basis-1/4 relative">
      <Autocomplete
        label={label}
        changeHandler={setStationsHandler}
        value={value}
      />
      {children}
      {arrow}
    </div>
  </>
);

export default StationInput;
