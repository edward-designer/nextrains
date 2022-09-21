import React, { useContext } from "react";

import Button from "../Common/Button";

import { ControlContext } from "../../contexts/ControlContext";
import { FavContext } from "../../contexts/FavContext";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FavList from "../FavList/FavList";
import FavButton from "./FavButton";
import ShowFavsButton from "./ShowFavsButton";

const OtherControls = () => {
  const { stations, setStations } = useContext(ControlContext);
  const { favs, addFav, isFav, showFavsList, setShowFavsList } =
    useContext(FavContext);

  const swapHandler = () => {
    setStations((stations: TStations) => {
      const tempStationsArr = [...stations].reverse();
      return tempStationsArr;
    });
  };

  const showFavsListHandler = () => {
    setShowFavsList((showFavsList) => !showFavsList);
  };

  const addFavHandler = (stations: TStations) => {
    return () => addFav(stations);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="bg-background-form">
            <Button
              clickHandler={swapHandler}
              ariaLabel="Reverse the station orders"
              customStyle="bg-transparent text-button-color"
              label="Return"
            >
              <SwapHorizIcon />
            </Button>

            <FavButton
              hasAddedToFav={isFav(stations)}
              addToFavHandler={addFavHandler(stations)}
            />
          </div>

          <ShowFavsButton
            favs={favs}
            showFavsListHandler={showFavsListHandler}
            showFavsList={showFavsList}
          />
        </div>
      </div>
      <FavList />
    </>
  );
};

export default OtherControls;
