import React, { createContext } from "react";

import useFavourite from "../hooks/useFavourite";

interface TFavContext {
  favs: TStations[];
  setFavs: (newFavs: TStations[]) => void;
  addFav: (newRoute: TStations) => void;
  removeFav: (order: number) => void;
  isFav: (route: TStations) => boolean;
  showFavsList: boolean;
  setShowFavsList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FavContext = createContext<TFavContext>({} as TFavContext);

const FavContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const favValues = useFavourite();
  return (
    <FavContext.Provider value={favValues}>{children}</FavContext.Provider>
  );
};

export default FavContextWrapper;
