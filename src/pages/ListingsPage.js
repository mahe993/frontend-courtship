import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Listing from "../components/Listing";
import NewListingForm from "../forms/NewListingForm";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const ListingsPage = () => {
  const [userCourts, setUserCourts] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getUserCourts();
  }, [openForm]);

  // implement Auth0 to get userId and clear initial userCourts state
  const getUserCourts = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });

      const res = await axios({
        url: `${BACKEND_URL}/courts/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserCourts(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <Box component="h2" m="auto" width="max-content" mt={1}>
        List Your Court
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={10}
        css={css`
          cursor: pointer;
        `}
        onClick={() => setOpenForm(!openForm)}
      >
        {openForm ? (
          <RemoveIcon fontSize="small" color="error" />
        ) : (
          <AddIcon fontSize="small" color="success" />
        )}
        <p>New Listing</p>
      </Box>
      {openForm && (
        <Box>
          <NewListingForm
            setOpenForm={setOpenForm}
            setSnackBarOpen={setSnackBarOpen}
          />
        </Box>
      )}
      <Box mt={2}>
        <Listing listings={userCourts} />
      </Box>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackBarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Succesfully created listing!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ListingsPage;
