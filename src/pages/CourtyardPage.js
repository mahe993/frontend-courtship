import React, { useEffect, useState } from "react";
import Listing from "../components/Listing.js";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const CourtyardPage = () => {
  const [allCourts, setAllCourts] = useState();
  const { courtId } = useParams();

  useEffect(() => {
    console.log(courtId);
    // getAllCourts();
  }, []);

  const getAllCourts = async () => {
    const courts = await axios.get(
      `${BACKEND_URL}/courts/courtyard/${courtId}`
    );
    console.log(courts.data);
    setAllCourts(courts.data);
  };

  return (
    <Box mt={1}>
      <Listing listings={allCourts} />
    </Box>
  );
};

export default CourtyardPage;
