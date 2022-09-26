import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Test: Button", () => {
  it("renders the button", () => {
    const clickHandler = vi.fn();
    const children = "children";
    const customStyle = "";
    const ariaLabel = "test label";
    const label = "test";
    const arrow = "arrow";

    render(
      <Button
        clickHandler={clickHandler}
        children={children}
        customStyle={customStyle}
        ariaLabel={ariaLabel}
        label={label}
        arrow={arrow}
      />
    );

    const element1 = screen.getByText("children");
    expect(element1).toBeDefined();

    const element2 = screen.getByLabelText("test label");
    expect(element2).toBeDefined();
    fireEvent.click(element2);
    expect(clickHandler).toHaveBeenCalledOnce();

    const element3 = screen.getByText("test");
    expect(element3).toBeDefined();

    const element4 = screen.getByText("arrow");
    expect(element4).toBeDefined();
  });
});
