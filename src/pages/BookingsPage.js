import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import Booking from "../components/Booking";

const BookingsPage = () => {
  const [userBookings, setUserBookings] = useState();

  //get userId from auth
  const userId = 2;

  // get all bookings by user on mount
  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/bookings/user${userId}`,
      });
      setUserBookings(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box mt={1}>
      <Booking bookings={userBookings} />;
    </Box>
  );
};

export default BookingsPage;
