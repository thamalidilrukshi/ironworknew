// Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    alert("Logged out successfully!");
    navigate("/Loging"); // Redirect to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>You are logged in</h2>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#00bcd4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
