import { useContext, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import FavListItem from "./FavListItem";
import { FavContext } from "../../contexts/FavContext";

const FavList = () => {
  const { favs, setFavs, removeFav, showFavsList, setShowFavsList } =
    useContext(FavContext);
    
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const newList = [...favs];
    const add = newList[source.index];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, add);
    setFavs(newList);
  };

  return (
    <div className="basis-full">
      {showFavsList && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="favList">
            {(provided, snapshot) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {favs?.map((fav, ind) => (
                  <FavListItem
                    key={fav.filter(Boolean).join("")}
                    id={fav.filter(Boolean).join("")}
                    fav={fav}
                    ind={ind}
                    removeFav={removeFav}
                    setShowFavsList={setShowFavsList}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default FavList;
