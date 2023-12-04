import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage/LoginPage";
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

test("Renders LoginPage", async () => {
  jest.mock("nanoid", () => {
    return { nanoid: () => Math.random };
  });

  render(
    <Provider store={store}>
      <Router>
        <LoginPage />
      </Router>
    </Provider>
  );

  waitFor(() => {
    expect(screen.getByTestId("main-login-page")).toBeInTheDocument();
  });
});
