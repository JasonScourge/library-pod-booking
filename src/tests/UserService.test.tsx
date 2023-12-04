import UserService from "../services/UserService";
import { LoginPayload } from "../types/LoginPageTypes";

test("Test LoginService Sucess", async () => {
  const payload: LoginPayload = {
    username: "luke.skywalker@resistence.com",
    password: "qwe",
  };

  let element = UserService.login(payload);
  expect(element).toBeTruthy;
});

test("Test LoginService Fail", async () => {
  const payload: LoginPayload = {
    username: "skywalker@resistence.com",
    password: "qweasd",
  };

  let element = UserService.login(payload);
  expect(element).toBeFalsy;
});
