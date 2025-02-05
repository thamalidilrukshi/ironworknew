import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ImageUploader.css'; // Ensure you have this CSS file for styling
import Logout from './Logout';


const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingImage, setEditingImage] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/Login'); // Corrected typo from 'Loging' to 'Login'
    }

    // Fetch images from server on component mount
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
      }
    };

    fetchImages();
  }, [navigate]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !name || !description) {
      setError('Please fill all fields and select an image to upload!');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success:', response.data);
      setSuccess('Image uploaded successfully!');
      // Fetch updated list of images after upload
      const newImages = await axios.get('http://localhost:3001/images');
      setImages(newImages.data);
      // Clear form fields
      setImage(null);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`http://localhost:3001/image/${imageId}`);
        console.log('Image deleted');
        setSuccess('Image deleted successfully!');
        // Remove the deleted image from the state
        setImages((prevImages) => prevImages.filter((img) => img._id !== imageId));
      } catch (error) {
        console.error('Error deleting image:', error);
        setError('Failed to delete image. Please try again.');
      }
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setName(image.name);
    setDescription(image.description);
  };

  const handleUpdate = async () => {
    if (!name || !description) {
      setError('Please fill all fields!');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('name', name);
    formData.append('description', description);

    try {
      const response = await axios.put(`http://localhost:3001/image/${editingImage._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update success:', response.data);
      setSuccess('Image updated successfully!');
      // Fetch updated list of images after update
      const newImages = await axios.get('http://localhost:3001/images');
      setImages(newImages.data);
      // Clear form fields
      setImage(null);
      setName('');
      setDescription('');
      setEditingImage(null);
    } catch (error) {
      console.error('Error updating image:', error);
      setError('Failed to update image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-uploader-container">
      <br/><br/><br/><br/>
      <h1>Image Uploader</h1>
      <Logout />
      <div className="upload-form">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/gif"
          className="file-input"
        />
        <input
          type="text"
          placeholder="Enter image name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-input"
        />
        <textarea
          placeholder="Enter image description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-input"
        />
        {editingImage ? (
          <button onClick={handleUpdate} disabled={isLoading} className="upload-button">
            {isLoading ? 'Updating...' : 'Update Image'}
          </button>
        ) : (
          <button onClick={handleUpload} disabled={isLoading} className="upload-button">
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="image-gallery">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img
              src={`http://localhost:3001${image.filepath}`}
              alt={`uploaded img ${image._id}`}
              className="gallery-image"
            />
            <h3>{image.name}</h3>
            <p>{image.description}</p>
            <button onClick={() => handleEdit(image)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDelete(image._id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;