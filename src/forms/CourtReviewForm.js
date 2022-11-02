import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tennisBall from "../assets/images/tennis ball.png";
import { useForm } from "react-hook-form";

const CourtReviewForm = () => {
  const { register, watch } = useForm();

  useEffect(() => {
    console.log(watch("ratings"));
  }, [watch("ratings")]);

  return (
    <form>
      <Box
        className="form-container"
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Box
          id="ratings-container"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box component="label" htmlFor="rating-one">
            <input
              id="rating-one"
              type="radio"
              {...register("ratings")}
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
              {...register("ratings")}
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
              {...register("ratings")}
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
              {...register("ratings")}
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
              {...register("ratings")}
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
      </Box>
    </form>
  );
};

export default CourtReviewForm;
