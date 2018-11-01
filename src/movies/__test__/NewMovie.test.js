import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import NewMovie from "../NewMovie";

afterEach(cleanup);

test("<NewMovie>", () => {
  const { debug, getByTestId, container } = render(<NewMovie />);
  expect(getByTestId("page-title").textContent).toBe("New Movie");
  expect(getByTestId("movie-form")).toBeTruthy();

  // Snapshot
  expect(container.firstChild).toMatchSnapshot();

  //debug(); // Outsput html string
});
