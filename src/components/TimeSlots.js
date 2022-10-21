import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { TIME_SLOTS_ONE, TIME_SLOTS_TWO } from "../constants";
import { getHours, lightFormat } from "date-fns";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const TimeSlots = ({ today, setTimeslot, timeslot, bookingDate }) => {
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
          return (
            <Button
              key={slot.value}
              variant={timeslot === slot.value ? "contained" : "outlined"}
              onClick={() => setTimeslot(slot.value)}
              color="info"
              size="small"
              disabled={
                (slot.value <= getHours(today) &&
                  bookingDate === lightFormat(new Date(), "yyyy-MM-dd")) ||
                !bookingDate
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
          return (
            <Button
              key={slot.value}
              variant={timeslot === slot.value ? "contained" : "outlined"}
              onClick={() => setTimeslot(slot.value)}
              color="info"
              size="small"
              disabled={
                (slot.value <= getHours(today) &&
                  bookingDate === lightFormat(new Date(), "yyyy-MM-dd")) ||
                !bookingDate
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
