import React from "react";

import ControlContext from "../../contexts/ControlContext";
import Controls from "../Controls/Controls";
import Journeys from "../Journeys/Journeys";

const Main = () => {
  return (
    <main>
      <ControlContext>
        <Controls />
        <Journeys />
      </ControlContext>
    </main>
  );
};

export default Main;
