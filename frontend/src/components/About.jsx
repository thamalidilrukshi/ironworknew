import React, { useEffect } from 'react';
import '../assets/css/AboutUs.css';
import '../components/Header.jsx';

const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('.about-us');
      const aboutContent = document.querySelector('.about-content');
      const aboutImage = document.querySelector('.about-image img');

      if (aboutSection && aboutContent && aboutImage) {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const sectionBottom = aboutSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Check if the section is in the viewport
        if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
          aboutContent.classList.add('fade-in');
          aboutImage.classList.add('image-zoom');
        } else {
          aboutContent.classList.remove('fade-in');
          aboutImage.classList.remove('image-zoom');
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Trigger the animation on initial load if the section is already in view
    handleScroll();

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="about-header">
        <div className="header-content">
          <h1>Iron Work Construction</h1>
          <p>Expert Solutions for Residential, Commercial & Industrial Projects</p>
          <a href="#projects" className="cta-button">View Our Projects</a>
        </div>
      </header>

      {/* About Section */}
      <section className="about-us">
        <div className="about-container">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Expert Ironwork Solutions for Every Project</h3>
              <p>
                At Iron Work Construction, we pride ourselves on delivering top-notch ironwork solutions tailored to meet the unique needs of our clients. With over 20 years of experience in the industry, we have built a reputation for excellence, reliability, and innovation.
              </p>
              <p>
                Our team of skilled craftsmen and engineers are dedicated to providing high-quality, durable metal structures that stand the test of time. Whether it's a custom iron gate for your home or a large-scale steel structure for a commercial project, we have the expertise to bring your vision to life.
              </p>
              <p>
                We use only the finest materials and state-of-the-art technology to ensure that every project we undertake meets the highest standards of quality and safety. Our commitment to customer satisfaction is unwavering, and we work closely with our clients to ensure that their needs are met every step of the way.
              </p>
              <ul className="about-features">
                <li>Custom Ironwork Design & Fabrication</li>
                <li>Residential, Commercial & Industrial Projects</li>
                <li>High-Quality Materials & Craftsmanship</li>
                <li>On-Time Delivery & Installation</li>
                <li>Competitive Pricing & Free Consultations</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="images/107bc9d02bb775659cc534dacf6b2414.jpg" alt="Iron Work Construction" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Our Recent Projects</h2>
        <div className="projects-container">
          <div className="project-item">
            <img src="images/my.jpg" alt="Project 1" />
            <div className="project-info">
              <h3>Commercial Steel Building</h3>
              <p>High-quality steel structure for a large commercial building project.</p>
            </div>
          </div>
          <div className="project-item">
            <img src="images/ny.jpg" alt="Project 2" />
            <div className="project-info">
              <h3>Residential Iron Fencing</h3>
              <p>Custom iron fencing for residential properties, combining aesthetics and security.</p>
            </div>
          </div>
          <div className="project-item">
            <img src="images/my.jpg" alt="Project 3" />
            <div className="project-info">
              <h3>Industrial Steel Structure</h3>
              <p>Strong and durable steel structure for an industrial complex.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;