import { Box } from "@mui/material";
import React from "react";

const Review = ({ reviews }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        bgcolor="rgba(0, 0, 0, 0.75)"
        borderRadius="25px"
        p={0.5}
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
          >
            <Box>
              {review.user?.username
                ? review.user?.username
                : review.user?.email}
            </Box>
            <Box>{review.ratings}</Box>
            <Box>{review.experience}</Box>
            <Box>
              Used Court on:{" "}
              {new Date(review.booking.date).toString().slice(0, 16)}{" "}
              {review.booking.timeslot}:00 to {review.booking.timeslot + 2}:00
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default Review;
