// client/src/components/Nav.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <header>
        <nav className="bg-blue-900 shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* Hamburger button BEFORE the app name */}
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="text-white hover:text-cyan-400 focus:outline-none mr-3 md:hidden transition-colors duration-300"
                >
                  {open ? "✖" : "☰"}
                </button>
                {/* App name */}
                <Link 
                  to="/" 
                  className="text-2xl text-white font-bold hover:text-cyan-400 transition-colors duration-300"
                >
                  NeoBank
                </Link>
              </div>
              
              {/* Desktop navigation - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  Home
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium"
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center space-x-4">
                      <span className="text-cyan-300 text-sm">
                        Welcome, {user?.first_name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile menu - shown when open state is true */}
        {open && (
          <div className="bg-blue-900 py-2 md:hidden mt-16 px-4 border-t border-blue-800">
            <Link 
              to="/" 
              className="block text-white hover:text-cyan-400 py-3 transition-colors duration-300 font-medium"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block text-white hover:text-cyan-400 py-3 transition-colors duration-300 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="py-3 border-t border-blue-800 mt-2">
                  <div className="text-cyan-300 text-sm mb-2">
                    Welcome, {user?.first_name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium text-center"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg mt-2 mb-2 transition-colors duration-300 font-medium text-center"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg mt-2 mb-2 transition-colors duration-300 font-medium text-center"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;