import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Sign Up API call (using axios)
export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign In API call (using axios)
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// File Upload API call (using axios)
export const uploadReports = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading reports:", error);
    throw error;
  }
};
