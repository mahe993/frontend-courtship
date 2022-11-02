import React, { useEffect, useState } from "react";
import Listing from "../components/Listing.js";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import { Box } from "@mui/material";

const CourtyardPage = () => {
  const [allCourts, setAllCourts] = useState();

  useEffect(() => {
    getAllCourts();
  }, []);

  const getAllCourts = async () => {
    const courts = await axios.get(`${BACKEND_URL}/courts`);
    setAllCourts(courts.data);
  };

  return (
    <Box mt={1} width="95vw" mr="auto" ml="auto">
      <Listing listings={allCourts} />
    </Box>
  );
};

export default CourtyardPage;
