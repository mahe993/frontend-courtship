import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BREAKPOINT } from "../constants";

const BrandLogo = () => {
  const navigate = useNavigate();
  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));

  return (
    <>
      <Box>
        <SportsTennisIcon fontSize="large" />
      </Box>
      <Box
        bgcolor={"purple"}
        borderRadius="25px"
        width={phoneMediaQuery ? "55px" : "80px"}
        textAlign="center"
        height={phoneMediaQuery ? "15px" : "20px"}
        onClick={() => navigate("/")}
        css={css`
          cursor: pointer;
        `}
      >
        Courtship
      </Box>
    </>
  );
};

export default BrandLogo;
