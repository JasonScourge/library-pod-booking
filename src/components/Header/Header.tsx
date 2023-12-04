import React from "react";
import { Layout } from "antd";
import classes from "./Header.module.css";

const { Header: BaseHeader } = Layout;

const Header: React.FC<{ children: React.ReactNode }> = (props) => {
  return <BaseHeader className={classes.header}>{props.children}</BaseHeader>;
};

export default Header;
