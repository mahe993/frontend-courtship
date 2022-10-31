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
        transformResponse: [
          function (data) {
            const courts = JSON.parse(data);
            const activeArr = [];
            const inactiveArr = [];
            courts.forEach((court) => {
              if (court.status === "Active") {
                activeArr.push(court);
              } else inactiveArr.push(court);
            });
            return { active: activeArr, inactive: inactiveArr };
          },
        ],
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
        <Box
          bgcolor="rgba(0, 0, 0, 0.35)"
          borderRadius="25px"
          p={0.5}
          fontWeight="bold"
        >
          New Listing
        </Box>
      </Box>
      {openForm && (
        <Box mt={1}>
          <NewListingForm
            setOpenForm={setOpenForm}
            setSnackBarOpen={setSnackBarOpen}
          />
        </Box>
      )}
      <Box
        mt={2}
        fontSize={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Box
          bgcolor="rgba(0, 0, 0, 0.75)"
          borderRadius="25px"
          p={0.5}
          minWidth="min-content"
          width="min-content"
          whiteSpace="nowrap"
          color="darkseagreen"
          fontWeight="bold"
        >
          Active Listings
        </Box>
        <Box width="95vw">
          <Listing listings={userCourts?.active} />
        </Box>
        <Box
          bgcolor="rgba(0, 0, 0, 0.75)"
          borderRadius="25px"
          p={0.5}
          minWidth="min-content"
          width="min-content"
          whiteSpace="nowrap"
          color="darkred"
          fontWeight="bold"
        >
          Inactive Listings
        </Box>
        <Box width="95vw">
          <Listing listings={userCourts?.inactive} />
        </Box>
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
