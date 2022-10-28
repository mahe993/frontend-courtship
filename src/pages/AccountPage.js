import { Alert, Avatar, Badge, Box, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AccountForm from "../forms/AccountForm";
import WalletTopUpForm from "../forms/WalletTopUpForm";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useUserContext } from "../contexts/UserContext";

const AccountPage = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // get user details from user context
  const { userDetails, setUserDetails } = useUserContext();

  // get userId from auth
  const { user, getAccessTokenSilently, logout } = useAuth0();

  // change profile pic
  const handleProfilePic = async (e) => {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    try {
      const accessToken = await getAccessTokenSilently();
      const postProfilePic = await axios({
        method: "POST",
        url: `${BACKEND_URL}/firebase/${user.sub}/profilepic`,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: formData,
      });
      setUserDetails(postProfilePic.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
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
          badgeContent={
            <label
              htmlFor="contained-button-file"
              css={css`
                cursor: pointer;
              `}
            >
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                css={css`
                  display: none;
                `}
                onChange={handleProfilePic}
              />
              <EditIcon fontSize="large" />
            </label>
          }
        >
          <Avatar
            alt="profile"
            src={
              userDetails?.profilePicture?.downloadUrl
                ? userDetails.profilePicture.downloadUrl
                : ""
            }
            sx={{ width: "150px", height: "150px" }}
          />
        </Badge>
        <Box bgcolor="rgba(0, 0, 0, 0.4)" borderRadius="15px" pt={1} pb={1}>
          <AccountForm
            setSnackBarOpen={setSnackBarOpen}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Box bgcolor="rgba(0, 0, 0, 0.4)" borderRadius="15px" pt={1} pb={1}>
          <WalletTopUpForm
            setSnackBarOpen={setSnackBarOpen}
            setAlertMessage={setAlertMessage}
          />
        </Box>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </Button>
      </Box>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackBarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountPage;
