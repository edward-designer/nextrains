type TStations = string[];

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
  arrivalTimeDestination: string | null;
  arrivalTimeFinalDestination: string;
  reason: string | null;
  hasToilet: boolean;
  fastest: boolean;
  isDirect: boolean;
  destinationPlatform: string;
};

enum TrainStatus {
  "ontime" = "On Time",
  "departed" = "On Time and Departed",
  "delayedWithNewArrivalTime" = "Delayed with a new Arrival Time Set",
  "delayed" = "Delayed",
  "cancelled" = "Cancelled",
}
