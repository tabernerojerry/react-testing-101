import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Counter from "./Counter";

afterEach(cleanup);

test("<Counter />", () => {
  // Renders Component
  const { debug, getByTestId } = render(<Counter />);

  // Outsput DOM as String
  //   debug();

  const counterButton = getByTestId("counter-button");
  // Assertse counter-button is a button
  expect(counterButton.tagName).toBe("BUTTON");

  // Asserts counter-button starts at 0
  expect(counterButton.textContent).toBe("0");

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe("1");

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe("2");

  //   debug(); // Outsput DOM as string
});
