import { Box } from "@mui/material";
import { addDays, isWithinInterval, lightFormat } from "date-fns";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DateSelector = (props) => {
  const { register, watchBookingDate, currentHour, reset, status } = props;

  const [stringDate, setStringDate] = useState();
  const [minDate, setMinDate] = useState(lightFormat(new Date(), "yyyy-MM-dd"));
  const [maxDate, setMaxDate] = useState(
    lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd")
  );

  // recheck min date validity based on hourly clock
  useEffect(() => {
    if (currentHour > 19) {
      return setMinDate(lightFormat(addDays(new Date(), 1), "yyyy-MM-dd"));
    }
    setMinDate(lightFormat(new Date(), "yyyy-MM-dd"));
  }, [currentHour]);

  // when min date changes, max date changes
  useEffect(() => {
    setMaxDate(lightFormat(addDays(new Date(minDate), 14), "yyyy-MM-dd"));
  }, [minDate]);

  // when user selects booking date. show the date in string format
  useEffect(() => {
    if (watchBookingDate) {
      setStringDate(new Date(watchBookingDate).toString().slice(0, 16));
    }
    if (
      watchBookingDate &&
      !isWithinInterval(new Date(watchBookingDate), {
        start: new Date(minDate),
        end: new Date(maxDate),
      })
    ) {
      setStringDate("Invalid date. Select within 14 days period!");
      reset();
    }
  }, [watchBookingDate]);

  return (
    <>
      <label htmlFor="bookingDate">Select Date</label>
      <input
        disabled={status === "Inactive"}
        type="date"
        id="bookingDate"
        {...register}
        min={minDate}
        max={maxDate}
        css={css`
          cursor: pointer;
        `}
      />
      {stringDate && (
        <Box
          color={stringDate.includes("Invalid") ? "red" : "inherit"}
          fontSize={stringDate.includes("Invalid") ? 8 : 12}
          fontStyle={stringDate.includes("Invalid") && "italic"}
        >
          {stringDate}
        </Box>
      )}
    </>
  );
};

export default DateSelector;
