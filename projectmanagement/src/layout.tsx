import { NavLink, Outlet } from "react-router";
import Test from "./pages/test";

const MainLayout = () => {

  return (
    <>
      <nav className="navmenu">
        <NavLink to="/" end>Home</NavLink>
      </nav>
      <main className="bg-white border-8 border-white">
        <Test/>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

