import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINT } from "../constants";
import TabletNavBar from "./TabletNavBar";
import PhoneNavBar from "./PhoneNavBar";
import { useUserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  // listen to usercontext, when authkey is received, match to users table to get username/email/avatarurl
  const { userDetails } = useUserContext();
  const { isAuthenticated } = useAuth0();

  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));

  return phoneMediaQuery ? (
    <PhoneNavBar
      isAuthenticated={isAuthenticated}
      avatarUrl={
        userDetails?.profilePicture?.downloadUrl
          ? userDetails.profilePicture.downloadUrl
          : ""
      }
    />
  ) : (
    <TabletNavBar
      isAuthenticated={isAuthenticated}
      avatarUrl={
        userDetails?.profilePicture?.downloadUrl
          ? userDetails.profilePicture.downloadUrl
          : ""
      }
    />
  );
};

export default NavBar;
