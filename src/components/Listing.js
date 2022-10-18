import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const Listing = ({ listings }) => {
  const navigate = useNavigate();

  return listings ? (
    <Box width="90%" m="auto" display="flex" flexDirection="column" gap={1}>
      {listings.map((listing) => (
        <Box
          key={listing.id}
          border={1}
          display="flex"
          gap={2}
          justifyContent="space-between"
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate(`/courtyard/court${listing.id}`)}
        >
          <Box width={"90px"} height={"60px"}>
            <img
              src={listing.pictureUrl ? listing.pictureUrl[0].url : ""}
              alt="no pictures"
              width="90px"
              height="60px"
            />
          </Box>
          <Box component="p" display="flex" alignItems="center" minWidth="10%">
            {listing.courtName}
          </Box>
          <Box component="p" display="flex" alignItems="center" minWidth="60%">
            {listing.address}
          </Box>
          <Box
            component="p"
            display="flex"
            alignItems="center"
            mr={1}
            minWidth="5%"
          >
            ${listing.price}/hr
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center">
      You have not listed anything yet!
    </Box>
  );
};

export default Listing;
