import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { store } from "../app/store";
import { Provider } from "react-redux";

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

test("Renders App and should reach to login page", async () => {
  jest.mock("nanoid", () => {
    return { nanoid: () => Math.random };
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  waitFor(() => {
    expect(screen.getByTestId("main-login-page")).toBeInTheDocument();
  });
});
