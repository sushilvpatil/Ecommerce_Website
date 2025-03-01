import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const products = useSelector((state) => state.products.items); // Fetch product list from Redux store
  const product = products.find((item) => item.id === parseInt(productId)); // Find the product by ID
  const dispatch = useDispatch();

  // Display a message if the product is not found
  if (!product) {
    return <div className="text-center text-red-500 text-lg">Product not found</div>;
  }

  // Handle adding product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-500">
      <div className="flex flex-col md:flex-row">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <span className="text-yellow-500 font-bold text-xl">${product.price}</span>

          {/* Add to Cart Button */}
          <button
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
