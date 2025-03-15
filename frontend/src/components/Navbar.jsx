import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Fintech System</h1>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white text-xl bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Home
          </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
