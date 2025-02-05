import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/css/ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="image-gallery" style={{ marginTop: '50px' }}> {/* Adjust margin-top here */}
      <h2>Our Projects</h2>
      <div className="image-grid">
        {images.map((image) => (
          <Link key={image._id} to={`/image/${image._id}`} className="image-item">
            <img
              src={`http://localhost:3001${image.filepath}`}
              alt={image.filename}
              className="image"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;