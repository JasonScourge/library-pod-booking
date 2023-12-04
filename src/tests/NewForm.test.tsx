import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import { Form } from "antd";

import NewFormView from "../components/NewFormView/NewFormView";

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

const NewFormViewWithForm = () => {
  const [form] = Form.useForm();

  return (
    <Router>
      <NewFormView
        isFormOpen={true}
        onFormExit={jest.fn()}
        form={form}
        onFormSubmit={(data) => data}
      />
    </Router>
  );
};

test("Renders NewFormView", async () => {
  render(<NewFormViewWithForm />);

  waitFor(() => {
    expect(screen.getByTestId("drawer-form")).toBeInTheDocument();
  });
});
