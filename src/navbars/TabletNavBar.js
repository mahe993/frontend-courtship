import React from "react";
import { Avatar, Box, useTheme, Link } from "@mui/material";
import { NAV_ITEMS } from "../constants";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BrandLogo from "../components/BrandLogo";

const TabletNavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      maxWidth={"100vw"}
      width="100%"
      height={"10vh"}
      bgcolor={theme.palette.success.dark}
      display="flex"
      fontSize={10}
      justifyContent="space-between"
    >
      <Box display="flex" gap={1} maxWidth="33%" height="inherit">
        <Box display="flex" alignItems="center" ml={1}>
          <Avatar
            src="/broken-image.jpg"
            sx={{ width: 30, height: 30 }}
            alt="username"
          />
        </Box>
        <Box display="flex" alignItems="center">
          {"!userSignedIn" ? (
            <Link
              component="button"
              variant="subtitle2"
              color="inherit"
              onClick={() => navigate("/login")}
              fontSize="inherit"
            >
              Login/Signup
            </Link>
          ) : (
            "username"
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        gap={3}
        alignItems="center"
        maxWidth="50%"
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
              min-width: 65px;
            `}
          >
            {item.name}
          </Link>
        ))}
      </Box>
      <Box display="flex" alignItems="center" mr={1}>
        <BrandLogo />
      </Box>
    </Box>
  );
};

export default TabletNavBar;
