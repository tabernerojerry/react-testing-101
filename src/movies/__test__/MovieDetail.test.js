import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import MovieDetail from "../MovieDetail";

// fake api fetch
global.fetch = require("jest-fetch-mock");

afterEach(cleanup);

// mock params
const match = {
  params: {
    id: 1
  }
};

// mock movie data
const movie = {
  id: 1,
  title: "Movie Title"
};

test("<MovieDetail />", async () => {
  // mock fetch response
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { debug, getByTestId } = render(<MovieDetail match={match} />);

  // wait an element
  await waitForElement(() => getByTestId("movie-title"));

  expect(getByTestId("movie-title").textContent).toBe(movie.title);

  //debug();
});
