import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PodBooking from "../pages/PodBooking/PodBooking";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";

beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
});

test("Renders PodBooking", async () => {
  jest.mock("nanoid", () => {
    return { nanoid: () => Math.random };
  });

  render(
    <Provider store={store}>
      <Router>
        <PodBooking />
      </Router>
    </Provider>
  );

  waitFor(() => {
    expect(screen.getByTestId("pod-booking-page")).toBeInTheDocument();
  });
});

test("Test PodBooking Form", async () => {
  jest.mock("nanoid", () => {
    return { nanoid: () => Math.random };
  });

  render(
    <Provider store={store}>
      <Router>
        <PodBooking />
      </Router>
    </Provider>
  );

  const createBooking = screen.getByTestId("book-button");
  fireEvent.click(createBooking);

  waitFor(() => {
    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
  });

  const pickDate = screen.getByTestId("form-date-picker");
  fireEvent.click(pickDate);
  const pickTime = screen.getByTestId("form-time-picker");
  fireEvent.click(pickTime);
  const submit = screen.getByTestId("drawer-submit");
  fireEvent.click(submit);

  waitFor(() => {
    expect(screen.getByTestId("pod-booking-page")).toBeInTheDocument();
  });
});
