import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement } from "react-testing-library";

import MoviesList from "../MoviesList";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  success: true,
  results: [
    {
      id: 1,
      title: "Movie Title",
      poster_path: "movieposter.jpg"
    },
    {
      id: 2,
      title: "Movie Title 2",
      poster_path: "movieposter2.jpg"
    }
  ]
};

const movie = movies.results[0];

test("<MoviesList />", async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { debug, getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // check loading is there
  expect(getByTestId("loading")).toBeTruthy();

  // wait for element
  await waitForElement(() => getByTestId("movie-link"));

  // use queryByTestId if your not sure that the element is there
  // once data is there loading is gone
  expect(queryByTestId("loading")).toBeFalsy();

  // check element link is there
  expect(getByTestId("movie-link").getAttribute("href")).toBe(`/${movie.id}`);

  // check data length is equal
  expect(getAllByTestId("movie-link").length).toBe(movies.results.length);

  //debug();
});

test("<MoviesList /> api fails", async () => {
  movies.success = false;

  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // check loading is there
  expect(getByTestId("loading")).toBeTruthy();
});
