import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow px-6 md:px-16 lg:px-24 xl:px-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
