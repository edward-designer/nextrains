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
  const { response, error, notice, loading, refetch } = useTrainInfo(
    fromTo,
    earliestTimeForConnectingTrain,
    finalDestination
  );

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
  };
  return (
    <TrainInfoContext.Provider value={value}>
      {children}
    </TrainInfoContext.Provider>
  );
};

export default TrainInfoContextWrapper;
