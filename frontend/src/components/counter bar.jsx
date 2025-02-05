import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import "../assets/css/CounterBar.css"; // Make sure this path is correct

const ConstructionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visibility to true when section comes into view
          observer.disconnect(); // Stop observing once the element is visible
        }
      },
      { threshold: 0.5 } // Trigger the observer when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`construction-section ${isVisible ? "fade-in" : ""}`}
    >
      <div className="content-wrapper1">
        {/* Left Side - Overlapping Images */}
        <div className="image-container1">
          <img
            src="images/4.jpg"
            alt="Construction Work 1"
            className="image1 image-main1"
          />
          <img
            src="images/1.jpg"
            alt="Construction Work 2"
            className="image1 image-secondary1"
          />
        </div>

        {/* Right Side - Text and Counter */}
        <div className="text-and-counter">
          <div className="text-content">
            <h2>
              # BEST <span>CONSTRUCTION</span> THEME
            </h2>
            <p>
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee the pain and trouble.
            </p>
            <button className="btn-buy">BUY NOW</button>
          </div>
          <div className="counter-bar">
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={100} duration={4} />+
              </h2>
              <p>PROJECTS</p>
            </div>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={50} duration={4} />+
              </h2>
              <p>CLIENTS</p>
            </div>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={339} duration={4} />+
              </h2>
              <p>SUCCESS</p>
            </div>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={109} duration={2} />
              </h2>
              <p>AWARDS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSection;
