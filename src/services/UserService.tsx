import users from "../data/users.json";
import details from "../data/userDetails.json";
import { LoginPayload } from "../types/LoginPageTypes";

/*
  Note: This is just a mock service, there is no actual GET or POST request.
*/
const login = async (loginData: LoginPayload) => {
  const { username, password } = loginData;

  const findingUser: any = users.find(
    (user) => username === user.username && password === user.password
  );

  if (findingUser) {
    const userDetails: any = details;
    const loggedInUsername: string = findingUser.username;
    const loggedInUserDetails: any = userDetails[loggedInUsername];
    return loggedInUserDetails;
  }
  return findingUser;
};

const UserService = {
  login,
};

export default UserService;
