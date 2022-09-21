type TStations = string[];

interface TFromTo {
  from: string;
  to: string;
}

type TTrainInfo = {
  isCancelled: boolean;
  isDelayed: boolean;
  etd: string;
  std: string;
  destination: {
    locationName: string;
    crs: string;
  }[];
  platform: string;
  subsequentCallingPoints: {
    callingPoint: {
      locationName: string;
      crs: string;
      st: string;
      et: string;
    }[];
  }[];
  serviceIdUrlSafe: string;
  operator: string;
  delayReason: string;
  cancelReason: string;
  formation: {
    coaches: { toilet: { status: number; value: string } }[];
  } | null;
  destinationPlatform: string;
};

type TParsedTrainInfo = {
  serviceIdUrlSafe: string;
  isRunning: boolean;
  status: TrainStatus;
  arrivalTime: string | null;
  std: string;
  platform: string;
  endStation: string;
  endStationCRS: string;
  callingPoint: {
    locationName: string;
    crs: string;
    st: string;
    et: string;
  }[];
  toStationArrivalTime: string | null;
  arrivalTimeFinalDestination: string;
  reason: string | null;
  hasToilet: boolean;
  fastest: boolean;
  isDirect: boolean;
  toStation: string | null;
  toStationPlatform: string;
};

type TStation = {
  locationName: string;
  crs: string;
  st: string;
  et: string;
};
