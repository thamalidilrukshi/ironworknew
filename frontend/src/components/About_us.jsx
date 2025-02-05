// import React from "react";
// import { motion } from "framer-motion";
// import { FaHammer, FaTools, FaLightbulb, FaShieldAlt } from 'react-icons/fa'; // Importing icons

// const AboutUs = () => {
//   return (
//     <div className="about-us-page" style={styles.container}>
//       {/* About Section */}
//       <section style={styles.aboutSection}>
//         <div style={styles.aboutContent}>
//           {/* Image */}
//           <motion.div
//             style={styles.imageContainer}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{
//               duration: 1.5,
//               ease: "easeInOut",
//             }}
//           >
//             <img
//               src="/images/1.jpg" // Replace with construction-related image
//               alt="Ceylone Engineering Team"
//               style={styles.image}
//             />
//           </motion.div>

//           {/* Text Content */}
//           <motion.div
//             style={styles.textContent}
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{
//               duration: 1.5,
//               ease: "easeInOut",
//               delay: 0.2,
//             }}
//           >
//             <h2 style={styles.heading}>Who We Are</h2>
//             <p style={styles.paragraph}>
//               At Ceylone Engineering, we’ve been crafting top-notch ironworks for over 15 years. 
//               From custom gates to intricate railings, we combine tradition, technology, and passion 
//               to deliver excellence. Our mission is to enhance every space with durable, elegant, and 
//               bespoke iron creations.
//             </p>
//             <p style={styles.paragraph}>
//               Our commitment to craftsmanship and innovation sets us apart, and we pride ourselves 
//               on providing reliable solutions for construction projects of all sizes. We serve 
//               residential, commercial, and industrial clients, ensuring that every piece of work 
//               we do meets the highest standards.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section style={styles.highlightsSection}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         >
//           <h3 style={styles.highlightsHeading}>Why Choose Us?</h3>
//           <p style={styles.highlightsDescription}>
//             Here’s why our clients trust us for their construction and ironworks needs:
//           </p>
//         </motion.div>

//         <div style={styles.highlights}>
//           {[
//             { icon: <FaHammer size={50} />, title: 'Expertise', description: '15 years of delivering durable, high-quality ironworks.' },
//             { icon: <FaTools size={50} />, title: 'Precision', description: 'Cutting-edge tools and skilled craftsmen ensure perfect results.' },
//             { icon: <FaLightbulb size={50} />, title: 'Innovation', description: 'Modern designs and techniques tailored to today’s needs.' },
//             { icon: <FaShieldAlt size={50} />, title: 'Durability', description: 'Built to withstand the toughest environments.' }
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               style={styles.highlight}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 + index * 0.3, duration: 1.5 }}
//             >
//               <div style={styles.iconContainer}>{item.icon}</div>
//               <h4>{item.title}</h4>
//               <p>{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "'Roboto', sans-serif",
//     color: "#333",
//     lineHeight: "1.6",
//     backgroundColor: "#f7f7f7",
//     padding: "20px",
//   },
//   aboutSection: {
//     padding: "40px 20px",
//     backgroundColor: "#e2e2e2",
//     borderRadius: "10px",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//     marginBottom: "40px",
//   },
//   aboutContent: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     maxWidth: "1200px",
//     margin: "auto",
//     gap: "20px",
//   },
//   imageContainer: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//   },
//   textContent: {
//     flex: 1,
//     textAlign: "left",
//     padding: "20px",
//   },
//   image: {
//     width: "100%",
//     maxWidth: "500px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   },
//   heading: {
//     fontSize: "2.5rem",
//     fontWeight: "bold",
//     marginBottom: "1rem",
//     color: "#f0a500", // Construction-related theme color
//   },
//   paragraph: {
//     fontSize: "1.1rem",
//     marginBottom: "1.5rem",
//     color: "#444",
//   },
//   highlightsSection: {
//     padding: "40px 20px",
//     backgroundColor: "#ffffff",
//     textAlign: "center",
//     borderRadius: "10px",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//   },
//   highlightsHeading: {
//     fontSize: "2.2rem",
//     fontWeight: "bold",
//     color: "#f0a500",
//     marginBottom: "1rem",
//   },
//   highlightsDescription: {
//     fontSize: "1.1rem",
//     marginBottom: "2rem",
//     color: "#333",
//   },
//   highlights: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: "20px",
//   },
//   highlight: {
//     flex: "1 1 calc(50% - 40px)",
//     maxWidth: "250px",
//     padding: "20px",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     transition: "transform 0.3s ease",
//   },
//   iconContainer: {
//     marginBottom: "15px",
//     color: "#f0a500", // Bright icon color to match the theme
//   },
// };

