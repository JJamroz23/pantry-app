import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation-component";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}></Route>
    </Routes>
  );
};

export default AppRoutes;
