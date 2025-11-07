import { BrowserRouter, Route, Routes } from "react-router"
import MainLayout from "./layout";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />      
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;