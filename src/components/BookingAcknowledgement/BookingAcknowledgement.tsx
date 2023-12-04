import React from "react";

const BookingAcknowledgement: React.FC<{ booking: any }> = ({ booking }) => (
  <div data-testid="booking-acknowledgement">
    <div>{`Name: ${booking.name}`}</div>
    <div>{`NRIC/FIN: ${booking.nric}`}</div>
    <div>{`Pod Number: ${booking.podNumber}`}</div>
    <div>{`Pod Location: ${booking.podLocation}`}</div>
    <div>{`Date of Booking: ${booking.date}`}</div>
    <div>{`Time of Booking: ${booking.time}`}</div>
    <div>{`Duration of Booking: ${booking.duration}`}</div>
  </div>
);

export default BookingAcknowledgement;
