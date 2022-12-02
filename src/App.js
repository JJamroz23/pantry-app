import AppRoutes from "./routes/Routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext/userContext";
// import { ProductProvider } from "./contexts/product-context/product-context";

import { GlobalStyle } from "./global.styles.js";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          {/* <ProductProvider> */}
          <AppRoutes />;
          <GlobalStyle />
          {/* </ProductProvider> */}
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
