import AppRoutes from "./Routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./global.styles.js";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes />;
        <GlobalStyle />
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
