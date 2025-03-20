// This file contains example functions to call your backend APIs.

export const signIn = async (email, password) => {
  try {
    const response = await fetch("/api/signin", {
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
    const response = await fetch("/api/signup", {
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
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error uploading reports:", error);
  }
};
