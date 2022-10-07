import { createTheme } from "@mui/material";

export const breakPoint = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 700,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export const navItems = [
  { name: "Courtyard", path: "/courtyard" },
  { name: "Listings", path: "/listings" },
  { name: "Bookings", path: "/bookings" },
  { name: "About Us", path: "/about" },
  { name: "Account", path: "/account" },
];

const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const validateFileType = (file) => {
  return fileTypes.includes(file.type);
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
