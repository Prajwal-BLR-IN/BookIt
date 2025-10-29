import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  // State to manage the mobile menu's visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for search input (shared between mobile & desktop)
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Example: navigate(`/search?query=${searchQuery}`);
    setIsMobileMenuOpen(false); // Close mobile menu after search
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="relative z-20 flex h-20 items-center justify-between px-6 py-4 shadow-[0_2px_16px_0_rgba(0,0,0,0.10)] md:px-16 lg:px-24 xl:px-32">
        {/* Logo section */}
        <Link to="/">
          <img src={assets.logo} alt="Highway Delite" className="h-14 w-auto" />
        </Link>

        {/* --- Desktop Search bar --- */}
        <div className="hidden h-10 items-center gap-4 md:flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="focus:outline-primary flex h-full w-84 rounded-sm bg-[#EDEDED] px-4 py-3 text-sm leading-tight font-normal"
            placeholder="Search experiences"
          />
          <button
            onClick={handleSearch}
            className="bg-primary flex h-full w-20 items-center justify-center rounded-lg px-5 py-3"
          >
            Search
          </button>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="cursor-pointer md:hidden" onClick={toggleMobileMenu}>
          <img src={assets.menuIcon} alt="menu icon" className="h-8" />
        </div>
      </nav>

      {/* --- Mobile Slide-out Menu --- */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-3/4 max-w-sm transform bg-[#F9F9F9] p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header with Close Button */}
        <div className="flex items-center justify-between pb-6">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={toggleMobileMenu} className="p-1">
            <img src={assets.menuCloseIcon} alt="close" className="h-5" />
          </button>
        </div>

        {/* Shared Search Input (same state as desktop) */}
        <div className="flex w-full flex-col items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="focus:outline-primary flex h-11 w-full rounded-sm bg-[#EDEDED] px-4 py-3 text-sm leading-tight font-normal"
            placeholder="Search experiences"
          />
          <button
            onClick={handleSearch}
            className="bg-primary flex h-11 w-full items-center justify-center rounded-lg px-5 py-3"
          >
            Search
          </button>
        </div>
      </div>

      {/* --- Background Overlay --- */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={toggleMobileMenu}
      ></div>
    </>
  );
};

export default Navbar;
