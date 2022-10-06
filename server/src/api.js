const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();

app.use(express.json());

const currentTime = () => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isTime1LaterThanTime2 = (time1, time2) => {
  if (time1 === null || time2 === null) return;
  if (!(isTimeFormat(time1) && isTimeFormat(time2))) return;
  const [hour1] = time1.split(":");
  const [hour2] = time2.split(":");
  if (parseInt(hour1) - parseInt(hour2) > 12) {
    return false;
  } else if (parseInt(hour2) - parseInt(hour1) > 12) {
    return true;
  }
  return time1 > time2;
};

const isTimeFormat = (time) => {
  if (time === null) return false;
  return /^\d{2}:\d{2}$/.test(time);
};

app.get(
  "/.netlify/functions/api/:from/to/:to/:timeOffset",
  (request, response) => {
    const timeOffset = request.params.timeOffset || 0;
    if (timeOffset === "arrivals") {
      const URL = `https://huxley2.azurewebsites.net/arrivals/${request.params.to}/from/${request.params.from}/20?expand=true&timeOffset=0&timeWindow=60`;
      axios
        .get(URL)
        .then((response) => response.json())
        .then((data) => {
          let trainServices = data.trainServices.map((train) => {
            const destinationPlatform = train.platform;
            const platform = null;
            const subsequentCallingPoints = train.previousCallingPoints;
            subsequentCallingPoints[0].callingPoint.push({
              locationName: data.locationName,
              crs: data.crs,
              st: train.sta,
              et: train.eta,
            });
            const std =
              train.previousCallingPoints.length > 0
                ? train.previousCallingPoints[0].callingPoint.filter(
                    (station) => station.crs === request.params.from
                  )[0].st
                : "";
            return {
              ...train,
              destinationPlatform,
              platform,
              subsequentCallingPoints,
              std,
            };
          });
          trainServices = trainServices.filter((train) =>
            isTime1LaterThanTime2(currentTime(), train.std)
          );
          response.json({ ...data, trainServices });
        })
        .catch((err) => {
          console.error(err);
          response
            .status(500)
            .send(
              "Cannot get train information at the moment. Please try again later."
            );
        });
    } else {
      const timeOffset2 = Number(timeOffset) + 15;
      const to = request.params.to === "NIL" ? "" : `/to/${request.params.to}`;
      const URL1 = `https://huxley2.azurewebsites.net/departures/${request.params.from}${to}/20?expand=true&timeOffset=${timeOffset}&timeWindow=120`;
      const URL2 = `https://huxley2.azurewebsites.net/arrivals/${request.params.to}/from/${request.params.from}/20?expand=true&timeOffset=${timeOffset2}&timeWindow=120`;
      // get departure info from departing station
      axios
        .get(URL1)
        .then((response) => response.data)
        .then((data) => {
          if (request.params.to !== "NIL") {
            // get arrival info from destination station
            axios
              .get(URL2)
              .then((response2) => response2.data)
              .then((data2) => {
                const trainServices = data.trainServices?.map((train) => {
                  const dPlatform =
                    data2.trainServices?.find(
                      (train2) =>
                        (train2.origin[0].crs === train.origin[0].crs &&
                          train2.destination[0].crs ===
                            train.destination[0].crs &&
                          train2.previousCallingPoints &&
                          train2.previousCallingPoints[0].callingPoint.some(
                            (point) => point.st === train.std
                          )) ||
                        (train2.previousCallingPoints &&
                          train2.previousCallingPoints[0].callingPoint.some(
                            (point) => point.et === train.etd
                          ) &&
                          train.etd !== "On time")
                    )?.platform || "";
                  return {
                    ...train,
                    destinationPlatform: dPlatform,
                  };
                });
                response.json({
                  ...data,
                  trainServices,
                });
              });
          } else {
            response.json(data);
          }
        })
        .catch((err) => {
          console.error(err);
          response
            .status(500)
            .send(
              "Cannot get train information at the moment. Please try again later."
            );
        });
    }
  }
);

module.exports = app;
module.exports.handler = serverless(app);
