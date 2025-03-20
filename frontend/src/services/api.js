// For local development, if your backend is running on port 5000:
const BASE_URL = "http://localhost:5000";

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const uploadReports = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("reports", file);
  });

  try {
    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error uploading reports:", error);
  }
};
