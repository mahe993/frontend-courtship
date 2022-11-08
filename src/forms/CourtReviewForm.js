import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tennisBall from "../assets/images/tennis ball.png";
import { useForm } from "react-hook-form";
import { BACKEND_URL, BREAKPOINT } from "../constants";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const CourtReviewForm = ({ setOpenForm, booking }) => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const phoneMediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet"));

  const { getAccessTokenSilently, user } = useAuth0();

  const createReview = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/reviews`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          ratings: getValues("ratings"),
          experience: getValues("experience"),
          reviewCode: `${user.sub}-${booking.id}`,
          userId: user.sub,
          courtId: booking.courtId,
          bookingId: booking.id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const onSubmit = async () => {
    await createReview();
    setOpenForm(false);
  };

  const onError = (err) => {
    throw new Error(err);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        className="form-container"
        display="flex"
        flexDirection="column"
        gap={1}
        alignItems="center"
      >
        {errors?.ratings && (
          <Box fontSize={10} color="red" width={200} textAlign="center">
            {errors.ratings.message}
          </Box>
        )}
        <Box
          id="ratings-container"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={200}
        >
          <Box component="label" htmlFor="rating-one">
            <input
              id="rating-one"
              type="radio"
              {...register("ratings", {
                required: "Please leave a rating for your experience!",
              })}
              value={1}
              css={css`
                display: none;
              `}
            />
            <Box height={30} width={30} display="flex">
              <img
                src={tennisBall}
                alt="picsum"
                css={css`
                  width: 100%;
                  height: 100%;
                  filter: grayscale(${watch("ratings") > 0 ? 0 : 1});
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
          <Box component="label" htmlFor="rating-two">
            <input
              id="rating-two"
              type="radio"
              {...register("ratings", {
                required: "Please leave a rating for your experience!",
              })}
              value={2}
              css={css`
                display: none;
              `}
            />
            <Box height={30} width={30} display="flex">
              <img
                src={tennisBall}
                alt="picsum"
                css={css`
                  width: 100%;
                  height: 100%;
                  filter: grayscale(${watch("ratings") > 1 ? 0 : 1});
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
          <Box component="label" htmlFor="rating-three">
            <input
              id="rating-three"
              type="radio"
              {...register("ratings", {
                required: "Please leave a rating for your experience!",
              })}
              value={3}
              css={css`
                display: none;
              `}
            />
            <Box height={30} width={30} display="flex">
              <img
                src={tennisBall}
                alt="picsum"
                css={css`
                  width: 100%;
                  height: 100%;
                  filter: grayscale(${watch("ratings") > 2 ? 0 : 1});
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
          <Box component="label" htmlFor="rating-four">
            <input
              id="rating-four"
              type="radio"
              {...register("ratings", {
                required: "Please leave a rating for your experience!",
              })}
              value={4}
              css={css`
                display: none;
              `}
            />
            <Box height={30} width={30} display="flex">
              <img
                src={tennisBall}
                alt="picsum"
                css={css`
                  width: 100%;
                  height: 100%;
                  filter: grayscale(${watch("ratings") > 3 ? 0 : 1});
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
          <Box component="label" htmlFor="rating-five">
            <input
              id="rating-five"
              type="radio"
              {...register("ratings", {
                required: "Please leave a rating for your experience!",
              })}
              value={5}
              css={css`
                display: none;
              `}
            />
            <Box height={30} width={30} display="flex">
              <img
                src={tennisBall}
                alt="picsum"
                css={css`
                  width: 100%;
                  height: 100%;
                  filter: grayscale(${watch("ratings") > 4 ? 0 : 1});
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
        </Box>
        <Box fontSize={16} fontWeight="bold">
          RATE YOUR EXPERIENCE!
        </Box>
        <Box>
          <textarea
            id="description"
            rows={phoneMediaQuery ? 8 : 5}
            cols={phoneMediaQuery ? 45 : 100}
            placeholder={`Leave a review of the court!\n\nE.g. surface type/condition of the court etc!`}
            {...register("experience")}
            css={css`
              padding: 5px;
              resize: none;
              font-size: 12px;
              min-width: 75%;
              ::placeholder {
                font-size: 12px;
                font-style: italic;
              }
            `}
          />
        </Box>
        <Button size="small" variant="contained" color="success" type="submit">
          Review!
        </Button>
      </Box>
    </form>
  );
};

export default CourtReviewForm;
