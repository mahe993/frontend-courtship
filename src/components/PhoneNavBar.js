import { Avatar, Box, Link, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "../drawers/MenuDrawer";

const PhoneNavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      maxWidth={"100vw"}
      width="100vw"
      height={"15vh"}
      bgcolor={theme.palette.success.main}
      display="flex"
      justifyContent="space-between"
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
      <Box mr={1} alignItems="center" display="flex">
        <MenuDrawer />
      </Box>
    </Box>
  );
};

export default PhoneNavBar;
