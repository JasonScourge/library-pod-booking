import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
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

test("Renders ErrorPage", async () => {
  render(
    <Router>
      <ErrorPage />
    </Router>
  );

  waitFor(() => {
    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});

test("ErrorPage on click redirects to login page", async () => {
  render(
    <Router>
      <ErrorPage />
    </Router>
  );

  const redirectLink = screen.getByTestId("error-page");
  fireEvent.click(redirectLink);
  waitFor(() => {
    expect(screen.getByTestId("main-login-page")).toBeInTheDocument();
  });
});
