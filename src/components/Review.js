import { Box } from "@mui/material";
import React from "react";
import tennisBall from "../assets/images/tennis ball.png";
import { createRatingBalls } from "../constants";

const Review = ({ reviews }) => {
  return (
    reviews.length !== 0 &&
    reviews[0] !== null && (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          bgcolor="rgba(0, 0, 0, 0.75)"
          borderRadius="25px"
          p={1}
          minWidth="min-content"
          width="min-content"
          whiteSpace="nowrap"
          color="darkseagreen"
          fontWeight="bold"
        >
          REVIEWS
        </Box>
        {reviews.length !== 0 &&
          reviews.map((review) => (
            <Box
              key={review.id}
              className="review-container"
              bgcolor="white"
              color="black"
              display="flex"
              flexDirection="column"
              alignItems="center"
              border={1}
              p={0.5}
              width="90vmin"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minWidth="150px"
              >
                {createRatingBalls(review?.ratings, tennisBall)}
              </Box>
              <Box component="hr" width="100%" />
              <Box alignSelf="flex-start" fontWeight="bold" fontSize={13}>
                {review?.user?.username
                  ? review.user?.username
                  : review.user?.email}
              </Box>
              <Box fontSize={13} alignSelf="flex-start">
                "{review.experience}"
              </Box>
              <Box fontSize={11} fontStyle="italic" fontWeight="bold">
                Used Court on:{" "}
                {new Date(review?.booking?.date).toString().slice(0, 16)}{" "}
                {review?.booking?.timeslot}:00 to{" "}
                {review?.booking?.timeslot + 2}
                :00
              </Box>
            </Box>
          ))}
      </Box>
    )
  );
};

export default Review;
