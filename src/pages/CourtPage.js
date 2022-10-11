import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Box, Button } from "@mui/material";

const CourtPage = () => {
  const [court, setCourt] = useState();

  const params = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   getCourt();
  // }, []);

  const getCourt = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/courtyard/court${params.courtId}`,
      });
      setCourt(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box
      width="96%"
      m="auto"
      flexWrap="wrap"
      display="flex"
      justifyContent="center"
    >
      <Box
        width="50%"
        minWidth="336px"
        height="85vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
        className="left-side"
      >
        <Box
          width="90%"
          height="70%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="img-container"
          mb={1}
        >
          <img
            src="courtpicture"
            alt="courtname"
            maxWidth="100%"
            maxHeight="100%"
          />
        </Box>
        <Box>{`courtname`}</Box>
        <Box>{`court descrip`}</Box>
        <Box>{`court price per hr`}</Box>
      </Box>
      <Box
        width="50%"
        minWidth="336px"
        height="85vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
        className="right-side"
      >
        <Box maxWidth="100%">{`date picker`}</Box>
        <Box maxWidth="100%">{`timeslots`}</Box>
        <Box>
          <Button variant="contained" color="success">
            BOOK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CourtPage;
