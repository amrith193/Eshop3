// StoreNavigation.js
import React from 'react';

const StoreNavigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <h1 className="text-2xl font-bold">My Store</h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Categories
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StoreNavigation;
