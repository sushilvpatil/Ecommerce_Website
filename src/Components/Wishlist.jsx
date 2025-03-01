import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetRequest } from '../ApiRequests';
import { FaTrash } from 'react-icons/fa';

const Wishlist = ({ wishlist, toggleWishlist }) => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await GetRequest('products');
        const filteredProducts = response.filter(product => wishlist.includes(product.id));
        setWishlistProducts(filteredProducts);
      } catch (error) {
        alert("something went wrong");
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  const handleWishlistItemClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p className='text-center text-gray-600'>No items in wishlist</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg shadow-lg p-4 cursor-pointer relative'
              onClick={() => handleWishlistItemClick(product.id)}
            >
              <img src={product.image} alt={product.title} className='w-full h-48 object-cover rounded-t-lg' />
              <div className='absolute top-2 right-2'>
                <FaTrash className='text-red-500' onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} />
              </div>
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
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

export default Wishlist;