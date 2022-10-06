import React, { createContext, useState } from "react";

type TTrainContext = {
  children: React.ReactNode;
};

type TInitialTrainContextValue = {
  selectedTrains: Map<number, TParsedTrainInfo>;
  setSelectedTrains: React.Dispatch<
    React.SetStateAction<Map<number, TParsedTrainInfo>>
  >;
  onTrain: Map<number, boolean>;
  setOnTrain: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
};

const initialTrainContextValue = {
  selectedTrains: new Map(),
  setSelectedTrains: () => {},
  onTrain: new Map(),
  setOnTrain: () => {},
};

export const SelectedTrainContext = createContext<TInitialTrainContextValue>(
  initialTrainContextValue
);

const SelectedTrainContextWrapper = ({ children }: TTrainContext) => {
  const [selectedTrains, setSelectedTrains] = useState<
    Map<number, TParsedTrainInfo>
  >(new Map());
  const [onTrain, setOnTrain] = useState<Map<number, boolean>>(new Map());
  return (
    <SelectedTrainContext.Provider
      value={{ selectedTrains, setSelectedTrains, onTrain, setOnTrain }}
    >
      {children}
    </SelectedTrainContext.Provider>
  );
};

export default SelectedTrainContextWrapper;
