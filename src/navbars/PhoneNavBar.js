import { Avatar, Box, Link, useTheme } from "@mui/material";
import React from "react";
import MenuDrawer from "../drawers/MenuDrawer";
import BrandLogo from "../components/BrandLogo";
import { useUserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const PhoneNavBar = ({ isAuthenticated, avatarUrl }) => {
  const theme = useTheme();
  const { userDetails } = useUserContext();
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      maxWidth={"100vw"}
      width="100%"
      height={"10vh"}
      bgcolor={theme.palette.success.dark}
      display="flex"
      justifyContent="space-between"
      fontSize={10}
      minWidth="360px"
    >
      <Box display="flex" gap={1} maxWidth="33%" height="inherit">
        <Box display="flex" alignItems="center" ml={1}>
          <Avatar
            src={avatarUrl}
            sx={{ width: 30, height: 30 }}
            alt="username"
          />
        </Box>
        <Box display="flex" alignItems="center">
          {!isAuthenticated ? (
            <Link
              component="button"
              variant="overline"
              color="inherit"
              onClick={() => loginWithRedirect()}
              fontSize="inherit"
            >
              Login/Signup
            </Link>
          ) : (
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center">
                {userDetails &&
                  (userDetails?.username
                    ? userDetails.username
                    : userDetails.email)}
              </Box>
              <Box display="flex" justifyContent="center">
                {userDetails && `$${userDetails.wallet}`}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        position="relative"
        left="-20px"
        height="inherit"
      >
        <BrandLogo />
      </Box>
      <Box mr={1} alignItems="center" display="flex">
        <MenuDrawer />
      </Box>
    </Box>
  );
};

export default PhoneNavBar;
