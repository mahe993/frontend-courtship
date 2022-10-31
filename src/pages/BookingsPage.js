import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import Booking from "../components/Booking";
import { useAuth0 } from "@auth0/auth0-react";

const BookingsPage = () => {
  const [userBookings, setUserBookings] = useState();

  //get userId from auth
  const { getAccessTokenSilently, user } = useAuth0();

  // get all bookings by user on mount
  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });

      const res = await axios({
        url: `${BACKEND_URL}/bookings/user${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserBookings(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box mt={1}>
      {userBookings && userBookings.length !== 0 ? (
        <Booking bookings={userBookings} />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.75)"
        >
          You have not booked any courts yet!
        </Box>
      )}
    </Box>
  );
};

export default BookingsPage;
