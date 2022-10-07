import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/AboutUsPage";
import LandingPage from "../pages/LandingPage";
import ListingsPage from "../pages/ListingsPage";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element=<LandingPage /> />
      <Route path="/listings" element=<ListingsPage /> />
      <Route path="/about" element=<AboutUsPage /> />
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
