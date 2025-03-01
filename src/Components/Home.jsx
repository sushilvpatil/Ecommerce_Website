import React, { useRef } from "react";
import CategariesSection from "./CategariesSection";
import AllProducts from "./AllProducts";
import InfoSection from "./InfoSection";

const Home = ({ setSearchResults, wishlist, toggleWishlist }) => {
  const allProductsRef = useRef(null);

  const handleShopNowClick = () => {
    if (allProductsRef.current) {
      allProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
      <div
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1734772337649-79615ba2f176?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGtpZHMlMjBzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D')", // Replace with your image URL
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover the Latest Trends
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore our newest collections and find your perfect style.
          </p>
          <button
            onClick={handleShopNowClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
      <InfoSection />
      <CategariesSection setSearchResults={setSearchResults} />
      <div ref={allProductsRef}>
        <AllProducts wishlist={wishlist} toggleWishlist={toggleWishlist} />
      </div>
    </div>
  );
};

export default Home;