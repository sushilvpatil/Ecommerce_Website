import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Products = ({ products, wishlist, toggleWishlist }) => {
  const navigate = useNavigate();

  // Navigate to the product details page when a product is clicked
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Display a message if no products are found */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No data found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg p-4 cursor-pointer relative"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* Wishlist Toggle (Heart Icon) */}
              <div className="absolute top-2 right-2">
                {wishlist.includes(product.id) ? (
                  <FaHeart
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigation when clicking the heart icon
                      toggleWishlist(product.id);
                    }}
                  />
                ) : (
                  <FaRegHeart
                    className="text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  />
                )}
              </div>

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>

                {/* Product Price and Rating */}
                <div className="mt-4">
                  <span className="text-yellow-500 font-bold">${product.price}</span>
                  <span className="text-gray-600 ml-2">
                    Rating: {product.rating.rate} ({product.rating.count})
                  </span>
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
