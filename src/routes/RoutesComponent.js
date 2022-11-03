import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/AboutUsPage";
import LandingPage from "../pages/LandingPage";
import ListingsPage from "../pages/ListingsPage";
import CourtyardPage from "../pages/CourtyardPage";
import CourtPage from "../pages/CourtPage";
import BookingsPage from "../pages/BookingsPage";
import AccountPage from "../pages/AccountPage";
import SuccessfulBookingPage from "../pages/SuccessfulBookingPage";
import ProtectedRoute from "../routes/ProtectedRoute";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element=<LandingPage /> />
      <Route path="/courtyard" element=<CourtyardPage /> />
      <Route path="/courtyard/court:courtId" element=<CourtPage /> />
      <Route
        path="/listings"
        element=<ProtectedRoute component={ListingsPage} />
      />
      <Route
        path="/bookings"
        element=<ProtectedRoute component={BookingsPage} />
      />
      <Route path="/about" element=<AboutUsPage /> />
      <Route
        path="/account"
        element=<ProtectedRoute component={AccountPage} />
      />
      <Route path="/bookings/success" element=<SuccessfulBookingPage /> />
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
