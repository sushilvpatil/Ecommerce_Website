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
        const filteredProducts = response.filter((product) => wishlist.includes(product.id));
        setWishlistProducts(filteredProducts);
      } catch (error) {
        alert('Something went wrong while fetching wishlist items.');
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  const handleWishlistItemClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <p className="text-center text-gray-600">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg p-4 cursor-pointer relative bg-white"
              onClick={() => handleWishlistItemClick(product.id)}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* Remove from Wishlist Button */}
              <div className="absolute top-2 right-2">
                <FaTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                
                {/* Price and Rating */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-600">⭐ {product.rating.rate} ({product.rating.count})</span>
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
