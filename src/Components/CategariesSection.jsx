import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategariesSectionData from './LocalData/CategariesSectionData';
import { GetRequest } from '../ApiRequests'; 

const CategariesSection = ({ setSearchResults }) => {
  const navigate = useNavigate();

  const handleCategoryClick = async (category) => {
    try {
      const data = await GetRequest('products');
      let filteredProducts;
      if (category === "Kids") {
        filteredProducts = data.filter(product => product.category === "men's clothing");
      } else if(category==="Women") {
        filteredProducts = data.filter(product => product.category==="women's clothing");
      }
      else {
        filteredProducts = data.filter(product => product.category === "men's clothing");
      }
      setSearchResults(filteredProducts);
      navigate("/products");
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer'>
        {CategariesSectionData.map((data, index) => (
          <div
            key={index}
            className='relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer'
            onClick={() => handleCategoryClick(data.title)}
          >
            <img src={data.ImageUrl} alt="" className='w-full h-full object-cover rounded-lg shadow-md' />
            <div className='absolute top-2 left-2 text-white'>
              <p className='text-xl font-bold'>{data.title}</p>
              <p className='text-yellow-500'>View All</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategariesSection;