import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Listing from "../components/Listing";
import NewListingForm from "../forms/NewListingForm";

const ListingsPage = () => {
  const [userListings, setUserListings] = useState(["a", "b", "c", "d"]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    console.log("get all listings where userId = * and set to state");
  }, []);

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
