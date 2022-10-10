import { Avatar, Badge, Box } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AccountForm from "../forms/AccountForm";
import WalletTopUpForm from "../forms/WalletTopUpForm";

const AccountPage = () => {
  //listen to userContext. if authkey received, get profile pic

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={2}
      gap={2}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<EditIcon fontSize="large" />}
      >
        <Avatar
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
          sx={{ width: "150px", height: "150px" }}
        />
      </Badge>
      <Box bgcolor="rgba(0, 0, 0, 0.4)" borderRadius="15px" pt={1} pb={1}>
        <AccountForm />
      </Box>
      <Box bgcolor="rgba(0, 0, 0, 0.4)" borderRadius="15px" pt={1} pb={1}>
        <WalletTopUpForm />
      </Box>
    </Box>
  );
};

export default AccountPage;
