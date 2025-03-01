import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'https://fakestoreapi.com/';

export default BASE_URL;

/**
 * Function to make a GET request to the API
 * @param {string} url - The endpoint to fetch data from
 * @returns {Promise<any>} - Returns response data or an error message
 */
export const GetRequest = async (url) => {
  try {
    const response = await axios.get(BASE_URL + url); // Sending GET request
    return response.data; // Returning the response data
  } catch (error) {
    // Handling different types of errors
    if (error.response) {
      // If the server responds with an error status
      return error.response.data?.message || "Something went wrong!";
    } else if (error.request) {
      // If no response was received
      return "No response from server. Please try again later.";
    } else {
      // If another unexpected error occurs
      return "An unexpected error occurred.";
    }
  }
};

/**
 * Function to make a POST request to the API
 * @param {string} url - The endpoint to send data to
 * @param {object} data - The data to be sent in the request body
 * @returns {Promise<any>} - Returns response data or an error message
 */
export const PostRequest = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data); // Sending POST request
    return response.data; // Returning the response data
  } catch (error) {
    // Handling different types of errors
    if (error.response) {
      // If the server responds with an error status
      return error.response.data?.message || "Invalid credentials! Please try again.";
    } else if (error.request) {
      // If no response was received
      return "No response from server. Please try again later.";
    } else {
      // If another unexpected error occurs
      return "An unexpected error occurred.";
    }
  }
};
