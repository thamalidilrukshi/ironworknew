import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css'; // Add the CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about-footer">
          <h3>About Us</h3>
          <p>
            We are a trusted construction company offering services to make your dream projects come true. Let's build something amazing together!
          </p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="contact-footer">
          <h3>Contact Us</h3>
          <p>Email: thamalidilrukshi7@gmail.com</p>
          <p>Phone: +94770151250</p>
          <p>Address: Sri Lanka</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Thamali +94770151250. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
