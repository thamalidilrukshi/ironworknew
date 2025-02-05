import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Loging = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Redirect to AdminPanel if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/AdminPanel");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:3001/Login", formData);
      const { token } = response.data;

      if (!token) {
        throw new Error("No token received from the server");
      }

      localStorage.setItem("token", token);
      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/AdminPanel");
      }, 2000);
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        setError(err.response.data.error || "Invalid email or password");
      } else if (err.message === "No token received from the server") {
        setError("Login failed. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const formStyles = {
    container: {
      width: "100%",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#00bcd4",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    alert: {
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    successAlert: {
      backgroundColor: "#4CAF50",
    },
    errorAlert: {
      backgroundColor: "#f44336",
    },
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.heading}>Login</h2>

      {successMessage && (
        <div style={{ ...formStyles.alert, ...formStyles.successAlert }}>
          {successMessage}
        </div>
      )}
      {error && (
        <div style={{ ...formStyles.alert, ...formStyles.errorAlert }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <label style={formStyles.label} htmlFor="email">
          Email
        </label>
        <input
          style={formStyles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label style={formStyles.label} htmlFor="password">
          Password
        </label>
        <input
          style={formStyles.input}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button style={formStyles.button} type="submit">
          Login
        </button>
      </form>

      <Logout />
    </div>
  );
};

export default Loging;