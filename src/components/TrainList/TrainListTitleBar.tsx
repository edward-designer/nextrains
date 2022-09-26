import React, { useContext, useState } from "react";

import Button from "../Common/Button";
import PeakNotice from "../Notice/PeakNotice";
import Alert from "../Common/Alert";

import { SelectedTrainContext } from "../../contexts/SelectedTrainContext";
import { TrainInfoContext } from "../../contexts/TrainInfoContext";

import SyncIcon from "@mui/icons-material/Sync";
import TrainIcon from "@mui/icons-material/Train";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const TrainListTitleBar = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const SelectedTrains = useContext(SelectedTrainContext);
  const {
    fromTo,
    leg,
    earliestTimeForConnectingTrain,
    notice,
    error,
    loading,
    refetch,
  } = useContext(TrainInfoContext);

  const trainSelected = SelectedTrains.selectedTrains.has(leg);

  const toggleAlert = () => {
    setShowAlert((showAlert) => !showAlert);
  };

  const refetchHandler = (time: string | null) => {
    return () => refetch(time);
  };

  if (!fromTo.from) return null;

  return (
    <>
      <div
        className={`${
          trainSelected ? "" : `sticky top-0 z-50`
        } h-10 flex items-center text-text-secondary bg-background-title border-b border-background-main`}
      >
        <h2 className="flex-1 text-lg h-full flex items-center">
          <span className="inline-block text-bold bg-text-secondary w-8 text-2xl leading-10 h-full text-background-title text-center mr-2 opacity-30">
            {leg}
          </span>
          <TrainIcon />
          {` ${fromTo.from} → ${fromTo.to}`}
        </h2>
        {notice?.length !== 0 && (
          <Button
            clickHandler={toggleAlert}
            customStyle="bg-background-title"
            ariaLabel="Show notices"
          >
            <ReportProblemIcon />
          </Button>
        )}
        {!trainSelected && (
          <Button
            clickHandler={refetchHandler(earliestTimeForConnectingTrain)}
            customStyle={` ${loading ? "opacity-30" : "bg-background-title"}`}
            ariaLabel="update train data"
          >
            <SyncIcon />
          </Button>
        )}
      </div>
      <Alert
        message={error}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        type="Error"
      />
      {notice.map((noticeItem, inx) => (
        <Alert
          key={`${fromTo.from}${fromTo.to}${inx}`}
          message={noticeItem.value}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          type="Notice"
        />
      ))}
      <PeakNotice fromStation={fromTo.from} />
    </>
  );
};

export default TrainListTitleBar;
