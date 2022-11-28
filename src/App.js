import AppRoutes from "./Routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user-context/user-context";

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
