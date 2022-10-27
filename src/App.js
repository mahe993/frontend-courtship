import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navbars/NavBar";
import RoutesComponent from "./routes/RoutesComponent";
import Auth0ProviderWithRedirectCallback from "./contexts/Auth0ProviderWithRedirectCallback";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <NavBar />
        <RoutesComponent />
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
};

export default App;
