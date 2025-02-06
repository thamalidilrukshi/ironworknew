import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const CustomerForm = () => {
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
    <div className="container">
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
  );
};

export default CustomerForm;
