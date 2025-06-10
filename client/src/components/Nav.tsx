import React, { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col ">
      <header>
        <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* Hamburger button BEFORE the app name */}
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="text-white hover:text-blue-600 focus:outline-none mr-3 md:hidden"
                >
                  {open ? "✖" : "☰"}
                </button>

                {/* App name */}
                <div className="text-2xl text-white font-bold">My App</div>
              </div>

              {/* Desktop navigation - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-white hover:text-blue-700 transition">
                  Home
                </a>
                <a href="#" className="text-white hover:text-blue-700 transition">
                  About
                </a>
                <a href="#" className="text-white hover:text-blue-700 transition">
                  Service
                </a>
                <a href="#" className="text-white hover:text-blue-700 transition">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu - shown when open state is true */}
        {open && (
          <div className="bg-black py-2 md:hidden mt-16 px-4">
            <a href="#" className="block text-white hover:text-blue-700 py-2">
              Home
            </a>
            <a href="#" className="block text-white hover:text-blue-700 py-2">
              Features
            </a>
            <a href="#" className="block text-white hover:text-blue-700 py-2">
              Clients
            </a>
            <a href="#" className="block text-white hover:text-blue-700 py-2">
              Product
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;





