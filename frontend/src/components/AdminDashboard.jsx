import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetching dashboard message
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/admin/dashboard", {
      method: "GET",
      headers: { "x-access-token": token },
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  // Fetch all uploaded images
  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((response) => response.json())
      .then((data) => setUploadedImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Handling file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload image
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.file) {
        setUploadedImages((prev) => [...prev, data.file]); // Add new image
        alert("Image uploaded successfully!");
      } else {
        alert("Error uploading image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <br /><br /><br />
      <h2>Admin Dashboard</h2>
      <p>{message}</p>

      {/* Image Upload Form */}
      <h3>Upload Image</h3>
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>

      {/* Display Uploaded Images */}
      <div>
        <h3>Uploaded Images</h3>
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:3001/image/${image.filename}`}
              alt={`Uploaded ${index}`}
              style={{ maxWidth: "300px", margin: "10px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
