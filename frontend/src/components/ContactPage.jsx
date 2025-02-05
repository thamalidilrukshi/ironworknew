import React, { useState } from "react";
import "../assets/css/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Contact information submitted successfully');
        setFormData({ name: "", contactNumber: "", email: "", message: "" }); // Clear form
      } else {
        alert(data.error || 'Failed to submit contact information');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info1">
          <h2>Contact Information</h2>
          <p>
            <i className="fas fa-map-marker-alt"></i> 468/3F Piliyandala – Maharagama Road, Maharagama, Sri Lanka
          </p>
          <p>
            <i className="fas fa-phone-alt"></i> 0113 460 611
          </p>
          <p>
            <i className="fas fa-mobile-alt"></i> 076 202 4767 | 0776 755 788 | 071 45 99 130
          </p>
          <p>
            <i className="fas fa-envelope"></i> bestariron@gmail.com
          </p>
          <p>
            <i className="fas fa-envelope"></i> bestarironworks@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
