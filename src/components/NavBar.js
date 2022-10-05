import React from "react";
import { useMediaQuery } from "@mui/material";
import { breakPoint } from "../constants";
import TabletNavBar from "./TabletNavBar";
import PhoneNavBar from "./PhoneNavBar";

const NavBar = () => {
  const phoneMediaQuery = useMediaQuery(breakPoint.breakpoints.down("tablet"));

  return phoneMediaQuery ? (
    <PhoneNavBar isLoggedIn={""} avatarUrl={""} />
  ) : (
    <TabletNavBar isLoggedIn={""} avatarUrl={""} />
  );
};

export default NavBar;
