import { NavLink, Outlet } from "react-router";

const MainLayout = () => {

  return (
    <>
      <nav className="navmenu">
        <NavLink to="/" end>Home</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

