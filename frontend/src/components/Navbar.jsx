import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar1() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333",
      padding: "10px 20px",
    },
    logo: {
      color: "white",
      fontSize: "24px",
      textDecoration: "none",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "15px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "18px",
      transition: "color 0.3s",
    },
    navLinkHover: {
      color: "#00bcd4",
    },
    signup: {
      backgroundColor: "#00bcd4",
      color: "white",
      padding: "5px 10px",
      borderRadius: "4px",
      textDecoration: "none",
      transition: "background-color 0.3s",
    },
    login: {
      backgroundColor: "transparent",
      border: "1px solid #00bcd4",
      color: "white",
      padding: "5px 10px",
      borderRadius: "4px",
      textDecoration: "none",
      transition: "background-color 0.3s, color 0.3s",
    },
  };

  return (
    <nav style={styles.navbar}>
      
      <ul style={styles.navLinks}>
        <li>
          <a href="#" style={styles.navLink}>Home</a>
        </li>
       
        
        <li>
          <a href="/signup" style={styles.signup}>Sign Up</a>
        </li>
        <li>
          <a href="/loging" style={styles.login}>Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar1;
