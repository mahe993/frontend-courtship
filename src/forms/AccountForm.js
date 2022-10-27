import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";

const AccountForm = ({ userDetails }) => {
  //get userId from auth0
  const { user, getAccessTokenSilently } = useAuth0();

  // react-hook-form methods
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ delayError: 300, mode: "onChange" });

  // handleSubmit callback fns
  const onSubmit = (data) => {
    //update DB users table username/phoneNumber col where userId = userId
  };
  const onError = (err) => {
    throw new Error(err);
  };

  // on successful form submit, reset fields
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component="label"
            htmlFor="username"
            css={css`
              display: flex;
              align-items: center;
              width: 10%;
              min-width: 60px;
              justify-content: end;
              font-size: 10px;
              font-weight: bold;
              height: 23.5px;
            `}
          >
            Username:
          </Box>
          <input
            defaultValue={
              userDetails.username ? userDetails.username : user.email
            }
            autoComplete="off"
            id="username"
            type="text"
            placeholder="mahemahemahe"
            {...register("username", {
              maxLength: {
                value: 15,
                message: "Maximum username length is 15 chars!",
              },
            })}
            css={css`
              padding: 3px;
              font-size: 10px;
              min-width: 20%;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.username && (
          <Box
            fontSize={8}
            color="red"
            mt={-1}
            width="60vw"
            pl={11}
            textAlign="center"
          >
            {errors.username.message}
          </Box>
        )}
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component="label"
            htmlFor="phoneNumber"
            css={css`
              display: flex;
              align-items: center;
              width: 10%;
              min-width: 60px;
              justify-content: end;
              font-size: 10px;
              font-weight: bold;
              height: 23.5px;
            `}
          >
            Phone(+65):
          </Box>
          <input
            autoComplete="off"
            defaultValue={userDetails.phoneNumber && userDetails.phoneNumber}
            id="phoneNumber"
            type="phoneNumber"
            placeholder="91234567"
            {...register("phoneNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please only enter numbers!",
              },
              maxLength: {
                value: 8,
                message: "Phone number should not exceed 8 chars!",
              },
            })}
            css={css`
              padding: 3px;
              font-size: 10px;
              min-width: 20%;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.phoneNumber && (
          <Box
            fontSize={8}
            color="red"
            mt={-1}
            width="60vw"
            pl={11}
            textAlign="center"
          >
            {errors.phoneNumber.message}
          </Box>
        )}
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component="label"
            css={css`
              display: flex;
              align-items: center;
              width: 10%;
              min-width: 60px;
              justify-content: end;
              font-size: 10px;
              font-weight: bold;
              height: 23.5px;
            `}
          >
            Email:
          </Box>
          <Box
            css={css`
              padding: 3px;
              font-size: 10px;
              min-width: 140px;
              width: 20%;
            `}
          >
            {user.email}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="success"
          sx={{
            width: "100px",
            alignSelf: "center",
            height: "22.5px",
            fontSize: "11px",
          }}
          type="submit"
          disabled={!isValid}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default AccountForm;
