import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Box, Button } from "@mui/material";
import PictureCarousel from "../components/PictureCarousel";
import { useForm } from "react-hook-form";
import { addDays, formatRelative, getHours, lightFormat } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CourtPage = () => {
  const [court, setCourt] = useState();
  const [today, setToday] = useState(lightFormat(new Date(), "yyyy-MM-dd"));
  const [maxDate, setMaxDate] = useState(
    lightFormat(addDays(new Date(today), 14), "yyyy-MM-dd")
  );
  const [stringDate, setStringDate] = useState();

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

  useEffect(() => {
    getCourt();
  }, []);

  // when user selects booking date. recheck min max on change
  useEffect(() => {
    if (getHours(new Date()) > 19) {
      console.log("here");
      return setToday(lightFormat(addDays(new Date(), 1), "yyyy-MM-dd"));
    }
    setToday(lightFormat(new Date(), "yyyy-MM-dd"));
    setStringDate(new Date(getValues("bookingDate")).toString());
  }, [watch("bookingDate")]);

  // when min date changes, max date changes
  useEffect(() => {
    setMaxDate(lightFormat(addDays(new Date(today), 14), "yyyy-MM-dd"));
  }, [today]);

  // when user selects booking date. show the date in string format
  useEffect(() => {
    if (getValues("bookingDate")) {
      setStringDate(new Date(getValues("bookingDate")).toString().slice(0, 16));
    }
  }, [watch("bookingDate")]);

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
          gap={3}
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
              min={today}
              max={maxDate}
            />
            <Box>{stringDate}</Box>
          </Box>
          <Box maxWidth="100%">{`timeslots`}</Box>
          <Box>
            <Button variant="contained" color="success">
              BOOK
            </Button>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default CourtPage;
