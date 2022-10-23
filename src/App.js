import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navbars/NavBar";
import RoutesComponent from "./routes/RoutesComponent";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;
