import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="contact-info">
          <span>Email us: info@example.com</span>
          <span>Call us: +94770151250</span>
        </div>
        <div className="social-icons">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <nav className="navbar">
        <div className="logo">
          <img src="../images/1738642211471.png" alt="Brixel Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Services">Services</Link></li>
          <li><Link to="/ImageGallery">Projects</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;