import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaHeart } from "react-icons/fa";
import { useAuth } from "./AuthService/AuthContext";
import { GetRequest } from "../ApiRequests";
import { useSelector } from "react-redux";

function NavBar({ setSearchResults, wishlistCount }) {
  const { token, logout } = useAuth(); // Get authentication token and logout function from context
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  // Handle product search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await GetRequest("products"); // Fetch all products
      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredProducts);
      navigate("/products"); // Redirect to products page with filtered results
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Redirect to cart or show alert if user is not logged in
  const handleShopClick = () => {
    if (!token) {
      alert("You need to log in to access the cart.");
      return;
    }
    navigate("/cart");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/">E-Shop</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="focus:outline-none">
            <FaBars className="text-lg" />
          </button>
        </div>

        {/* Search Bar (hidden on login/register page) */}
        {!isLoginPage && (
          <div className="relative flex-1 mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                className="w-full border border-yellow-500 py-2 px-4 focus:border-yellow-500"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-yellow-600">
                <FaSearch />
              </button>
            </form>
          </div>
        )}

        {/* Navigation Icons */}
        <div className="flex items-center space-x-6 relative">
          
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-xl text-gray-700 hover:text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Cart Icon */}
          <button onClick={handleShopClick} className="relative focus:outline-none">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-yellow-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* User Profile / Login Button */}
          {token ? (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
                <FaUser className="text-xl text-gray-700 hover:text-blue-500" />
              </button>

              {/* Dropdown Menu for Logout */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-md border rounded-md">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !isLoginPage && (
              <Link
                to="/login"
                className="border border-yellow-500 py-2 px-4 hover:bg-yellow-500 hover:text-white hidden md:block"
              >
                Login | Register
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu (visible on smaller screens) */}
      {showMobileMenu && (
        <div className="md:hidden px-4 py-2">
          {!isLoginPage && (
            <form className="mb-4 relative" onSubmit={handleSearch}>
              <input
                className="w-full border border-yellow-500 py-2 px-4 focus:border-yellow-500"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-yellow-600">
                <FaSearch />
              </button>
            </form>
          )}
          <div className="flex flex-col space-y-2">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/shop" className="hover:underline">Shop</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/about" className="hover:underline">About</Link>
            {!token && !isLoginPage && (
              <Link to="/login" className="border border-yellow-500 py-2 px-4 hover:bg-yellow-500 hover:text-white">
                Login | Register
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center justify-center space-x-20 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;
