import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [details, setDetails] = useState({
    title: 'Simply React',
    description: 'This is a React-based website.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSave = () => {
    alert('Details saved!');
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* <label>
        Title:
        <input
          type="text"
          name="title"
          value={details.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={details.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <br />
      <button onClick={handleSave}>Save</button> */}
      <br/><br/>
      <Link to="/AdminDashboard">Admin</Link><br/>
      <Link to="/Customers">User</Link>
    </div>
  );
};

export default AdminPanel;
