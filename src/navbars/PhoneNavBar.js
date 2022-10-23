import { Avatar, Box, Link, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "../drawers/MenuDrawer";
import BrandLogo from "../components/BrandLogo";

const PhoneNavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
            src="/broken-image.jpg"
            sx={{ width: 30, height: 30 }}
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
