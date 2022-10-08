import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Listing from "../components/Listing";
import NewListingForm from "../forms/NewListingForm";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const ListingsPage = () => {
  const [userListings, setUserListings] = useState(["a", "b", "c", "d"]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    // getUserListings();
  }, []);

  // implement Auth0 to get userId and clear initial userListings state
  // const getUserListings = async () => {
  //   try {
  //     const res = await axios({
  //       url: `${BACKEND_URL}/listings/${userId}`,
  //     });
  //     setUserListings(res.data);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

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
          <NewListingForm />
        </Box>
      )}
      <Box mt={2}>
        <Listing listings={userListings} />
      </Box>
    </>
  );
};

export default ListingsPage;
