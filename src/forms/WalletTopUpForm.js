import { Box, Button } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";

const WalletTopUpForm = (props) => {
  const { walletBalance, setUserDetails, setAlertMessage, setSnackBarOpen } =
    props;
  // react-hook-form methods
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ delayError: 300, mode: "onChange" });

  // auth
  const { user, getAccessTokenSilently } = useAuth0();

  // handleSubmit callback fns
  const onSubmit = async (values) => {
    console.log(values.wallet);
    //update DB users table wallet col where userId = userId
    try {
      const accessToken = await getAccessTokenSilently();
      const topUp = await axios({
        method: "PUT",
        url: `${BACKEND_URL}/users/${user.sub}/wallet`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { wallet: values.wallet },
      });
      setUserDetails(topUp.data);
      reset();
      setAlertMessage("Top up successful");
      setSnackBarOpen(true);
    } catch (err) {
      throw new Error(err);
    }
  };
  const onError = (err) => {
    throw new Error(err);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Box fontWeight="bold ">Wallet</Box>
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            css={css`
              display: flex;
              align-items: center;
              width: 10%;
              min-width: 60px;
              justify-content: end;
              font-size: 10px;
              height: 23.5px;
            `}
          >
            Balance:
          </Box>
          <Box
            css={css`
              display: flex;
              align-items: center;
              width: 20%;
              min-width: 143px;
              justify-content: center;
              font-size: 10px;
              height: 23.5px;
            `}
          >
            ${walletBalance}
          </Box>
        </Box>
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
            htmlFor="wallet"
            css={css`
              display: flex;
              align-items: center;
              width: 10%;
              min-width: 60px;
              justify-content: end;
              font-size: 10px;
              height: 23.5px;
            `}
          >
            SGD($)
          </Box>
          <input
            autoComplete="off"
            id="wallet"
            type="text"
            placeholder="888"
            {...register("wallet", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please only enter numbers!",
              },
            })}
            css={css`
              padding: 3px;
              font-size: 10px;
              min-width: 20%;
              text-align: center;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.wallet && (
          <Box fontSize={8} color="red" width="60vw" pl={5} textAlign="center">
            {errors.wallet.message}
          </Box>
        )}

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
          Top Up
        </Button>
      </Box>
    </form>
  );
};

export default WalletTopUpForm;