// export default AboutUs;
import React from "react";
import { motion } from "framer-motion";
import { FaHammer, FaTools, FaLightbulb, FaShieldAlt } from 'react-icons/fa'; // Importing icons

const AboutUs = () => {
  return (
    <div className="about-us-page" style={styles.container}>
      {/* About Section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          {/* Image */}
          <motion.div
            style={styles.imageContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <img
              src="/images/1.jpg" // Replace with construction-related image
              alt="Ceylone Engineering Team"
              style={styles.image}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={styles.textContent}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <h2 style={styles.heading}>Who We Are</h2>
            <p style={styles.paragraph}>
              At Ceylone Engineering, we’ve been crafting top-notch ironworks for over 15 years. 
              From custom gates to intricate railings, we combine tradition, technology, and passion 
              to deliver excellence. Our mission is to enhance every space with durable, elegant, and 
              bespoke iron creations.
            </p>
            <p style={styles.paragraph}>
              Our commitment to craftsmanship and innovation sets us apart, and we pride ourselves 
              on providing reliable solutions for construction projects of all sizes. We serve 
              residential, commercial, and industrial clients, ensuring that every piece of work 
              we do meets the highest standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={styles.highlightsSection}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <h3 style={styles.highlightsHeading}>Why Choose Us?</h3>
          <p style={styles.highlightsDescription}>
            Here’s why our clients trust us for their construction and ironworks needs:
          </p>
        </motion.div>

        <div style={styles.highlights}>
          {[ 
            { icon: <FaHammer size={50} />, title: 'Expertise', description: '15 years of delivering durable, high-quality ironworks.' },
            { icon: <FaTools size={50} />, title: 'Precision', description: 'Cutting-edge tools and skilled craftsmen ensure perfect results.' },
            { icon: <FaLightbulb size={50} />, title: 'Innovation', description: 'Modern designs and techniques tailored to today’s needs.' },
            { icon: <FaShieldAlt size={50} />, title: 'Durability', description: 'Built to withstand the toughest environments.' }
          ].map((item, index) => (
            <motion.div
              key={index}
              style={styles.highlight}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.3, duration: 1.5 }}
            >
              <div style={styles.iconContainer}>{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
    lineHeight: "1.6",
    backgroundColor: "#f7f7f7",
    padding: "20px",
  },
  aboutSection: {
    padding: "40px 20px",
    backgroundColor: "#e2e2e2",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    marginBottom: "40px",
  },
  aboutContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "auto",
    gap: "20px",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
    textAlign: "left",
    padding: "20px",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#f0a500", // Construction-related theme color
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
    color: "#444",
  },
  highlightsSection: {
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
  highlightsHeading: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "#f0a500",
    marginBottom: "1rem",
  },
  highlightsDescription: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#333",
  },
  highlights: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  highlight: {
    flex: "1 1 calc(50% - 40px)",
    maxWidth: "250px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  iconContainer: {
    marginBottom: "15px",
    color: "#f0a500", // Bright icon color to match the theme
  },

  // Responsive Design
  "@media (max-width: 768px)": {
    aboutContent: {
      flexDirection: "column",
      textAlign: "center",
    },
    highlights: {
      flexDirection: "column",
      alignItems: "center",
    },
    heading: {
      fontSize: "2rem",
    },
    paragraph: {
      fontSize: "1rem",
    },
    highlightsHeading: {
      fontSize: "2rem",
    },
    highlightsDescription: {
      fontSize: "1rem",
    },
    image: {
      maxWidth: "10%",
    },
  },

  "@media (max-width: 480px)": {
    heading: {
      fontSize: "1.8rem",
    },
    paragraph: {
      fontSize: "0.9rem",
    },
    highlightsHeading: {
      fontSize: "1.8rem",
    },
    highlightsDescription: {
      fontSize: "0.9rem",
    },
    highlight: {
      maxWidth: "100%",
      padding: "15px",
    },
  },
};

export default AboutUs;
