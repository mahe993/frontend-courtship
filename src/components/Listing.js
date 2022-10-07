import { Box } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Listing = ({ listings }) => {
  return listings ? (
    <Box width="90%" m="auto" display="flex" flexDirection="column" gap={1}>
      {listings.map((listing, index) => (
        <Box
          key={index}
          border={1}
          display="flex"
          gap={2}
          justifyContent="space-between"
          css={css`
            cursor: pointer;
          `}
          onClick={() =>
            console.log("navigate to specific listing (/listings/${listing.id}")
          }
        >
          <Box width={"90px"} height={"60px"}>
            <img
              src="https://picsum.photos/200"
              alt="preview"
              width="90px"
              height="60px"
            />
          </Box>
          <Box component="p" display="flex" alignItems="center">
            {listing}
          </Box>
          <Box component="p" display="flex" alignItems="center" mr={1}>
            {listing}price
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box>You have not listed anything yet!</Box>
  );
};

export default Listing;
