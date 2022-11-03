import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRlogo from "../assets/images/QRcode.png";
import { BACKEND_URL } from "../constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CourtReviewForm from "../forms/CourtReviewForm";
import Review from "../components/Review";

const SuccessfulBookingPage = () => {
  const [newestBooking, setNewestBooking] = useState();
  const [review, setReview] = useState([]);
  const [openForm, setOpenForm] = useState();

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  //get bookingId from router
  const { state } = useLocation();

  //get the booking from bookingId
  useEffect(() => {
    if (state?.booking?.id === undefined) {
      //redirect user away here
      navigate("/bookings");
    } else if (state?.booking?.id) {
      getBooking();
      //check if booking status === completed, getReview
      if (state.booking.status === "Completed") {
        getReview();
      }
    }
  }, []);

  const getBooking = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      const booking = await axios({
        url: `${BACKEND_URL}/bookings/${state.booking.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setNewestBooking(booking.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const getReview = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const review = await axios({
        url: `${BACKEND_URL}/reviews/bookings/${state.booking.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setReview([review.data]);
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
      <Box fontSize={30}>Booking Successful!</Box>
      {newestBooking && (
        <Box
          width="90vmin"
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
              fontSize={16}
              color="inherit"
              gap={0.5}
              mr="auto"
            >
              <Box display="flex" gap={0.5}>
                <Box minWidth="90px">Booking ID:</Box>
                <Box fontSize={14} display="flex" alignItems="center">
                  {newestBooking.bookingNumber}
                </Box>
              </Box>
              <Box display="flex" gap={0.5}>
                <Box minWidth="90px">Date:</Box>
                <Box fontSize={14} display="flex" alignItems="center">
                  {new Date(newestBooking.date).toString().slice(0, 16)}
                </Box>
              </Box>
              <Box display="flex" gap={0.5}>
                <Box minWidth="90px">Timeslot:</Box>
                <Box fontSize={14} display="flex" alignItems="center">
                  {newestBooking.timeslot}:00 to {newestBooking.timeslot + 2}:00
                </Box>
              </Box>
              <Box display="flex" gap={0.5}>
                <Box minWidth="90px">Address:</Box>
                <Box fontSize={14} display="flex" alignItems="center">
                  {newestBooking.address}
                </Box>
              </Box>
              <Box fontSize={12} fontStyle="italic" fontWeight="bold">
                *Please show this ticket upon arrival/request!
              </Box>
            </Box>
            <img src={QRlogo} alt="qrcode" width="100px" heigh="100px" />
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
      {newestBooking?.status === "Completed" &&
        (review.length === 0 || review[0] === null ? (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            fontSize={14}
            css={css`
              cursor: pointer;
            `}
            onClick={() => setOpenForm(!openForm)}
          >
            {openForm ? (
              <RemoveIcon color="error" />
            ) : (
              <AddIcon color="success" />
            )}
            <Box
              bgcolor="rgba(0, 0, 0, 0.35)"
              borderRadius="25px"
              p={1}
              fontWeight="bold"
            >
              Review Court
            </Box>
          </Box>
        ) : (
          <Box>
            <Review reviews={review} />
          </Box>
        ))}
      {openForm && (
        <Box>
          <CourtReviewForm
            setOpenForm={setOpenForm}
            setReview={setReview}
            booking={state?.booking}
          />
        </Box>
      )}
    </Box>
  );
};

export default SuccessfulBookingPage;
