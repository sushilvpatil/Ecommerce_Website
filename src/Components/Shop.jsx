import React from 'react';
import CategariesSection from './CategariesSection';
import AllProducts from './AllProducts';

const Shop = ({ setSearchResults, wishlist, toggleWishlist }) => {
  return (
    <div className='bg-white mt-2 px-4 md:px-16 lg:px-24'>
      <CategariesSection setSearchResults={setSearchResults} />
      <AllProducts wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </div>
  );
};

export default Shop;
