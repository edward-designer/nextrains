import { useState, useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

export default function useFavourite() {
  const initFav: TStations[] = [];
  const [localStoredValue, setNewValue] = useLocalStorage<TStations[]>(
    "NEXTRAINSfavs",
    initFav
  );
  const [showFavsList, setShowFavsList] = useState<boolean>(false);

  const favs = localStoredValue;

  const setFavs = (newFavs: TStations[]) => {
    setNewValue(newFavs);
  };

  const addFav = (newRoute: TStations) => {
    if (!isFav(newRoute)) setNewValue([newRoute, ...localStoredValue]);
  };

  const removeFav = (order: number) => {
    setNewValue(localStoredValue.filter((_fav, ind) => ind !== order));
  };

  const isFav = (route: TStations): boolean =>
    localStoredValue.some(
      (fav) => JSON.stringify(fav) === JSON.stringify(route)
    );

  useEffect(() => {
    if (favs.length === 0) setShowFavsList(false);
  }, [favs]);

  return {
    favs,
    setFavs,
    addFav,
    removeFav,
    isFav,
    showFavsList,
    setShowFavsList,
  };
}
