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
