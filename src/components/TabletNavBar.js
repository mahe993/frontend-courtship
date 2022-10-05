import React from "react";
import { Avatar, Box, useTheme, Link } from "@mui/material";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const TabletNavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      maxWidth={"100vw"}
      width="100vw"
      height={"15vh"}
      bgcolor={theme.palette.success.main}
      display="flex"
    >
      <Box display="flex" gap={1} maxWidth="33%" height="inherit">
        <Box display="flex" alignItems="center" ml={1}>
          <Avatar
            src="/broken-image.jpg"
            sx={{ width: 50, height: 50 }}
            alt="username"
          />
        </Box>
        <Box display="flex" alignItems="center">
          {"!userSignedIn" ? (
            <Link
              component="button"
              variant="overline"
              color="inherit"
              onClick={() => navigate("/login")}
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
        {navItems.map((item) => (
          <Link
            component="button"
            key={item.name}
            variant="overline"
            color="inherit"
            underline="hover"
            onClick={() => navigate(item.path)}
            css={css`
              min-width: 65px;
            `}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default TabletNavBar;
