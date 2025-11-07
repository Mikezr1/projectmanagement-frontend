import { NavLink, Outlet } from "react-router";
import footer from "./components/navigation/footer";

const MainLayout = () => {

  return (
    <>
      <nav className="navmenu">
        <NavLink to="/" end>Home</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer/>
    </>
  );
};

export default MainLayout;

