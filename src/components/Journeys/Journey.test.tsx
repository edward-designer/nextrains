import React from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import Journey from "./Journey";

const sampleResponse = [
  {
    serviceIdUrlSafe: "NxipjZIP1CMhh9-645TKOg",
    endStation: "Swansea1",
    endStationCRS: "SWA",
    isRunning: false,
    status: "Cancelled",
    std: "19:43",
    platform: "9B",
    callingPoint: [
      {
        locationName: "Reading",
        crs: "FROM",
        st: "19:43",
        et: "21:29",
      },
      {
        locationName: "Didcot Parkway",
        crs: "DID",
        st: "19:54",
        et: "21:39",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Swindon",
        crs: "SWI",
        st: "20:07",
        et: "21:52",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Bristol Parkway",
        crs: "BPW",
        st: "20:31",
        et: "22:13",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Newport (South Wales)",
        crs: "NWP",
        st: "20:57",
        et: "22:32",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Cardiff Central",
        crs: "CDF",
        st: "21:15",
        et: "22:44",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Bridgend",
        crs: "BGN",
        st: "21:45",
        et: "23:03",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Port Talbot Parkway",
        crs: "PTA",
        st: "21:57",
        et: "23:15",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Neath",
        crs: "NTH",
        st: "22:04",
        et: "23:22",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Swansea",
        crs: "SWA",
        st: "22:17",
        et: "23:33",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "21:29",
    reason:
      "This train has been cancelled because of damage to the overhead electric wires",
    hasToilet: false,
    fastest: false,
    isDirect: false,
    toStation: "",
    toStationArrivalTime: null,
    arrivalTimeFinalDestination: "",
  },
  {
    serviceIdUrlSafe: "91jQx_z6WGPgUd8KNqLAgw",
    endStation: "Swansea",
    endStationCRS: "SWA",
    isRunning: true,
    status: "Delayed with a new Arrival Time Set",
    std: "20:13",
    platform: "9",
    callingPoint: [
      {
        locationName: "Reading",
        crs: "FROM",
        st: "20:13",
        et: "21:57",
      },
      {
        locationName: "Swindon",
        crs: "SWI",
        st: "20:37",
        et: "22:20",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Bristol Parkway",
        crs: "BPW",
        st: "21:01",
        et: "22:41",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Newport (South Wales)",
        crs: "NWP",
        st: "21:23",
        et: "23:00",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Cardiff Central",
        crs: "CDF",
        st: "21:40",
        et: "23:12",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Bridgend",
        crs: "BGN",
        st: "22:02",
        et: "23:31",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Port Talbot Parkway",
        crs: "PTA",
        st: "22:14",
        et: "23:43",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Neath",
        crs: "NTH",
        st: "22:21",
        et: "23:50",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Swansea",
        crs: "SWA",
        st: "22:34",
        et: "00:01",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "21:57",
    reason:
      "This train has been delayed by damage to the overhead electric wires",
    hasToilet: false,
    fastest: false,
    isDirect: false,
    toStation: "",
    toStationArrivalTime: null,
    arrivalTimeFinalDestination: "",
  },
];

vi.mock("../../hooks/useTrainInfo", () => ({
  default: () => ({
    response: sampleResponse,
    error: "",
    notice: [],
    loading: true,
    refetch: vi.fn(),
  }),
}));

describe("Journey Component", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it("successfully render train info", async () => {
    const date = new Date(2022, 1, 1, 21, 40, 0, 0);
    vi.setSystemTime(date);

    const fromTo = { from: "THA", to: "RDG" };
    const leg = 1;
    const finalDestination = "";

    render(
      <Journey fromTo={fromTo} leg={leg} finalDestination={finalDestination} />
    );

    const heading = screen.getByText("THA → RDG");
    expect(heading).toBeDefined();

    const legNum = screen.getByText("1");
    expect(legNum).toBeDefined();

    const destination = screen.getByText("Swansea");
    expect(destination).toBeDefined();

    const cancelled = screen.getByText("Cancelled");
    expect(cancelled).toBeDefined();

    const time = screen.getByText("20:13");
    expect(time).toBeDefined();

    const platform = screen.getByText("Platform");
    expect(platform).toBeDefined();

    const platform9 = screen.getByText("9");
    expect(platform9).toBeDefined();

    const countDown = screen.getByText("17m");
    expect(countDown).toBeDefined();
  });
});
