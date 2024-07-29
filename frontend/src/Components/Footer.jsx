// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p>123 Main Street</p>
          <p>Cityville, India</p>
          <p>Email: info@sellite.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Connect With Us</h2>
          <p>Follow us on social media:</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-white hover:text-gray-400">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              Twitter
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-2">Newsletter</h2>
          <p>Subscribe to our newsletter for updates on new products and promotions.</p>
          <form className="mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="border p-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2023 Sell-It. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
