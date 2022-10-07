import React from "react";
import { Box } from "@mui/material";
import Manifesto from "../components/Manifesto";
import CourtshipRules from "../components/CourtshipRules";

const LandingPage = () => {
  return (
    <>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={1}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <Manifesto />
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={1}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <CourtshipRules />
      </Box>
    </>
  );
};

export default LandingPage;
