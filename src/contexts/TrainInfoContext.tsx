import React, { createContext } from "react";

import useTrainInfo from "../hooks/useTrainInfo";

interface TTrainInfoContext {
  fromTo: TFromTo;
  leg: number;
  earliestTimeForConnectingTrain: string | null;
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
  children: React.ReactNode;
}
const TrainInfoContextWrapper = ({
  fromTo,
  leg,
  earliestTimeForConnectingTrain,
  children,
}: TTrainInfoContextWrapper) => {
  const { response, error, notice, loading, refetch } = useTrainInfo(
    fromTo,
    earliestTimeForConnectingTrain
  );

  const value = {
    fromTo,
    leg,
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
