import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import {
  isTime1LaterThanTime2,
  minutesDifferenceNumber,
  currentTime,
} from "../Utils/helpers";

import parseTrainInfo from "../Utils/parseTrainInfo";

const useTrainInfo = (
  { from, to }: TFromTo,
  timeFrom: string | null,
  destination?: string
) => {
  const [response, setResponse] = useState<TParsedTrainInfo[]>([]);
  const [error, setError] = useState<string>("");
  const [notice, setNotice] = useState<{ value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrainInfo = useCallback(
    (time: number = 0) => {
      if (from !== "") {
        setLoading(true);
        const apiTo = to ? `${to}` : "NIL";
        const timeOffset = time + 1;
        const http = import.meta.env.DEV
          ? "http://localhost:3001"
          : "https://nextrains.herokuapp.com";
        const trainApi = `${http}/api/${from}/to/${apiTo}/${timeOffset}`;
        axios
          .get(trainApi)
          .then((response) => {
            const notice = response.data.nrccMessages;
            if (notice) setNotice(notice);

            let trainServices = response.data.trainServices;

            trainServices = trainServices?.map((train: TTrainInfo) => {
              const formattedTrainInfo = parseTrainInfo(
                train,
                to,
                response.data.locationName,
                destination
              );
              return { ...formattedTrainInfo };
            });
            if (trainServices?.length > 1) {
              const runningTrainServices = trainServices.filter(
                (train: TParsedTrainInfo) => train.isRunning
              );
              let fastestArrivalTime =
                runningTrainServices.arrivalTimeDestination;
              let fastestArrivalTrain = 0;
              for (let i = 0; i < trainServices.length; i++) {
                if (
                  isTime1LaterThanTime2(
                    fastestArrivalTime,
                    trainServices[i].arrivalTimeDestination
                  ) ||
                  !fastestArrivalTime ||
                  !trainServices[fastestArrivalTrain].isRunning
                ) {
                  fastestArrivalTime = trainServices[i].arrivalTimeDestination;
                  fastestArrivalTrain = i;
                }
              }
              if (
                fastestArrivalTime &&
                trainServices[fastestArrivalTrain].isRunning
              )
                trainServices[fastestArrivalTrain].fastest = true;
            }
            setResponse(trainServices);
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [from, to, destination]
  );

  const refetch = useCallback(
    (time: string | null) => {
      const timeDifference =
        time === null
          ? 0
          : minutesDifferenceNumber(currentTime(), String(time));
      fetchTrainInfo(timeDifference);
    },
    [fetchTrainInfo]
  );

  useEffect(() => {
    fetchTrainInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return { response, error, notice, loading, refetch };
};

export default useTrainInfo;
