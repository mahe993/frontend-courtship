import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, createRatingBalls, getAverageRating } from "../constants";
import { Box, Button, Tooltip } from "@mui/material";
import PictureCarousel from "../components/PictureCarousel";
import { useForm } from "react-hook-form";
import { getHours } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimeSlots from "../components/TimeSlots";
import DateSelector from "../components/DateSelector";
import { useAuth0 } from "@auth0/auth0-react";
import WalletErrorDialog from "../components/WalletErrorDialog";
import { useUserContext } from "../contexts/UserContext";
import ActiveListingSwitch from "../components/ActiveListingSwitch";
import Review from "../components/Review";
import tennisBall from "../assets/images/tennis ball.png";

const CourtPage = () => {
  const [court, setCourt] = useState();
  const [bookings, setBookings] = useState();
  const [currentHour, setCurrentHour] = useState(getHours(new Date()));
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const [openWalletErrorDialog, setOpenWalletErrorDialog] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  //get userId from auth
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  // get user details setter from user context
  const { setUserDetails } = useUserContext();
  const { courtId } = useParams();
  const navigate = useNavigate();
  const { register, getValues, watch, resetField } = useForm({
    delayError: 150,
    mode: "onChange",
  });

  // get court details and all bookings of the court on mount
  useEffect(() => {
    getCourt();
    getCourtBookings();
    getCourtReviews();
  }, []);

  const getCourt = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/courts/courtyard/${courtId}`,
      });
      setCourt(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const getCourtBookings = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/bookings/court${courtId}`,
      });
      setBookings(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const getCourtReviews = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/reviews/courts/${courtId}`,
      });
      setReviews(res.data);
      setAverageRating(getAverageRating(res.data));
    } catch (err) {
      throw new Error(err);
    }
  };

  // internal clock on mount. sets current hour every second
  useEffect(() => {
    const clock = setInterval(() => {
      if (currentHour !== getHours(new Date())) {
        setCurrentHour(getHours(new Date()));
      }
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // submit booking
  const handleBook = async () => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }
    try {
      const accessToken = await getAccessTokenSilently();
      // remove money from account first
      const transaction = await axios({
        method: "PUT",
        url: `${BACKEND_URL}/users/${user.sub}/wallet`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          wallet: -court.price * 2,
        },
      });
      //update userContext with new wallet amount
      setUserDetails(transaction.data);
      // record booking
      const recordBooking = await axios({
        method: "POST",
        url: `${BACKEND_URL}/bookings`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          bookingNumber: `${courtId}-${getValues(
            "bookingDate"
          )}-${selectedTimeslot}`,
          userId: user.sub,
          courtId: courtId,
          timeslot: selectedTimeslot,
          date: getValues("bookingDate"),
        },
      });
      navigate("/bookings/success", {
        state: { bookingId: recordBooking.data.id },
      });
    } catch (err) {
      // only possible error is wallet not enough money
      setOpenWalletErrorDialog(true);
    }
  };

  return (
    court && (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          width="96%"
          m="auto"
          mt={1}
          flexWrap="wrap"
          display="flex"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.5)"
          borderRadius="25px"
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
            className="left-box"
          >
            <Box
              minWidth="90%"
              minHeight="70%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="img-container"
              width="90%"
              mb={1}
            >
              {court.pictureUrl ? (
                <PictureCarousel pictures={court.pictureUrl} />
              ) : (
                "No pictures available"
              )}
            </Box>
            <Tooltip
              disableFocusListener
              title={`average rating: ${averageRating}`}
              followCursor
              placement="top"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minWidth="150px"
              >
                {createRatingBalls(averageRating, tennisBall)}
              </Box>
            </Tooltip>
            <Box fontSize={14}>{court.courtName}</Box>
            <Box fontSize={12}>{court.address}</Box>
            <Box fontSize={14}>${court.price}/hr</Box>
          </Box>
          <Box
            width="50%"
            minWidth="336px"
            height="85vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            className="right-box"
          >
            <Box
              fontStyle="italic"
              whiteSpace={"pre-line"}
              p={1}
              fontSize={15}
              maxWidth="50vw"
            >
              {court.description}
            </Box>
            <Box
              maxWidth="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <DateSelector
                register={register("bookingDate", {
                  required: "This field is required",
                })}
                watchBookingDate={watch("bookingDate")}
                currentHour={currentHour}
                reset={() => resetField("bookingDate")}
                status={court.status}
              />
            </Box>
            <Box
              maxWidth="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              fontSize={15}
              gap={0.5}
            >
              <Box>Select Timeslot</Box>
              <TimeSlots
                currentHour={currentHour}
                setSelectedTimeslot={setSelectedTimeslot}
                selectedTimeslot={selectedTimeslot}
                bookingDate={getValues("bookingDate")}
                bookings={bookings}
                status={court.status}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={0.5}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                fullWidth={false}
                disabled={
                  !getValues("bookingDate") ||
                  !selectedTimeslot ||
                  court.status === "Inactive"
                }
                css={css`
                  :disabled {
                    color: darkgrey;
                  }
                `}
                onClick={handleBook}
              >
                BOOK
              </Button>
              {court.userId === user?.sub && (
                <ActiveListingSwitch court={court} setCourt={setCourt} />
              )}
            </Box>
          </Box>
        </Box>
        <WalletErrorDialog
          openWalletErrorDialog={openWalletErrorDialog}
          setOpenWalletErrorDialog={setOpenWalletErrorDialog}
        />
        <Box mb={2} mt={2}>
          <Review reviews={reviews} />
        </Box>
      </Box>
    )
  );
};

export default CourtPage;
