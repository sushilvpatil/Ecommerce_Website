import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetRequest } from '../ApiRequests'; // Import function to make API requests
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons for wishlist functionality

// Component to display all products
const AllProducts = ({ wishlist, toggleWishlist }) => {
  // State to store the list of products
  const [products, setProducts] = useState([]);

  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to fetch all products from API
  const GetAllProducts = useCallback(async () => {
    try {
      const response = await GetRequest('products'); // Fetch products from API
      setProducts(response); // Update state with fetched products
    } catch (error) {
      alert("Something went wrong"); // Show error message in case of failure
    }
  }, []);

  // Fetch products when the component mounts
  useEffect(() => {
    GetAllProducts();
  }, [GetAllProducts]);

  // Function to handle product card click (navigates to product details page)
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Function to handle wishlist toggle when heart icon is clicked
  const handleWishlistClick = (e, productId) => {
    e.stopPropagation(); // Prevent triggering product click event
    toggleWishlist(productId); // Call function to add/remove product from wishlist
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>All Products</h1>
      
      {/* Grid layout for displaying products */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {/* Display message if no products are found */}
        {products.length === 0 ? (
          <p className='text-center text-gray-600'>No data found</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg shadow-lg p-4 cursor-pointer relative'
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product image */}
              <img src={product.image} alt={product.title} className='w-full h-48 object-cover rounded-t-lg' />
              
              {/* Wishlist icon - toggles between filled and outlined heart */}
              <div className='absolute top-2 right-2'>
                {wishlist?.includes(product.id) ? (
                  <FaHeart className='text-red-500' onClick={(e) => handleWishlistClick(e, product.id)} />
                ) : (
                  <FaRegHeart className='text-gray-500' onClick={(e) => handleWishlistClick(e, product.id)} />
                )}
              </div>

              {/* Product details */}
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <div className='mt-4'>
                  {/* Product price and rating */}
                  <span className='text-yellow-500 font-bold'>${product.price}</span>
                  <span className='text-gray-600 ml-2'>Rating: {product.rating.rate} ({product.rating.count})</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
