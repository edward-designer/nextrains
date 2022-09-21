import React, { createContext, useState } from "react";

type TTrainContext = {
  children: React.ReactNode;
};

type TInitialTrainContextValue = {
  selectedTrains: Map<number, TParsedTrainInfo>;
  setSelectedTrains: React.Dispatch<
    React.SetStateAction<Map<number, TParsedTrainInfo>>
  >;
};

const initialTrainContextValue = {
  selectedTrains: new Map(),
  setSelectedTrains: () => {},
};

export const SelectedTrainContext = createContext<TInitialTrainContextValue>(
  initialTrainContextValue
);

const SelectedTrainContextWrapper = ({ children }: TTrainContext) => {
  const [selectedTrains, setSelectedTrains] = useState<
    Map<number, TParsedTrainInfo>
  >(new Map());
  return (
    <SelectedTrainContext.Provider
      value={{ selectedTrains, setSelectedTrains }}
    >
      {children}
    </SelectedTrainContext.Provider>
  );
};

export default SelectedTrainContextWrapper;
