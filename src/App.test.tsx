import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

import App from "./App";

beforeEach(() => {
  vi.resetModules();
});

afterEach(cleanup);

describe("App Component", () => {
  it("should render the welcome message", async () => {
    render(<App />);
    const welcomeMsg = await screen.findByText(
      `Please begin by entering the departure station in the 'from' field.`
    );
    expect(welcomeMsg).toBeDefined();
  });

  it("should render the train info view when the 'from' field is entered", async () => {
    render(<App />);
    const fromField = screen.getByLabelText("from");
    fireEvent.mouseDown(fromField);
    fireEvent.change(fromField, { target: { value: "Reading" } });
    fireEvent.click(screen.getByText("Reading (RDG)"));
    const heading = await screen.findByText("RDG →");
    expect(heading).toBeDefined();
  });

  it("should render the train info view when both the 'from' and 'to' fields are entered", async () => {
    render(<App />);
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
    render(<App />);
    const plusButton = screen.getByLabelText("Add a Change Station");
    fireEvent.click(plusButton);
    const interchange = await screen.findByLabelText("interchange");
    expect(interchange).toBeDefined();
  });

  it("press the return button to reverse the direction", async () => {
    render(<App />);
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
    render(<App />);

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
    render(<App />);

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
});
