import React, { useContext, useState, useEffect } from "react";

import Button from "../Common/Button";

import { ControlContext } from "../../contexts/ControlContext";
import { FavContext } from "../../contexts/FavContext";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FavList from "../FavList/FavList";

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

  const ShowFavsListHandler = () => {
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

            {isFav(stations) ? (
              <Button
                clickHandler={() => {}}
                ariaLabel="Already added"
                customStyle="bg-transparent text-text-inactive cursor-default"
                label="Saved"
              >
                <BookmarkAddedIcon />
              </Button>
            ) : (
              <Button
                clickHandler={addFavHandler(stations)}
                ariaLabel="Add to favorites"
                customStyle="bg-transparent text-button-color"
                label="Add to Saved"
              >
                <BookmarkAddIcon />
              </Button>
            )}
          </div>

          {favs.length > 0 && (
            <Button
              clickHandler={ShowFavsListHandler}
              ariaLabel="Show saved routes"
              customStyle={`bg-transparent ${
                showFavsList ? "text-text-inactive" : "text-text-notice"
              }`}
              label="Saved Routes"
            >
              <BookmarksIcon />
            </Button>
          )}
        </div>
      </div>
      <FavList />
    </>
  );
};

export default OtherControls;
