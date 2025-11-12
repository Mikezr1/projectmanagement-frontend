import { BrowserRouter, Route, Routes } from "react-router"
import MainLayout from "./layout";
import Test from "./pages/test";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<HomePage />} />    */}
          <Route index element={< Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;