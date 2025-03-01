import React, { useState } from 'react';
import { PostRequest } from '../ApiRequests'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

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
    phone: '',
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
          geolocation: {
            lat: formData.lat,
            long: formData.long,
          },
        },
        phone: formData.phone,
      };

      // Send the registration request
      const response = await PostRequest('users', data);
      if (response) {
        alert('Registration Successful');
        navigate('/login'); // Redirect to login page after success
      }
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl text-white font-bold mb-6">Registration</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Input Fields */}
        {[
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'username', type: 'text', placeholder: 'Username' },
          { name: 'password', type: 'password', placeholder: 'Password' },
          { name: 'firstname', type: 'text', placeholder: 'First Name' },
          { name: 'lastname', type: 'text', placeholder: 'Last Name' },
          { name: 'city', type: 'text', placeholder: 'City' },
          { name: 'street', type: 'text', placeholder: 'Street' },
          { name: 'number', type: 'number', placeholder: 'Number' },
          { name: 'zipcode', type: 'text', placeholder: 'Zip Code' },
          { name: 'lat', type: 'text', placeholder: 'Latitude' },
          { name: 'long', type: 'text', placeholder: 'Longitude' },
          { name: 'phone', type: 'text', placeholder: 'Phone' },
        ].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="border-2 border-white rounded-lg p-2 text-white placeholder-white bg-transparent"
            required
          />
        ))}

        {/* Submit Button */}
        <button type="submit" className="bg-yellow-500 text-white rounded-lg p-2 hover:bg-yellow-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
