import React from "react";
import { BREAKPOINT } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Booking = ({ bookings }) => {
  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));
  const navigate = useNavigate();

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
        {bookings.map((booking) => (
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
                src={
                  booking.pictureUrl ? booking.pictureUrl[0].downloadUrl : ""
                }
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
                component="p"
                display="flex"
                alignItems="center"
                minWidth="10%"
                fontSize={12}
              >
                Status: {`Upcoming/Expired`}
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
        ))}
      </Box>
    )
  );
};

export default Booking;
