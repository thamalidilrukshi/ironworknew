import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../assets/css/ContactPage.css";

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l7dzkia",  // Your Service ID
        "template_3420iv3",  // Your Template ID
        form.current,
        "NaveT_Dl86Jixkw94" // Your Public Key
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          alert("Email sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send email.");
        }
      );
  };

  return (
    <>
      <div className="container">
        <br/><br/>
        <h2>Customer Details Form</h2>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name:</label>
          <input type="text" name="name" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Phone:</label>
          <input type="text" name="phone" required />

          <label>Message:</label>
          <textarea name="message" required></textarea>

          <button type="submit">Submit</button>
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
    </>
  );
};

export default ContactPage;
