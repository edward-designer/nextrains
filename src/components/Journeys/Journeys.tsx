import React, { useContext } from "react";

import TrainListPane from "../TrainList/TrainListPane";

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
          <section
            className="mt-1 basis-full md:basis-[calc((100%-8px)/2)] md:items-start md:gap-3"
            key={Object.values(route).join("")}
          >
            <TrainListPane leg={ind + 1} fromTo={route} />
          </section>
        ))}
      </div>
    </SelectedTrainContextWrapper>
  );
};

export default Journeys;
