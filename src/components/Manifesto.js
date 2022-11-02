import { Box } from "@mui/material";
import React from "react";

const Manifesto = () => {
  return (
    <>
      <h1>Welcome to Courtship™</h1>
      <br />
      <Box width="90%" m="auto" fontSize={14}>
        <Box component="p" fontWeight="bold">
          Tennis lovers' space!
        </Box>
        <hr />
        <Box component="p" textAlign="justify" fontStyle="italic">
          Being an avid tennis player myself, I understand how hard it is to
          find available courts. With this, the goal is to maximise court usage
          around the world, where people who have available courts can rent it
          out to people looking for courts.
          <br />
          <br />
          Taking inspiration from AirBnB, I sincerely hope that all tennis
          lovers will get to play tennis anytime, anywhere. To quote one of my
          favourite players Rafael Nadal, "VAMOS!!!!"
          <br />
          <br />
          Best,
          <br />
          Courtship Creator
          <br />
          &nbsp;
        </Box>
      </Box>
    </>
  );
};

export default Manifesto;
