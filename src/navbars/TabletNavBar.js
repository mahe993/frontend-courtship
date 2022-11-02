import React from "react";
import { Avatar, Box, useTheme, Link } from "@mui/material";
import { NAV_ITEMS } from "../constants";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BrandLogo from "../components/BrandLogo";
import { useUserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const TabletNavBar = ({ isAuthenticated, avatarUrl }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userDetails } = useUserContext();
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      maxWidth={"100vw"}
      width="100%"
      height={"10vh"}
      bgcolor={theme.palette.success.dark}
      display="flex"
      fontSize={14}
      justifyContent="space-between"
    >
      <Box display="flex" gap={1} maxWidth="33%" height="inherit">
        <Box display="flex" alignItems="center" ml={2}>
          <Avatar
            src={avatarUrl}
            sx={{ width: 60, height: 60 }}
            alt="profilepic"
          />
        </Box>
        <Box display="flex" alignItems="center">
          {!isAuthenticated ? (
            <Link
              component="button"
              variant="subtitle2"
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
        gap={3}
        alignItems="center"
        maxWidth="65%"
        left="50%"
        position="absolute"
        height="inherit"
        css={css`
          transform: translate(-50%);
        `}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            component="button"
            key={item.name}
            variant="overline"
            color="inherit"
            underline="hover"
            onClick={() => navigate(item.path)}
            fontSize="inherit"
            css={css`
              min-width: min-content;
              white-space: nowrap;
            `}
          >
            {item.name}
          </Link>
        ))}
      </Box>
      <Box display="flex" alignItems="center" mr={3}>
        <BrandLogo />
      </Box>
    </Box>
  );
};

export default TabletNavBar;
