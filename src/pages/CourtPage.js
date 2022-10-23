import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Box, Button } from "@mui/material";
import PictureCarousel from "../components/PictureCarousel";
import { useForm } from "react-hook-form";
import { getHours } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimeSlots from "../components/TimeSlots";
import DateSelector from "../components/DateSelector";

const CourtPage = () => {
  const [court, setCourt] = useState();
  const [bookings, setBookings] = useState();
  const [currentHour, setCurrentHour] = useState(getHours(new Date()));
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const [error, setError] = useState(false);

  //get userId from auth
  const userId = 2;
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

  // internal clock on mount. sets current hour every second
  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentHour(getHours(new Date()));
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  //submit booking
  const handleBook = async () => {
    console.log(`${courtId}-${getValues("bookingDate")}-${selectedTimeslot}`);
    try {
      const req = await axios({
        method: "POST",
        url: `${BACKEND_URL}/bookings`,
        data: {
          bookingNumber: `${courtId}-${getValues(
            "bookingDate"
          )}-${selectedTimeslot}`,
          userId: userId,
          courtId: courtId,
          timeslot: selectedTimeslot,
          date: getValues("bookingDate"),
        },
      });
      navigate("/bookings/success", { state: { bookingId: req.data.id } });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    court && (
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
          <Box fontSize={12}>{court.courtName}</Box>
          <Box fontSize={10}>{court.address}</Box>
          <Box fontSize={12}>${court.price}/hr</Box>
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
          <Box fontStyle="italic" whiteSpace={"pre-line"} p={1.5} fontSize={12}>
            {court.description}
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            fontSize={12}
          >
            <DateSelector
              register={register("bookingDate", {
                required: "This field is required",
              })}
              watchBookingDate={watch("bookingDate")}
              currentHour={currentHour}
              reset={() => resetField("bookingDate")}
            />
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            fontSize={12}
            gap={0.5}
          >
            <Box>Select Timeslot</Box>
            <TimeSlots
              currentHour={currentHour}
              setSelectedTimeslot={setSelectedTimeslot}
              selectedTimeslot={selectedTimeslot}
              bookingDate={getValues("bookingDate")}
              bookings={bookings}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            {error && (
              <Box color="red" fontSize={6} fontStyle="italic">
                Please select a valid date and time for your booking!
              </Box>
            )}
            <Button
              variant="contained"
              color="success"
              size="small"
              fullWidth={false}
              disabled={!getValues("bookingDate") || !selectedTimeslot || error}
              css={css`
                :disabled {
                  color: darkgrey;
                }
              `}
              onClick={handleBook}
            >
              BOOK
            </Button>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default CourtPage;
