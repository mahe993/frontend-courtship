import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRlogo from "../assets/images/QRcode.png";
import { BACKEND_URL } from "../constants";

const SuccessfulBookingPage = () => {
  const [newestBooking, setNewestBooking] = useState();

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  //get bookingId from router
  const { state } = useLocation();

  //get the booking from bookingId
  useEffect(() => {
    if (state?.bookingId === undefined) {
      //redirect user away here
      navigate("/bookings");
    } else if (state.bookingId) {
      getBooking();
    }
  }, []);

  const getBooking = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      const res = await axios({
        url: `${BACKEND_URL}/bookings/success/${state.bookingId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setNewestBooking(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="96%"
      bgcolor="rgba(0, 0, 0, 0.5)"
      mt={1}
      gap={1}
      p={1}
      m="auto"
    >
      <Box>Booking Successful!</Box>
      {newestBooking && (
        <Box
          width="60%"
          minWidth="min-content"
          bgcolor="white"
          display="flex"
          flexDirection="column"
          color="black"
          p={1}
        >
          <Box
            className="receipt-header"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
          >
            <Box
              display="flex"
              flexDirection="column"
              fontSize={10}
              color="inherit"
              gap={0.5}
              mr="auto"
            >
              <Box display="flex">
                <Box minWidth="70px">Booking ID:</Box>
                <Box>{newestBooking.bookingNumber}</Box>
              </Box>
              <Box display="flex">
                <Box minWidth="70px">Date:</Box>
                <Box>
                  {new Date(newestBooking.date).toString().slice(0, 16)}
                </Box>
              </Box>
              <Box display="flex">
                <Box minWidth="70px">Timeslot:</Box>
                <Box>
                  {newestBooking.timeslot}:00 to {newestBooking.timeslot + 2}:00
                </Box>
              </Box>
              <Box display="flex">
                <Box minWidth="70px">Address:</Box>
                <Box>{newestBooking.address}</Box>
              </Box>
              <Box fontSize={6} fontStyle="italic" fontWeight="bold">
                *Please show this ticket upon arrival/request!
              </Box>
            </Box>
            <img src={QRlogo} alt="qrcode" width="50px" heigh="50px" />
          </Box>
        </Box>
      )}
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={() => navigate("/bookings")}
      >
        View all bookings
      </Button>
    </Box>
  );
};

export default SuccessfulBookingPage;
