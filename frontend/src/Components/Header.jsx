// Header.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import UserDropdown from "./UserDropdown"; // Assume you have a UserDropdown component

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Logo (replace with your logo) */}
        <Link to="/" className="text-2xl font-semibold ml-7">
          E-Shop
        </Link>

        {/* Navigation Menu */}
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
