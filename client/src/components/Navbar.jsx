import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaHome, FaTruck, FaTag, FaPhone, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Removes token from localStorage
    dispatch(logout());  // Dispatch the logout action to reset the user state
    navigate('/login');  // Navigate to the login page
  };


  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 hover:text-blue-500">
          <img src="/assets/images/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-3 text-xl font-bold">DeliveryPro</span>
        </Link>
      </div>

      {/* Conditionally Render the Menu Items based on user presence */}
      {!user && (
        <div className="hidden md:flex space-x-10 mx-auto text-lg">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-500">
            <FaHome size={22} /> Home
          </Link>
          <Link to="/services" className="flex items-center gap-2 hover:text-blue-500">
            <FaTruck size={22} /> Services
          </Link>
          <Link to="/pricing" className="flex items-center gap-2 hover:text-blue-500">
            <FaTag size={22} /> Pricing
          </Link>
          <Link to="/contact" className="flex items-center gap-2 hover:text-blue-500">
            <FaPhone size={22} /> Contact
          </Link>
        </div>
      )}

      {/* Conditionally Render based on user presence */}
      <div className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="text-xl font-semibold">
              <span className="text-lg">Welcome, </span>
              <div className="text-xl text-blue-500 animate-pulse">
                {user} {/* Display user name with animation */}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
            >
              <FaSignOutAlt size={22} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-lg">
            <FaUser size={24} /> Login / Signup
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden text-lg">
          {!user && (
            <>
              <Link to="/" className="py-3 border-b w-full text-center hover:text-blue-500 flex items-center gap-2">
                <FaHome size={22} /> Home
              </Link>
              <Link to="/services" className="py-3 border-b w-full text-center hover:text-blue-500 flex items-center gap-2">
                <FaTruck size={22} /> Services
              </Link>
              <Link to="/pricing" className="py-3 border-b w-full text-center hover:text-blue-500 flex items-center gap-2">
                <FaTag size={22} /> Pricing
              </Link>
              <Link to="/contact" className="py-3 w-full text-center hover:text-blue-500 flex items-center gap-2">
                <FaPhone size={22} /> Contact
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="my-5 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="my-5 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-lg">
              <FaUser size={24} /> Login / Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
