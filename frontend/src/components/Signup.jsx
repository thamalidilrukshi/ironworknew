import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = formData; // Destructure form data
      const response = await axios.post('http://localhost:3001/Signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('User created successfully');
        alert('Sign-Up Successful!');
        setFormData({ name: '', email: '', password: '' }); // Reset form
        navigate('/Loging'); // Redirect to login page
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('Email already exists. Please use a different email.');
      } else {
        console.error('Error:', err.message);
      }
    }
  };

  const formStyles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#00bcd4',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    loginLink: {
      display: 'block',
      marginTop: '15px',
      textAlign: 'center',
      textDecoration: 'none',
      color: '#00bcd4',
    },
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <Navbar1 />
      <div style={formStyles.container}>
        <h2 style={formStyles.heading}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label style={formStyles.label} htmlFor="name">
            Name
          </label>
          <input
            style={formStyles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label style={formStyles.label} htmlFor="email">
            Email
          </label>
          <input
            style={formStyles.input}
            type="email"
            id="email"
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
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button style={formStyles.button} type="submit">
            Sign Up
          </button>
        </form>
        <Link to="/loging" style={formStyles.loginLink}>
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
