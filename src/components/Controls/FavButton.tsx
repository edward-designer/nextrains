import React from "react";

import Button from "../Common/Button";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

interface TFavButton {
  hasAddedToFav: boolean;
  addToFavHandler: () => void;
}

const FavButton = ({ hasAddedToFav, addToFavHandler }: TFavButton) => {
  return hasAddedToFav ? (
    <Button
      ariaLabel="Already added"
      customStyle="bg-transparent text-text-inactive cursor-default"
      label="Saved"
    >
      <BookmarkAddedIcon />
    </Button>
  ) : (
    <Button
      clickHandler={addToFavHandler}
      ariaLabel="Add to favorites"
      customStyle="bg-transparent text-button-color"
      label="Add to Saved"
    >
      <BookmarkAddIcon />
    </Button>
  );
};

export default FavButton;
