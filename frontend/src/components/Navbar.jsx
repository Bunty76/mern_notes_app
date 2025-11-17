import React from "react";
import { Link } from "react-router";

function Navbar() {
 return (
    <nav className="bg-white shadow-md rounded-xl mx-4 mt-4 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 tracking-wide">
        MyLogo
      </div>

      {/* Nav Links */}
      <ul className="flex items-center gap-8 text-gray-700 font-medium">
        <li>
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/services"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Services
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );


}

export default Navbar;
