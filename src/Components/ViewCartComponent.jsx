import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

const ViewCartComponent = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-center text-gray-600'>Your cart is empty</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {cartItems.map((item) => (
            <div key={item.id} className='border rounded-lg shadow-lg p-4 relative'>
              <img src={item.image} alt={item.title} className='w-full h-48 object-cover rounded-t-lg' />
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>{item.title}</h2>
                <div className='mt-4'>
                  <span className='text-yellow-500 font-bold'>${item.price * item.quantity}</span>
                  <div className='flex items-center mt-2'>
                    <button
                      className='bg-gray-300 text-gray-700 py-1 px-2 rounded'
                      onClick={() => handleDecrementQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      className='bg-gray-300 text-gray-700 py-1 px-2 rounded'
                      onClick={() => handleIncrementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className='absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded'
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