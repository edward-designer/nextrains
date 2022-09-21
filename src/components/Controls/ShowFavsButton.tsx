import React from "react";

import Button from "../Common/Button";

import BookmarksIcon from "@mui/icons-material/Bookmarks";

interface TShowFavsButton {
  favs: TStations[];
  showFavsListHandler: () => void;
  showFavsList: boolean;
}

const ShowFavsButton = ({
  favs,
  showFavsListHandler,
  showFavsList,
}: TShowFavsButton) => {
  if (favs.length === 0) return null;
  return (
    <Button
      clickHandler={showFavsListHandler}
      ariaLabel="Show saved routes"
      customStyle={`bg-transparent text-text-notice transition ${
        showFavsList ? "opacity-30" : ""
      }`}
      label="Saved Routes"
    >
      <BookmarksIcon />
    </Button>
  );
};

export default ShowFavsButton;
