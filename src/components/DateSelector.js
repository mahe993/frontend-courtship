import { Box } from "@mui/material";
import { addDays, lightFormat } from "date-fns";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DateSelector = ({ register, watchBookingDate, currentHour }) => {
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
  }, [watchBookingDate]);

  return (
    <>
      <label htmlFor="bookingDate">Select Date</label>
      <input
        type="date"
        id="bookingDate"
        {...register}
        min={minDate}
        max={maxDate}
        css={css`
          cursor: pointer;
        `}
      />
      <Box>{stringDate}</Box>
    </>
  );
};

export default DateSelector;
