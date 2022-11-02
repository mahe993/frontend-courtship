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
          <Box
            width={phoneMediaQuery ? "90px" : "120px"}
            height={phoneMediaQuery ? "60px" : "80px"}
            minWidth={phoneMediaQuery ? "90px" : "120px"}
          >
            <img
              src={listing.pictureUrl ? listing.pictureUrl[0].downloadUrl : ""}
              alt="no pictures"
              width={phoneMediaQuery ? "90px" : "120px"}
              height={phoneMediaQuery ? "60px" : "80px"}
            />
          </Box>
          {!phoneMediaQuery && (
            <Box
              component="p"
              display="flex"
              alignItems="center"
              minWidth="10%"
              fontSize={phoneMediaQuery ? 12 : 14}
            >
              {listing.courtName}
            </Box>
          )}
          <Box
            component="p"
            display="flex"
            alignItems="center"
            minWidth="196px"
            width="550px"
            fontSize={phoneMediaQuery ? 9 : 14}
          >
            {listing.address}
          </Box>
          <Box
            component="p"
            display="flex"
            alignItems="center"
            minWidth="40px"
            width="50px"
            fontSize={phoneMediaQuery ? 8 : 14}
            color="var(--font-color)"
            mr={!phoneMediaQuery && 2}
          >
            ${listing.price}/hr
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb={2}
      fontWeight="bold"
    >
      There is nothing listed yet!
    </Box>
  );
};

export default Listing;
