import React, { useState, useEffect, useContext } from "react";

import StationInput from "./StationInput";
import Button from "../Common/Button";

import { ControlContext } from "../../contexts/ControlContext";

import getNearestStation from "../../Utils/getNearestStation";

import { StationsLabel } from "../../types/customTypes";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useTrainStationsList from "../../hooks/useTrainStationsList";
import Loading from "../Common/Loading";

interface TFromStationField {
  label: StationsLabel;
  value: [number, string];
  setStationsHandler: (order: number, value: string) => void;
}

interface TLonLat {
  lon: number;
  lat: number;
}

const FromStationField = ({
  label,
  value,
  setStationsHandler,
}: TFromStationField) => {
  const { setStations } = useContext(ControlContext);
  const [stationsList] = useTrainStationsList();
  const [currentLonLat, setcurrentLonLat] = useState<TLonLat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const errorCallback = (error: GeolocationPositionError) => {
    const { code } = error;
    switch (code) {
      case GeolocationPositionError.TIMEOUT:
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
        break;
      case GeolocationPositionError.PERMISSION_DENIED:
        alert(
          "Accessing geolocation needs to be authorized in order to find the nearest station."
        );
        setLoading(false);
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        if (window.confirm("Currently experiencing some issues. Retry?")) {
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
          );
        } else {
          setLoading(false);
        }
        break;
    }
  };

  const successCallback = (position: GeolocationPosition) => {
    setcurrentLonLat({
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    });
  };

  const setNearestHandler = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not available");
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  };

  useEffect(() => {
    if (currentLonLat !== null) {
      const nearestStationData = getNearestStation(
        currentLonLat.lat,
        currentLonLat.lon,
        stationsList
      );
      setStations((stations) => {
        const newStations = [...stations];
        newStations[0] = nearestStationData.crsCode;
        return newStations;
      });
      setLoading(false);
    }
  }, [currentLonLat, setStations, stationsList]);

  return (
    <StationInput
      label={label}
      value={value}
      setStationsHandler={setStationsHandler}
      arrow={
        <DoubleArrowIcon
          sx={{ fontSize: "small", color: "var(--text-tertiary)" }}
        />
      }
    >
      {loading && <Loading />}
      {!currentLonLat && (
        <Button
          clickHandler={setNearestHandler}
          ariaLabel="Find nearest station"
          customStyle="text-text-tertiary"
          label="Nearest Station"
        >
          <MyLocationIcon />
        </Button>
      )}
    </StationInput>
  );
};

export default FromStationField;
