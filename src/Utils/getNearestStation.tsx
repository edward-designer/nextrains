import { StationData } from "uk-railway-stations";

const findDistanceBetweenLatLonInKM = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // That would be too far away from our use case i.e. > 110 km
  if (Math.abs(lat1 - lat2) > 1 || Math.abs(lon1 - lon2) > 1) {
    return Infinity;
  }
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getNearestStation = (
  curLat: number,
  curLon: number,
  stations: StationData[]
): StationData => {
  let nearestDist = Infinity;
  const nearestStation = stations.reduce(
    (acc, station) => {
      const distance = findDistanceBetweenLatLonInKM(
        curLat,
        curLon,
        station.lat,
        station.long
      );
      if (distance < nearestDist) {
        nearestDist = distance;
        return station;
      }
      return acc;
    },
    { stationName: "", lat: Infinity, long: Infinity, crsCode: "" }
  );
  return nearestStation;
};

export default getNearestStation;
