import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import Booking from "../components/Booking";
import { useAuth0 } from "@auth0/auth0-react";

const BookingsPage = () => {
  const [userBookings, setUserBookings] = useState();
  const [bookingsUpdated, setBookingsUpdated] = useState(false);

  //get userId from auth
  const { getAccessTokenSilently, user } = useAuth0();

  // get all bookings by user on mount and everytime upcoming booking moves to completed
  useEffect(() => {
    getUserBookings();
  }, [bookingsUpdated]);

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
        transformResponse: [
          function (data) {
            const bookings = JSON.parse(data);
            const upcomingArr = [];
            const completedArr = [];
            bookings.forEach((booking) => {
              if (booking.status === "Upcoming") {
                upcomingArr.push(booking);
              } else completedArr.push(booking);
            });
            return { upcoming: upcomingArr, completed: completedArr };
          },
        ],
      });
      setUserBookings(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box mt={1}>
      {userBookings?.upcoming?.length !== 0 ||
      userBookings?.completed?.length !== 0 ? (
        <Box width="95vw" m="auto">
          <Booking
            bookings={userBookings}
            setBookingsUpdated={setBookingsUpdated}
            bookingsUpdated={bookingsUpdated}
          />
        </Box>
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
