import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/';

export default BASE_URL;

export const GetRequest = async (url) => {
  try {
    const response = await axios.get(BASE_URL + url);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data?.message || "Something went wrong!";
    } else if (error.request) {
      return "No response from server. Please try again later.";
    } else {
      return "An unexpected error occurred.";
    }
  }
};

export const PostRequest = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data?.message || "Invalid credentials! Please try again.";
    } else if (error.request) {
      return "No response from server. Please try again later.";
    } else {
      return "An unexpected error occurred.";
    }
  }
};
