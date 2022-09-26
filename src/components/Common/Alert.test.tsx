import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Alert from "./Alert";

describe("Test: Alert", () => {
  it("renders error", () => {
    const message = "Component testing is done with react-testing-library";
    const showAlert = true;
    const setShowAlert = vi.fn();
    const type = "Error";

    render(
      <Alert
        message={message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        type={type}
      />
    );

    const element = screen.getByText(
      "Component testing is done with react-testing-library"
    );
    expect(element).toBeDefined();

    const element2 = screen.getByText("Error");
    expect(element2).toBeDefined();

    const button = screen.getByLabelText("close the message");
    fireEvent.click(button);
    expect(setShowAlert).toHaveBeenCalledOnce();
  });

  it("renders notice", () => {
    const message = "Component testing is done with react-testing-library";
    const showAlert = true;
    const setShowAlert = vi.fn();
    const type = "Notice";

    render(
      <Alert
        message={message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        type={type}
      />
    );

    const element = screen.getByText(
      "Component testing is done with react-testing-library"
    );
    expect(element).toBeDefined();

    const element2 = screen.getByText("Notice");
    expect(element2).toBeDefined();
  });
});
