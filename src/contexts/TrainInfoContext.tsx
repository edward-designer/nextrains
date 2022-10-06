import React, { createContext } from "react";

import useTrainInfo from "../hooks/useTrainInfo";

interface TTrainInfoContext {
  fromTo: TFromTo;
  leg: number;
  earliestTimeForConnectingTrain: string | null;
  finalDestination: string;
  response: TParsedTrainInfo[];
  error: string;
  notice: { value: string }[];
  loading: boolean;
  refetch: (time: string | null) => void;
  fetchPreviousTrains: () => void;
}

export const TrainInfoContext = createContext<TTrainInfoContext>({
  fromTo: { from: "", to: "" },
  leg: -1,
  earliestTimeForConnectingTrain: null,
  finalDestination: "",
  response: [],
  error: "",
  notice: [],
  loading: false,
  refetch: (time) => {},
  fetchPreviousTrains: () => {},
});

interface TTrainInfoContextWrapper {
  fromTo: TFromTo;
  leg: number;
  earliestTimeForConnectingTrain: string | null;
  finalDestination?: string;
  children: React.ReactNode;
}
const TrainInfoContextWrapper = ({
  fromTo,
  leg,
  earliestTimeForConnectingTrain,
  finalDestination = "",
  children,
}: TTrainInfoContextWrapper) => {
  const { response, error, notice, loading, refetch, fetchPreviousTrains } =
    useTrainInfo(fromTo, earliestTimeForConnectingTrain, finalDestination);

  const value = {
    fromTo,
    leg,
    finalDestination,
    earliestTimeForConnectingTrain,
    response,
    error,
    notice,
    loading,
    refetch,
    fetchPreviousTrains,
  };
  return (
    <TrainInfoContext.Provider value={value}>
      {children}
    </TrainInfoContext.Provider>
  );
};

export default TrainInfoContextWrapper;
