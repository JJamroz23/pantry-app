import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { NavigationContainer } from "./navigation-style";

const Navigation = () => {
  return (
    <Fragment>
      <NavigationContainer>Navigation</NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
