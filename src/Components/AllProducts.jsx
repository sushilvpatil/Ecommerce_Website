import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetRequest } from '../ApiRequests';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const AllProducts = ({ wishlist, toggleWishlist }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const GetAllProducts = useCallback(async () => {
    try {
      const response = await GetRequest('products');
      setProducts(response);
    } catch (error) {
      alert("something went wrong");
    }
  }, []);

  useEffect(() => {
    GetAllProducts();
  }, [GetAllProducts]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>All Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.length === 0 ? (
          <p className='text-center text-gray-600'>No data found</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg shadow-lg p-4 cursor-pointer relative'
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.title} className='w-full h-48 object-cover rounded-t-lg' />
              <div className='absolute top-2 right-2'>
                {wishlist?.includes(product.id) ? (
                  <FaHeart className='text-red-500' onClick={(e) => handleWishlistClick(e, product.id)} />
                ) : (
                  <FaRegHeart className='text-gray-500' onClick={(e) => handleWishlistClick(e, product.id)} />
                )}
              </div>
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <div className='mt-4'>
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