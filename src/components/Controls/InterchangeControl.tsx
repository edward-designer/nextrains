import React, { useContext, useState } from "react";

import Autocomplete from "../Autocomplete/Autocomplete";
import Button from "../Common/Button";

import { ControlContext } from "../../contexts/ControlContext";

import { addAStation, removeAStation } from "../../Utils/helpers";

import { StationsLabel } from "../../types/customTypes";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

interface TInterchangeControl {
  setStationsHandler: (order: number, value: string) => void;
}

const InterchangeControl = ({ setStationsHandler }: TInterchangeControl) => {
  const { stations, setStations } = useContext(ControlContext);
  const stationsCount = stations.length;
  const changeCount = stationsCount - 2;

  const addHandler = (index: number) => {
    return () => setStations(addAStation(stations, index));
  };
  const removeHandler = (index: number) => {
    return () => setStations(removeAStation(stations, index));
  };

  return (
    <>
      {stationsCount > 2 &&
        [...Array(changeCount)].map((_, ind) => (
          <div
            key={ind}
            className="flex items-center basis-1/4 mt-2 mb-1 md:mt-0 md:mb-0"
          >
            <Autocomplete
              label={StationsLabel.change}
              changeHandler={setStationsHandler}
              value={[ind + 1, stations[ind + 1]]}
            />
            <Button
              customStyle="place-self-center -ml-3 bg-text-inactive hover:bg-button-color scale-[80%]"
              clickHandler={removeHandler(ind + 1)}
              ariaLabel="Remove this change station"
            >
              <RemoveIcon />
            </Button>
            <DoubleArrowIcon
              sx={{ fontSize: "small", color: "var(--text-tertiary)" }}
            />
          </div>
        ))}
      <div className="flex flex-row items-center justify-center -mt-5 -mb-5 z-10 md:mt-0 md:mb-0">
        {changeCount < 4 && (
          <>
            <Button
              customStyle="place-self-center bg-button-color"
              clickHandler={addHandler(changeCount + 1)}
              ariaLabel="Add a Change Station"
            >
              <AddOutlinedIcon />
            </Button>
            <DoubleArrowIcon
              sx={{
                fontSize: "small",
                color: "var(--text-tertiary)",
                marginLeft: "10px",
                marginRight: "-8px",
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default InterchangeControl;
