import { Box, useMediaQuery } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { BREAKPOINT } from "../constants";

const Listing = ({ listings }) => {
  const navigate = useNavigate();
  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));

  return listings && listings.length !== 0 ? (
    <Box
      width="100%"
      m="auto"
      display="flex"
      flexDirection="column"
      gap={1}
      minWidth="95%"
    >
      {listings.map((listing) => (
        <Box
          key={listing.id}
          border={1}
          display="flex"
          gap={0.5}
          justifyContent="space-between"
          bgcolor="rgba(0, 0, 0, 0.75)"
          css={css`
            cursor: pointer;
            :hover {
              border-color: darkgreen;
              --font-color: red;
            }
          `}
          onClick={() => navigate(`/courtyard/court${listing.id}`)}
        >
          <Box width={"90px"} height={"60px"} minWidth="90px">
            <img
              src={listing.pictureUrl ? listing.pictureUrl[0].downloadUrl : ""}
              alt="no pictures"
              width="90px"
              height="60px"
            />
          </Box>
          {!phoneMediaQuery && (
            <Box
              component="p"
              display="flex"
              alignItems="center"
              minWidth="10%"
              fontSize={12}
            >
              {listing.courtName}
            </Box>
          )}
          <Box
            component="p"
            display="flex"
            alignItems="center"
            minWidth="196px"
            width="357px"
            fontSize={phoneMediaQuery ? 9 : 12}
          >
            {listing.address}
          </Box>
          <Box
            component="p"
            display="flex"
            alignItems="center"
            minWidth="40px"
            width="50px"
            fontSize={phoneMediaQuery ? 8 : 12}
            color="var(--font-color)"
          >
            ${listing.price}/hr
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
      There is nothing listed yet!
    </Box>
  );
};

export default Listing;
