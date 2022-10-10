import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AccountForm = () => {
  //listen to userContext. if authkey received, get form values set as defaultValues

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
    //update DB users table username/email col where userId = userId
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
            htmlFor="email"
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
          <input
            autoComplete="off"
            id="email"
            type="email"
            placeholder="xxxxx@xxx.xxx"
            {...register("email")}
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
