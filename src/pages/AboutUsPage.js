import { Box } from "@mui/material";
import React from "react";
import Manifesto from "../components/Manifesto";

const AboutUsPage = () => {
  return (
    <>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
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
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <h1>Location</h1>
        <br />
        <Box width="90%" m="auto">
          <Box component="p" textAlign="justify" fontStyle="italic">
            I could create a legitimate looking location with a map image and
            all but I can't seem to part with the time needed to do so :(
            <br />
            &nbsp;
          </Box>
        </Box>
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <h1>Team</h1>
        <br />
        <Box width="90%" m="auto">
          <Box component="p" textAlign="justify" fontStyle="italic">
            I could also put up random stock photos of humans pretending they
            are my C-suite but then again...
            <br />
            &nbsp;
          </Box>
        </Box>
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <h1>Socials</h1>
        <br />
        <Box width="90%" m="auto">
          <Box component="p" textAlign="justify" fontStyle="italic">
            you get the point
            <br />
            &nbsp;
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
