import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Box, Button } from "@mui/material";
import PictureCarousel from "../components/PictureCarousel";
import { useForm } from "react-hook-form";
import { addDays, getHours, lightFormat } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimeSlots from "../components/TimeSlots";

const CourtPage = () => {
  const [court, setCourt] = useState();
  const [bookings, setBookings] = useState();
  const [now, setNow] = useState(new Date());
  const [minDate, setMinDate] = useState(lightFormat(new Date(), "yyyy-MM-dd"));
  const [maxDate, setMaxDate] = useState(
    lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd")
  );
  const [minTimeslot, setMinTimeslot] = useState(0);
  const [stringDate, setStringDate] = useState();
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const [error, setError] = useState(false);

  const { courtId } = useParams();
  const navigate = useNavigate();
  const { register, getValues, watch, reset } = useForm({
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

  // internal clock on mount
  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  // recheck date validity based on clock
  useEffect(() => {
    if (getHours(now) > 19) {
      return setMinDate(lightFormat(addDays(now, 1), "yyyy-MM-dd"));
    }
    setMinDate(lightFormat(now, "yyyy-MM-dd"));
  }, [now]);

  // when min date changes, max date changes
  useEffect(() => {
    setMaxDate(lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd"));
  }, [minDate]);

  // recheck timeslot validity based on clock
  useEffect(() => {
    if (getHours(now) > 9) {
      return setMinTimeslot(getHours(now));
    }
  }, [now]);

  // when user selects booking date. show the date in string format
  useEffect(() => {
    if (getValues("bookingDate")) {
      setStringDate(new Date(getValues("bookingDate")).toString().slice(0, 16));
    }
  }, [watch("bookingDate")]);

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
          <Box p={1} fontSize={12}>
            {court.courtName}
          </Box>
          <Box p={1} fontSize={12}>
            ${court.price}/hr
          </Box>
        </Box>
        <Box
          width="50%"
          minWidth="336px"
          height="85vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1.5}
          className="right-box"
        >
          <Box fontStyle="italic" whiteSpace={"pre-line"} p={1} fontSize={12}>
            {court.description}
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={2}
            fontSize={12}
          >
            <label htmlFor="bookingDate">Select Date</label>
            <input
              type="date"
              id="bookingDate"
              {...register("bookingDate", {
                required: "This field is required",
              })}
              min={minDate}
              max={maxDate}
              css={css`
                cursor: pointer;
              `}
            />
            <Box>{stringDate}</Box>
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            fontSize={12}
            gap={0.5}
          >
            <Box>Select Timeslot</Box>
            <TimeSlots
              minTimeslot={minTimeslot}
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
