import React, { useContext } from "react";

import Button from "../Common/Button";
import AddStationButton from "./AddStationButton";

import { ControlContext } from "../../contexts/ControlContext";

import { addAStation, removeAStation } from "../../Utils/helpers";

import { StationsLabel } from "../../types/customTypes";

import RemoveIcon from "@mui/icons-material/Remove";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import StationInput from "./StationInput";

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
      {[...Array(changeCount)].map((_, ind) => (
        <StationInput
          key={ind}
          label={StationsLabel.change}
          setStationsHandler={setStationsHandler}
          value={[ind + 1, stations[ind + 1]]}
          arrow={
            <DoubleArrowIcon
              sx={{ fontSize: "small", color: "var(--text-tertiary)" }}
            />
          }
        >
          <Button
            customStyle="place-self-center bg-text-inactive hover:bg-button-color scale-[80%]"
            clickHandler={removeHandler(ind + 1)}
            ariaLabel="Remove this change station"
          >
            <RemoveIcon />
          </Button>
        </StationInput>
      ))}

      <AddStationButton
        changeCount={changeCount}
        addHandler={addHandler(changeCount + 1)}
      />
    </>
  );
};

export default InterchangeControl;
