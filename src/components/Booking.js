import React, { useEffect, useState } from "react";
import { BACKEND_URL, BREAKPOINT } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getHours, isAfter, lightFormat } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Booking = ({ bookings, setBookingsUpdated, bookingsUpdated }) => {
  const [currentHour, setCurrentHour] = useState(getHours(new Date()));

  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  // internal clock on mount. sets current hour every second
  useEffect(() => {
    const clock = setInterval(() => {
      if (currentHour !== getHours(new Date())) {
        setCurrentHour(getHours(new Date()));
      }
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // hourly check on booking completion
  useEffect(() => {
    if (bookings && bookings?.upcoming?.length !== 0) {
      checkBooking();
    }
  }, [currentHour, bookings]);

  // booking completion check
  const checkBooking = async () => {
    let updated = "no";
    try {
      const updateArr = bookings?.upcoming?.map(async (booking) => {
        // check if booking date is today and current hour is 2 hours past start of booking time or booking date is before today
        if (
          (lightFormat(new Date(), "yyyy-MM-dd") === booking.date &&
            currentHour - booking.timeslot >= 2) ||
          isAfter(new Date(), new Date(booking.date))
        ) {
          try {
            const accessToken = await getAccessTokenSilently();
            const update = await axios({
              method: "PUT",
              url: `${BACKEND_URL}/bookings/${booking.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              data: {
                status: "Completed",
              },
            });
            updated = "yes";
            return update;
          } catch (err) {
            throw new Error(err);
          }
        }
      });
      //pause async
      await Promise.all(updateArr);
      if (updated === "yes") {
        setBookingsUpdated(!bookingsUpdated);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  // abstracting bookings map cb function
  const mapBookings = (booking) => (
    <Box
      key={booking.id}
      border={1}
      display="flex"
      gap={2}
      justifyContent="space-between"
      bgcolor="rgba(0, 0, 0, 0.75)"
      css={css`
        cursor: pointer;
        :hover {
          border-color: darkgreen;
          --font-color: red;
          --upcoming-color: red;
          --completed-color: green;
        }
      `}
      onClick={() => {
        navigate("/bookings/success", {
          state: { bookingId: booking.id },
        });
      }}
    >
      <Box width={"90px"} height={"60px"} minWidth="90px">
        <img
          src={booking.pictureUrl ? booking.pictureUrl[0].downloadUrl : ""}
          alt="no pictures"
          width="90px"
          height="60px"
        />
      </Box>
      {!phoneMediaQuery && (
        <Box
          component="p"
          display="flex"
          alignItems="center"
          minWidth="10%"
          fontSize={12}
        >
          ID: {booking.bookingNumber}
        </Box>
      )}
      <Box
        component="p"
        display="flex"
        alignItems="center"
        minWidth="110px"
        width="140px"
        fontSize={phoneMediaQuery ? 10 : 12}
      >
        Date: {new Date(booking.date).toString().slice(0, 16)}
      </Box>
      {!phoneMediaQuery && (
        <Box
          fontStyle="italic"
          component="p"
          display="flex"
          alignItems="center"
          minWidth="10%"
          fontSize={12}
          color={
            booking.status === "Upcoming"
              ? "var(--upcoming-color)"
              : "var(--completed-color)"
          }
        >
          {booking.status}
        </Box>
      )}
      <Box
        component="p"
        display="flex"
        alignItems="center"
        minWidth="60px"
        width="70px"
        fontSize={phoneMediaQuery ? 10 : 12}
        color="var(--font-color)"
        pr={0.5}
      >
        Time: {booking.timeslot}:00
      </Box>
    </Box>
  );

  return (
    bookings && (
      <Box
        width="100%"
        m="auto"
        display="flex"
        flexDirection="column"
        gap={1}
        minWidth="95%"
      >
        {bookings.upcoming.map(mapBookings)}
        {bookings.completed.map(mapBookings)}
      </Box>
    )
  );
};

export default Booking;
