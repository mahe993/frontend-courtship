import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ActiveListingSwitch = ({ court, setCourt }) => {
  const [label, setLabel] = useState("Active");

  const { courtId } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setLabel(court.status);
  }, [court]);

  const handleChange = async () => {
    if (court.status === "Active") {
      //update court status to Inactive
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await axios({
          method: "PUT",
          url: `${BACKEND_URL}/courts/courtyard/${courtId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            status: "Inactive",
          },
        });
        setCourt(res.data);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      //update court status to Active
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await axios({
          method: "PUT",
          url: `${BACKEND_URL}/courts/courtyard/${courtId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            status: "Active",
          },
        });
        setCourt(res.data);
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <FormControlLabel
        onChange={handleChange}
        control={<IOSSwitch sx={{ m: 1 }} checked={label === "Active"} />}
        label={label}
        css={css`
          margin: 0;
          .MuiFormControlLabel-label {
            font-size: 12px;
            min-width: 50px;
          }
        `}
      />
    </Box>
  );
};

export default ActiveListingSwitch;

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 21,
  height: 13,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(8px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 10.5,
    height: 10.5,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#bf2e2e" : "#4a0707",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
