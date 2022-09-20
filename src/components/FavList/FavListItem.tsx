import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ControlContext } from "../../contexts/ControlContext";

import Button from "../Common/Button";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragHandleIcon from "@mui/icons-material/DragHandle";

type TFavListItem = {
  ind: number;
  id: string;
  fav: TStations;
  removeFav: (order: number) => void;
  setShowFavsList: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavListItem = ({
  fav,
  id,
  ind,
  removeFav,
  setShowFavsList,
}: TFavListItem) => {
  const { setStations } = useContext(ControlContext);
  const setAsRoute = (fav: TStations) => {
    setStations(fav);
  };

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
