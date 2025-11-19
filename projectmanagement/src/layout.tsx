import { NavLink, Outlet } from "react-router";

const MainLayout = () => {

  return (
    <>
      <nav className="navmenu">
        <NavLink to="/" end>Home</NavLink>
      </nav>
      <main className="bg-white border-8 border-white">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

