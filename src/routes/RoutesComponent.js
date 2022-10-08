import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/AboutUsPage";
import LandingPage from "../pages/LandingPage";
import ListingsPage from "../pages/ListingsPage";
import CourtyardPage from "../pages/CourtyardPage";
import CourtPage from "../pages/CourtPage";
import BookingsPage from "../pages/BookingsPage";
import AccountPage from "../pages/AccountPage";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element=<LandingPage /> />
      <Route path="/courtyard" element=<CourtyardPage /> />
      <Route path="/courtyard/court:courtId" element=<CourtPage /> />
      <Route path="/listings" element=<ListingsPage /> />
      <Route path="/bookings" element=<BookingsPage /> />
      <Route path="/about" element=<AboutUsPage /> />
      <Route path="/account" element=<AccountPage /> />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
