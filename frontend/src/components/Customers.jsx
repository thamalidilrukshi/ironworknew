import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Customers.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logout from "./Logout";

const Customers = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch contacts from the backend
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first.");
      navigate("/Loging"); // Redirect to login page
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/contacts", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        });
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contacts.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="customers-container">
      <h1>Customer Contacts</h1>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.contactNumber}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Logout />
    </div>
  );
};

export default Customers;