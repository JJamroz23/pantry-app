import AppRoutes from "./routes/Routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext/userContext";

import { GlobalStyle } from "./global.styles.js";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />;
          <GlobalStyle />
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
