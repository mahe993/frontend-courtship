import React from "react";
import { Box } from "@mui/material";
import Manifesto from "../components/Manifesto";

const LandingPage = () => {
  return (
    <Box
      width="75%"
      textAlign="center"
      m="auto"
      mt={10}
      borderRadius="10px"
      bgcolor="rgba(0, 0, 0, 0.4)"
      minWidth="345px"
    >
      <Manifesto />
    </Box>
  );
};

export default LandingPage;
