const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/:from/to/:to/:timeOffset", (request, response) => {
  const timeOffset = request.params.timeOffset || 0;
  const timeOffset2 = Number(timeOffset) + 15;
  const to = request.params.to === "NIL" ? "" : `/to/${request.params.to}`;
  const URL1 = `https://huxley2.azurewebsites.net/departures/${request.params.from}${to}/20?&expand=true&timeOffset=${timeOffset}&timeWindow=120`;
  const URL2 = `https://huxley2.azurewebsites.net/arrivals/${request.params.to}/from/${request.params.from}/20?expand=true&timeOffset=${timeOffset2}&timeWindow=120`;

  fetch(URL1)
    .then((response) => response.json())
    .then((data) => {
      if (request.params.to !== "NIL") {
        fetch(URL2)
          .then((response2) => response2.json())
          .then((data2) => {
            const trainServices = data.trainServices?.map((train) => {
              const dPlatform =
                data2.trainServices?.find(
                  (train2) =>
                    (train2.origin[0].crs === train.origin[0].crs &&
                      train2.destination[0].crs === train.destination[0].crs &&
                      train2.previousCallingPoints[0].callingPoint.some(
                        (point) => point.st === train.std
                      )) ||
                    (train2.previousCallingPoints[0].callingPoint.some(
                      (point) => point.et === train.etd
                    ) &&
                      train.etd !== "On time")
                )?.platform || "";
              return {
                ...train,
                destinationPlatform: dPlatform,
              };
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
});

app.use(express.static("build"));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "./build", "index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
