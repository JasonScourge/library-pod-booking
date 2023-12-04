import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import BookingAcknowledgement from "../components/BookingAcknowledgement/BookingAcknowledgement";

test("Renders PodBooking", async () => {
  const mockBooking = {
    date: "12 Dec 2023",
    duration: "1 Hour",
    id: "gNcJvIwYnE2blaGrvosk8",
    name: "Obi Wan Kenobi",
    nric: "S0298967J",
    podLocation: "Magenta Room",
    podNumber: 3,
    time: "3:30 pm",
  };

  render(<BookingAcknowledgement booking={mockBooking} />);

  waitFor(() => {
    expect(screen.getByTestId("booking-acknowledgement")).toBeInTheDocument();
  });
});
