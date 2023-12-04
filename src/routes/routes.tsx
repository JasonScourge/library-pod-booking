import LoginPage from "../pages/LoginPage/LoginPage";
import PodBooking from "../pages/PodBooking/PodBooking";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/pod-booking",
    element: <PodBooking />,
  },
  {
    path: "/login",
    element: <Navigate to="/" />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
];

export default routes;
