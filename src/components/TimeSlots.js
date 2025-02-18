import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TIME_SLOTS_ONE, TIME_SLOTS_TWO } from "../constants";
import { lightFormat } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import _ from "lodash";

const TimeSlots = (props) => {
  const {
    setSelectedTimeslot,
    selectedTimeslot,
    bookingDate,
    bookings,
    currentHour,
    status,
  } = props;

  const [minTimeslot, setMinTimeslot] = useState(0);

  // recheck timeslot validity based on hourly clock
  useEffect(() => {
    setMinTimeslot(currentHour);
  }, [currentHour]);

  // reset timeslot whenever booking date is changed
  useEffect(() => {
    setSelectedTimeslot(null);
  }, [bookingDate]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minWidth="285px"
        gap={1}
      >
        {TIME_SLOTS_ONE.map((slot) => {
          const checkPreviousBookings = () => {
            return bookings.some((booking) =>
              _.isEqual({ date: bookingDate, timeslot: slot.value }, booking)
            );
          };

          return (
            <Button
              key={slot.value}
              variant={
                selectedTimeslot === slot.value ? "contained" : "outlined"
              }
              onClick={() => setSelectedTimeslot(slot.value)}
              color="info"
              size="small"
              disabled={
                (slot.value <= minTimeslot &&
                  bookingDate === lightFormat(new Date(), "yyyy-MM-dd")) ||
                !bookingDate ||
                checkPreviousBookings() ||
                status === "Inactive"
              }
              css={css`
                min-width: 100px;
                font-size: 12px;
                :disabled {
                  background-color: grey;
                }
              `}
            >
              {slot.label}
            </Button>
          );
        })}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minWidth="285px"
        gap={1}
      >
        {TIME_SLOTS_TWO.map((slot) => {
          const checkPreviousBookings = () => {
            return bookings.some((booking) =>
              _.isEqual({ date: bookingDate, timeslot: slot.value }, booking)
            );
          };

          return (
            <Button
              key={slot.value}
              variant={
                selectedTimeslot === slot.value ? "contained" : "outlined"
              }
              onClick={() => setSelectedTimeslot(slot.value)}
              color="info"
              size="small"
              disabled={
                (slot.value <= minTimeslot &&
                  bookingDate === lightFormat(new Date(), "yyyy-MM-dd")) ||
                !bookingDate ||
                checkPreviousBookings() ||
                status === "Inactive"
              }
              css={css`
                min-width: 100px;
                font-size: 12px;
                :disabled {
                  background-color: grey;
                }
              `}
            >
              {slot.label}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default TimeSlots;
