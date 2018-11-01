import React from "react";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";

import Movie, { POSTER_PATH } from "../Movie";

afterEach(() => {
  cleanup();

  // clean console error not to be called on the second test
  console.error.mockClear();
});

// Mock console error
console.error = jest.fn();

test("<Movie />", () => {
  render(<Movie />);

  // console error expected to be called
  expect(console.error).toBeCalled();
});

// Fake Data
const movie = {
  id: 1,
  title: "Movie Title",
  poster_path: "movieposter.jg"
};

test("<Movie /> with movie props", () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>
  );

  // console error expected not to be called
  expect(console.error).not.toBeCalled();

  expect(getByTestId("movie-link").getAttribute("href")).toBe(`/${movie.id}`);

  expect(getByTestId("movie-img").src).toBe(
    `${POSTER_PATH}${movie.poster_path}`
  );

  //debug();
});
