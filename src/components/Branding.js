import { Box } from "@mui/material";
import React from "react";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Branding = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <SportsTennisIcon fontSize="large" />
      </Box>
      <Box
        bgcolor={"purple"}
        borderRadius="25px"
        width="50px"
        textAlign="center"
        height="15px"
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

export default Branding;
