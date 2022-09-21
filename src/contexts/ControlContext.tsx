import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";

import { formatStations } from "../Utils/helpers";

interface TControlContext {
  stations: TStations;
  setStations: (
    station: TStations | ((station: TStations) => TStations)
  ) => void;
}

export const ControlContext = createContext<TControlContext>({
  stations: [],
  setStations: () => {},
});

const ControlContextWrapper = ({ children }: { children: ReactNode }) => {
  const { from, change1, change2, change3, change4, to } = useParams();
  const stationsFromURL = formatStations(
    [from, change1, change2, change3, change4, to].filter(Boolean) as TStations
  );
  const [stations, setStations] = useState<TStations>(stationsFromURL);
  useEffect(() => {
    if (formatStations(stations).length > 0) {
      const newURL = stations.filter(Boolean).join("/");
      const newTitle = stations.filter(Boolean).join("→");
      // right now can only replace the URL but cannnot "go back"
      window.history.replaceState(null, newTitle, `/${newURL}`);
    }
  }, [stations]);

  const controlValues = useMemo(
    () => ({ stations, setStations }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(stations)]
  );

  return (
    <ControlContext.Provider value={controlValues}>
      {children}
    </ControlContext.Provider>
  );
};

export default ControlContextWrapper;
