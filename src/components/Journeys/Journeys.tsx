import React, { useContext } from "react";

import Journey from "./Journey";

import { ControlContext } from "../../contexts/ControlContext";
import SelectedTrainContextWrapper from "../../contexts/SelectedTrainContext";

import { parseStationsIntoRoutes } from "../../Utils/helpers";

const Journeys = () => {
  const { stations } = useContext(ControlContext);
  const routesArray = parseStationsIntoRoutes(stations);

  return (
    <SelectedTrainContextWrapper>
      <div className="flex flex-wrap flex-row gap-2">
        {routesArray.map((route, ind) => (
          <Journey
            key={Object.values(route).join("")}
            leg={ind + 1}
            fromTo={route}
            finalDestination={
              ind !== routesArray.length - 1 ? stations.at(-1) || "" : ""
            }
          />
        ))}
      </div>
    </SelectedTrainContextWrapper>
  );
};

export default Journeys;
