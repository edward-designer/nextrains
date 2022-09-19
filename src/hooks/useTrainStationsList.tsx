import { useState } from "react";

import StationsListJSON from "uk-railway-stations";

const useTrainStationsList = () => {
  const [stationList] = useState(StationsListJSON);
  return [stationList];
};

export default useTrainStationsList;
