import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] grow px-6 md:px-16 lg:px-24 xl:px-32">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
