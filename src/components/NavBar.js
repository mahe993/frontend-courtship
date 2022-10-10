import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINT } from "../constants";
import TabletNavBar from "./TabletNavBar";
import PhoneNavBar from "./PhoneNavBar";

const NavBar = () => {
  // listen to usercontext, when authkey is received, match to users table to get username/email/avatarurl

  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));

  return phoneMediaQuery ? (
    <PhoneNavBar isLoggedIn={""} avatarUrl={""} />
  ) : (
    <TabletNavBar isLoggedIn={""} avatarUrl={""} />
  );
};

export default NavBar;
