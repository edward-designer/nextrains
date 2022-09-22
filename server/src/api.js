const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

const settings = { method: "Get" };

app.get(
  "/.netlify/functions/api/:from/to/:to/:timeOffset",
  (request, response) => {
    const timeOffset = request.params.timeOffset || 0;
    const timeOffset2 = Number(timeOffset) + 15;
    const to = request.params.to === "NIL" ? "" : `/to/${request.params.to}`;
    const URL1 = `https://huxley2.azurewebsites.net/departures/${request.params.from}${to}/20?expand=true&timeOffset=${timeOffset}&timeWindow=120`;
    const URL2 = `https://huxley2.azurewebsites.net/arrivals/${request.params.to}/from/${request.params.from}/20?expand=true&timeOffset=${timeOffset2}&timeWindow=120`;

    fetch(URL1, settings)
      .then((response) => response.json())
      .then((data) => {
        if (request.params.to !== "NIL") {
          fetch(URL2, settings)
            .then((response2) => response2.json())
            .then((data2) => {
              const trainServices = data.trainServices?.map((train) => {
                const dPlatform =
                  data2.trainServices?.find(
                    (train2) =>
                      (train2.origin[0].crs === train.origin[0].crs &&
                        train2.destination[0].crs ===
                          train.destination[0].crs &&
                        train2.previousCallingPoints[0].callingPoint.some(
                          (point) => point.st === train.std
                        )) ||
                      (train2.previousCallingPoints[0].callingPoint.some(
                        (point) => point.et === train.etd
                      ) &&
                        train.etd !== "On time")
                  )?.platform || "";
                const alteredTrain = {
                  ...train,
                  destinationPlatform: dPlatform,
                };
                return alteredTrain;
              });
              const dataWithDestinationPlatform = {
                ...data,
                trainServices,
              };
              response.json(dataWithDestinationPlatform);
            });
        } else {
          response.json(data);
        }
      })
      .catch((err) => {
        console.error(err);
        response
          .status(400)
          .send(
            "Cannot get train information at the moment. Please try again later."
          );
      });
  }
);

module.exports = app;
module.exports.handler = serverless(app);