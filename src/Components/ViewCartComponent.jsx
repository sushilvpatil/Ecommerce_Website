import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

const ViewCartComponent = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Function to increment quantity
  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  // Function to decrement quantity
  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg shadow-lg p-4 relative bg-white">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                
                {/* Price and Total */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                    onClick={() => handleDecrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                    onClick={() => handleIncrementQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCartComponent;
