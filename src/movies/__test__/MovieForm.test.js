import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import MovieForm from "../MovieForm";

afterEach(cleanup);

// Spy Mocking fn
const onSubmit = jest.fn();

test("<MovieForm>", () => {
  const { debug, getByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />
  );
  expect(getByTestId("movie-form")).toBeTruthy();

  // Note Might Not Work
  //getByLabelText("Text").value = "Hello";
  //fireEvent.change(getByLabelText("Text"));

  // Text Input Value
  fireEvent.change(getByLabelText("Text"), {
    target: { value: "Hello" }
  });

  fireEvent.click(getByText("Submit"));

  expect(onSubmit).toHaveBeenCalledTimes(1);

  expect(onSubmit).toHaveBeenCalledWith({
    text: "Hello"
  });

  //debug(); // Outsput html string
});
