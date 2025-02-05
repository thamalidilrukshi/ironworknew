import React from 'react';
import '../assets/css/Services.css'; // Import the CSS file for styling

import Header from './Header.jsx';

const Services = () => {
  const servicesList = [
    {
      title: 'Custom Iron Gates',
      description: 'Design and fabrication of bespoke iron gates tailored to your specifications.',
      image: 'images/1.jpg', // Update the image path
    },
    {
      title: 'Railings and Balconies',
      description: 'Crafting durable and elegant railings and balconies for residential and commercial properties.',
      image: 'images/railings-and-balconies.jpg', // Update the image path
    },
    {
      title: 'Iron Fencing',
      description: 'Installation of high-quality iron fencing to enhance security and aesthetics.',
      image: 'images/iron-fencing.jpg', // Update the image path
    },
    {
      title: 'Metal Fabrication',
      description: 'Custom metal fabrication services for various structural and decorative needs.',
      image: 'images/metal-fabrication.jpg', // Update the image path
    },
  ];

  return (
    <div className="services-container">
      <Header /><br /><br/><br/>
      <h1>Our Services</h1>
      <div className="services-list">
        {servicesList.map((service, index) => (
          <div key={index} className="service-item">
            <img src={`/${service.image}`} alt={service.title} className="service-image" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
