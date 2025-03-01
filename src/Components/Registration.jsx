import React, { useState } from 'react';
import { PostRequest } from '../ApiRequests'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { responsiveFontSizes } from '@mui/material';
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    lat: '',
    long: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
          geolocation: {
            lat: formData.lat,
            long: formData.long
          }
        },
        phone: formData.phone
      };
      const response = await PostRequest('users', data);
      if(response)
      {
      alert("Registration Success");
      navigate('/login')
      }
    } catch (error) {
      alert("Something went wrong ,Try again");
    }
  };

  return (
    <div className='container mx-auto px-4 py-8' style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D')",
    }}>
      <h1 className='text-2xl text-white font-bold mb-6'>Registration</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='firstname'
          value={formData.firstname}
          onChange={handleChange}
          placeholder='First Name'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='lastname'
          value={formData.lastname}
          onChange={handleChange}
          placeholder='Last Name'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='city'
          value={formData.city}
          onChange={handleChange}
          placeholder='City'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='street'
          value={formData.street}
          onChange={handleChange}
          placeholder='Street'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='number'
          name='number'
          value={formData.number}
          onChange={handleChange}
          placeholder='Number'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='zipcode'
          value={formData.zipcode}
          onChange={handleChange}
          placeholder='Zip Code'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='lat'
          value={formData.lat}
          onChange={handleChange}
          placeholder='Latitude'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='long'
          value={formData.long}
          onChange={handleChange}
          placeholder='Longitude'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone'
          className='border-2 border-white rounded-lg p-2 text-white placeholder-white'
          required
        />
        <button type='submit' className='bg-yellow-500 text-white rounded-lg p-2 hover:bg-yellow-600'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;