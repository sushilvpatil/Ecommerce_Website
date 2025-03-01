import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Products = ({ products, wishlist, toggleWishlist }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>
      {products.length === 0 ? (
        <p className='text-center text-gray-600'>No data found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg shadow-lg p-4 cursor-pointer relative'
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.title} className='w-full h-48 object-cover rounded-t-lg' />
              <div className='absolute top-2 right-2'>
                {wishlist.includes(product.id) ? (
                  <FaHeart className='text-red-500' onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} />
                ) : (
                  <FaRegHeart className='text-gray-500' onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} />
                )}
              </div>
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                {/* <p className='text-gray-600 mt-2'>{product.description}</p> */}
                <div className='mt-4'>
                  <span className='text-yellow-500 font-bold'>${product.price}</span>
                  <span className='text-gray-600 ml-2'>Rating: {product.rating.rate} ({product.rating.count})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;