import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import classes from "./PodBooking.module.css";
import Header from "../../components/Header/Header";
import NewFormView from "../../components/NewFormView/NewFormView";
import BookingAcknowledgement from "../../components/BookingAcknowledgement/BookingAcknowledgement";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deletingUserDetails, setBookings } from "../../redux/userDetailsSlice";
import alertUser from "../../utils/alertUser";

const PodBooking: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const loginDetails = useAppSelector((state: any) => state.userDetails);
  const bookings = useAppSelector((state: any) => state.userDetails.bookings);

  const logoutUser = useCallback(() => {
    if (dispatch && navigation) {
      dispatch(deletingUserDetails());
      navigation("/login");
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    if (!loginDetails || !loginDetails.loginToken) {
      logoutUser();
    }
  }, [loginDetails, logoutUser]);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const onBookingConfirmationModalExit = () => {
    setIsModalOpen(false);
  };

  const onNewBookingExit = () => {
    setIsFormOpen(false);
    form.resetFields();
  };

  const onNewBookingSubmit = (data: any) => {
    const payload = {
      ...data,
      time: dayjs(data.time).format("h:mm a"),
      date: dayjs(data.date).format("DD MMM YYYY"),
      id: nanoid(),
    };

    // Note: Since there is no actual backend to update the data
    // It will just update the local store instead
    const newBooking = [...loginDetails.bookings];
    newBooking.push(payload);
    dispatch(setBookings(newBooking));

    onNewBookingExit();
    setIsModalOpen(true);
  };

  return (
    <div data-testid="pod-booking-page" className={classes.mainPage}>
      {/* Acknowledgement of a sucessful booking */}
      <Modal
        onCancel={onBookingConfirmationModalExit}
        open={isModalOpen}
        title="Booking Success"
        footer={null}
        width={"50%"}
      >
        {bookings && (
          <BookingAcknowledgement booking={bookings[bookings.length - 1]} />
        )}
      </Modal>

      {/* Booking a Library Pod Form */}
      <NewFormView
        data-testid="booking-form"
        form={form}
        isFormOpen={isFormOpen}
        onFormExit={onNewBookingExit}
        onFormSubmit={onNewBookingSubmit}
      />

      <Header>
        {`Welcome ${loginDetails?.name} to Pod Booking`}
        <div className={classes.logout} onClick={logoutUser}>
          Logout <LogoutOutlined className={classes.logoutIcon} />
        </div>
      </Header>

      <div className={classes.buttonContainer}>
        <Button
          data-testid="book-button"
          onClick={() => setIsFormOpen(true)}
          size={"large"}
        >
          Book a Library Pod
        </Button>
      </div>

      <div className={classes.getStartedMessage}>
        Click on 'Book a Library Pod' to get started.
      </div>
    </div>
  );
};

export default PodBooking;
