import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the authentication context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to store authentication token
  const [token, setToken] = useState(null);

  // Effect to load token from local storage when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem('token'); // Retrieve token from localStorage
    if (savedToken) {
      setToken(savedToken); // Set token state if found
    }
  }, []);

  // Function to handle user login
  const login = (newToken) => {
    setToken(newToken); // Update token state
    localStorage.setItem('token', newToken); // Store token in localStorage
  };

  // Function to handle user logout
  const logout = () => {
    setToken(null); // Clear token state
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  // Providing token, login, and logout functions to the app
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
