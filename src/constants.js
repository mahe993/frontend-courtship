import { Box, createTheme } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* eslint-disable default-case */
const backendURL = (devEnv) => {
  switch (devEnv) {
    case "development":
      return process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;

    case "production":
      return process.env.REACT_APP_PRODUCTION_BACKEND_URL;
  }
};

export const BACKEND_URL = backendURL(process.env.NODE_ENV);

export const BREAKPOINT = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 800,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export const NAV_ITEMS = [
  { name: "Courtyard", path: "/courtyard" },
  { name: "Listings", path: "/listings" },
  { name: "Bookings", path: "/bookings" },
  { name: "About Us", path: "/about" },
  { name: "Account", path: "/account" },
];

export const TIME_SLOTS_ONE = [
  { label: "10am - 12pm", value: 10 },
  { label: "12pm - 2pm", value: 12 },
  { label: "2pm - 4pm", value: 14 },
];

export const TIME_SLOTS_TWO = [
  { label: "4pm - 6pm", value: 16 },
  { label: "6pm - 8pm", value: 18 },
  { label: "8pm - 10pm", value: 20 },
];

const FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const validateFileType = (file) => {
  return FILE_TYPES.includes(file.type);
};

export const returnFileSize = (number) => {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
};

export const createRatingBalls = (rating, imgSource) => {
  const ratingBalls = [];
  const ballNumber = Math.ceil(rating);
  let clipping = "0%";
  for (let i = 0; i < ballNumber; i++) {
    if (i === ballNumber - 1) {
      clipping = `${(ballNumber - rating) * 100}%`;
    }
    ratingBalls.push(
      <Box
        height={25}
        width={25}
        display="flex"
        key={i}
        css={css`
          clip-path: inset(0% ${clipping} 0% 0%);
        `}
      >
        <img
          src={imgSource}
          alt="tennis ball"
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
      </Box>
    );
  }
  return ratingBalls;
};

export const getAverageRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }
  if (reviews.length === 1) {
    return reviews[0].ratings;
  }
  const sum = reviews.reduce((prev, curr, i) => {
    if (i === 1) {
      prev = prev.ratings;
    }
    const { ratings: currRatings } = curr;
    return prev + currRatings;
  });
  const average = sum / reviews.length;
  return average.toFixed(2);
};
