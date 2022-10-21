import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, TIME_SLOTS_ONE, TIME_SLOTS_TWO } from "../constants";
import { Box, Button } from "@mui/material";
import PictureCarousel from "../components/PictureCarousel";
import { useForm } from "react-hook-form";
import { addDays, getHours, lightFormat } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimeSlots from "../components/TimeSlots";

const CourtPage = () => {
  const [court, setCourt] = useState();
  const [today, setToday] = useState(new Date());
  const [minDate, setMinDate] = useState(lightFormat(new Date(), "yyyy-MM-dd"));
  const [maxDate, setMaxDate] = useState(
    lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd")
  );
  const [stringDate, setStringDate] = useState();
  const [timeslot, setTimeslot] = useState();

  const { courtId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    delayError: 150,
    mode: "onChange",
  });

  // get court details on mount
  useEffect(() => {
    getCourt();
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

  // internal clock on mount
  useEffect(() => {
    const clock = setInterval(() => setToday(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  // recheck date/timeslot validity every second
  useEffect(() => {
    if (getHours(today) > 19) {
      console.log("here");
      return setMinDate(lightFormat(addDays(today, 1), "yyyy-MM-dd"));
    }
    setMinDate(lightFormat(today, "yyyy-MM-dd"));
  }, [today]);

  // when min date changes, max date changes
  useEffect(() => {
    setMaxDate(lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd"));
  }, [minDate]);

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
          <Box
            borderRadius="25px"
            bgcolor="rgba(0, 0, 0, 0.5)"
            p={1}
            fontSize={12}
          >
            {court.courtName}
          </Box>
          <Box
            borderRadius="25px"
            bgcolor="rgba(0, 0, 0, 0.5)"
            p={1}
            fontSize={12}
          >
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
          <Box
            fontStyle="italic"
            whiteSpace={"pre-line"}
            borderRadius="25px"
            bgcolor="rgba(0, 0, 0, 0.5)"
            p={1}
            fontSize={12}
          >
            {court.description}
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="25px"
            bgcolor="rgba(0, 0, 0, 0.5)"
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
            />
            <Box>{stringDate}</Box>
          </Box>
          <Box
            maxWidth="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius="25px"
            bgcolor="rgba(0, 0, 0, 0.5)"
            p={2}
            fontSize={12}
            gap={0.5}
          >
            <Box>Select Timeslot</Box>
            <TimeSlots
              today={today}
              setTimeslot={setTimeslot}
              timeslot={timeslot}
              bookingDate={getValues("bookingDate")}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={!getValues("bookingDate") || !timeslot}
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
