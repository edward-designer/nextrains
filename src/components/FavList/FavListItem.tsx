import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Button from "../Common/Button";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragHandleIcon from "@mui/icons-material/DragHandle";

type TFavListItem = {
  ind: number;
  id: string;
  fav: TStations;
  removeFav: (order: number) => void;
  showFavsList: boolean;
  setShowFavsList: React.Dispatch<React.SetStateAction<boolean>>;
  setStations: (
    station: TStations | ((station: TStations) => TStations)
  ) => void;
};

const FavListItem = ({
  fav,
  id,
  ind,
  removeFav,
  showFavsList,
  setShowFavsList,
  setStations,
}: TFavListItem) => {
  const setAsRoute = (fav: TStations) => {
    setStations(fav);
  };

  if (!showFavsList) return null;

  return (
    <Draggable draggableId={id} index={ind}>
      {(provided, snapshot) => (
        <li
          className={`flex items-center border-b border-b-background-form p-1 bg-background-main`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragHandleIcon className="text-text-notice-icon mr-2" />
          <span
            tabIndex={0}
            className="flex-1 no-underline font-bold hover:text-button-color cursor-pointer"
            onClick={() => {
              setAsRoute(fav);
              setShowFavsList(false);
            }}
          >
            {fav.filter(Boolean).join(" → ")}
          </span>

          <Button
            customStyle="text-text-inactive hover:text-button-color bg-background-main"
            clickHandler={() => removeFav(ind)}
            ariaLabel="delete saved route"
            label="delete"
          >
            <DeleteOutlineIcon />
          </Button>
        </li>
      )}
    </Draggable>
  );
};

export default FavListItem;
