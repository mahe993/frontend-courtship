import { createTheme } from "@mui/material";
import axios from "axios";

/* eslint-disable default-case */
const backendURL = (devEnv) => {
  switch (devEnv) {
    case "development":
      return process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;
  }
};

export const BACKEND_URL = backendURL(process.env.NODE_ENV);

export const BREAKPOINT = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 700,
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

export const formAxios = axios.create({
  transformRequest: [
    function (data, headers) {
      const form = new FormData();
      for (const key in data) {
        const value = data[key];
        if (Array.isArray(value)) {
          const arrayKey = `pictures[]`;
          value.forEach((v) => {
            form.append(arrayKey, v);
          });
        } else {
          form.append(key, value);
        }
      }
      return form;
    },
  ],
  headers: { "Content-Type": "multipart/form-data" },
});
