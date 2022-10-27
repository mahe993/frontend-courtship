import { Avatar, Badge, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AccountForm from "../forms/AccountForm";
import WalletTopUpForm from "../forms/WalletTopUpForm";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState("");

  // get userId from auth
  const { user, getAccessTokenSilently } = useAuth0();

  // get user details on mount
  useEffect(() => {
    getUserDetails();
    console.log(userDetails);
  }, []);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const getUserDetails = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const details = await axios({
        url: `${BACKEND_URL}/users/${user.sub}/${user.email}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserDetails(details.data);
    } catch (err) {
      throw new Error(err);
    }
  };

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
        <AccountForm userDetails={userDetails} />
      </Box>
      <Box bgcolor="rgba(0, 0, 0, 0.4)" borderRadius="15px" pt={1} pb={1}>
        <WalletTopUpForm walletBalance={userDetails.wallet} />
      </Box>
    </Box>
  );
};

export default AccountPage;
