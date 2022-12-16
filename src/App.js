import AppRoutes from "./routes/Routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext/userContext";

import { GlobalStyle } from "./global.styles.js";
import Navigation from "./components/NavBar";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <Navigation />
          <AppRoutes />
          <GlobalStyle />
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
