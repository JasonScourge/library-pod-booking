import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Modal } from "antd";
import { nanoid } from "nanoid";

import classes from "./LoginPage.module.css";
import users from "../../data/users.json";
import { LoginPayload } from "../../types/LoginPageTypes";
import Header from "../../components/Header/Header";
import UserService from "../../services/UserService";
import { useAppDispatch } from "../../app/hooks";
import { writingUserDetails } from "../../redux/userDetailsSlice";

const LoginPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (payload: LoginPayload) => {
    setIsLoading(true);
    const userDetails = await UserService.login(payload);
    if (userDetails) {
      dispatch(writingUserDetails(userDetails));
      setIsLoading(false);
      navigation("/pod-booking");
    } else {
      setHasLoginError(true);
      setIsLoading(false);
    }
  };

  return (
    <div data-testid="main-login-page" className={classes.loginPage}>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <b>Please use any of the following usernames and passwords: </b>
        {users.map((user) => (
          <div key={nanoid()} className={classes.forgotPasswordLogins}>
            <div>{`Username: ${user.username}`} </div>
            <div>{`Password: ${user.password}`}</div>
          </div>
        ))}
      </Modal>
      <Header>Library Portal</Header>
      <Card className={classes.loginCard}>
        <Form name="loginForm" onFinish={onFinish}>
          <div className={classes.userNameField}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  pattern: /^[A-Za-z0-9+_.-]+@(.+)$/,
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
          </div>

          <Form.Item>
            <div
              className={classes.forgotPassword}
              onClick={() => setIsModalOpen(true)}
            >
              Forgot Password
            </div>
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {hasLoginError && (
        <div className={classes.invalidLogin}>Invalid Username/Password</div>
      )}
    </div>
  );
};

export default LoginPage;
