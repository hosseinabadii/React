import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto p-4 text-white text-lg">
      <ul className="flex justify-between items-center">
        <li className="bg-gray-800 px-4 py-2 rounded">
          <Link to="/">Products</Link>
        </li>
        <li className="bg-gray-800 px-4 py-2 rounded">
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
