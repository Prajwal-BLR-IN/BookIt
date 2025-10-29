import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <Link to="/" className="text-primary text-2xl font-bold">
        <a href=""></a>
      </Link>

      <div className="space-x-6 font-medium text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
