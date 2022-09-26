import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

import App from "./App";

beforeEach(() => {
  vi.resetModules();
  render(<App />);
});

afterEach(cleanup);

describe("App Component", () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.3950604,
            longitude: -1.2519843,
          },
        })
      )
    ),
  };
  // @ts-ignore
  navigator.geolocation = mockGeolocation;

  it("should render the welcome message", async () => {
    const welcomeMsg = await screen.findByText(
      `Please begin by entering the departure station in the 'from' field.`
    );
    expect(welcomeMsg).toBeDefined();
  });

  it("should render the train info view when the 'from' field is entered", async () => {
    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));
    const heading = await screen.findByText("RDG →");
    expect(heading).toBeDefined();
  });

  it("should render the train info view when both the 'from' and 'to' fields are entered", async () => {
    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));
    const toField = screen.getByLabelText("to");
    fireEvent.mouseDown(toField);
    fireEvent.change(toField, { target: { value: "London Paddington" } });
    fireEvent.click(screen.getByText("London Paddington (PAD)"));
    const heading = await screen.findByText("RDG → PAD");
    expect(heading).toBeDefined();
  });

  it("interchange station field is seen after pressing the 'plus' button", async () => {
    const plusButton = screen.getByLabelText("Add a Change Station");
    fireEvent.click(plusButton);
    const interchange = await screen.findByLabelText("interchange");
    expect(interchange).toBeDefined();
  });

  it("press the return button to reverse the direction", async () => {
    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));
    const toField = screen.getByLabelText("to");
    fireEvent.mouseDown(toField);
    fireEvent.change(toField, { target: { value: "London Paddington" } });
    fireEvent.click(screen.getByText("London Paddington (PAD)"));
    const heading = await screen.findByText("RDG → PAD");
    expect(heading).toBeDefined();

    const returnButton = screen.getByLabelText("Reverse the station orders");
    fireEvent.click(returnButton);
    const heading2 = await screen.findByText("PAD → RDG");
    expect(heading2).toBeDefined();
  });

  it("can save a route to saved", async () => {
    const savedRoutesButton = screen.queryByText("Saved Routes");
    expect(savedRoutesButton).toBeNull();

    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));
    const toField = screen.getByLabelText("to");
    fireEvent.mouseDown(toField);
    fireEvent.change(toField, { target: { value: "London Paddington" } });
    fireEvent.click(screen.getByText("London Paddington (PAD)"));

    const saveButton = screen.getByLabelText("Add to favorites");
    fireEvent.click(saveButton);
    const savedButton = screen.getByLabelText("Already added");
    expect(savedButton).toBeDefined();
    const savedRoutesButtonCheckAgain =
      screen.getByLabelText("Show saved routes");
    expect(savedRoutesButtonCheckAgain).toBeDefined();

    fireEvent.click(savedRoutesButtonCheckAgain);
    const route = await screen.findAllByText("RDG → PAD");
    expect(route).toHaveLength(2);
  });

  it("can delete a saved route", async () => {
    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, {
      target: { value: "London Paddington" },
    });
    fireEvent.click(screen.getByText("London Paddington (PAD)"));
    const toField = screen.getByLabelText("to");
    fireEvent.mouseDown(toField);
    fireEvent.change(toField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));

    const saveButton = screen.getByLabelText("Add to favorites");
    fireEvent.click(saveButton);
    const savedRoutesButtonCheckAgain =
      screen.getByLabelText("Show saved routes");
    fireEvent.click(savedRoutesButtonCheckAgain);
    const deleteRoute = screen.getAllByLabelText("delete saved route");
    expect(deleteRoute).toHaveLength(2);
    deleteRoute.forEach((route) => fireEvent.click(route));

    const savedRoutesButton = screen.queryByText("Saved Routes");
    expect(savedRoutesButton).toBeNull();
  });

  it("can get the nearest station", async () => {
    const getNearestStationButton = screen.getByLabelText(
      "Find nearest station"
    );
    act(() => {
      fireEvent.click(getNearestStationButton);
    });

    await waitFor(
      () => {
        const fromStation = screen.findByText("Thatcham (THA)");
        expect(fromStation).toBeDefined();
      },
      { timeout: 10000, interval: 1000 }
    );
  });
});
