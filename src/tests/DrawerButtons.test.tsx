import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import DrawerButtons from "../components/DrawerButtons/DrawerButtons";

test("Renders DrawerButtons", async () => {
  render(<DrawerButtons onCancelClick={jest.fn} onSubmitClick={jest.fn} />);

  waitFor(() => {
    expect(screen.getByTestId("drawer-buttons")).toBeInTheDocument();
  });
});
