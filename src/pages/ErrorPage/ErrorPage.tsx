import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const errorPageOnClick = () => {
    navigate("/login");
  };
  return (
    <div
      data-testid="error-page"
      className={classes.error}
      onClick={errorPageOnClick}
    >
      Page does not exist. Please click here to be redirected to the login page.
    </div>
  );
};

export default ErrorPage;
