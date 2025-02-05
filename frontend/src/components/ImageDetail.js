import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/css/ImageDetail.css';

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/image/${id}`);
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image details:', error.message);
      }
    };
    fetchImage();
  }, [id]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-detail">
      <h1>{image.name}</h1>
      <img
        src={`http://localhost:3001${image.filepath}`}
        alt={image.filename}
        className="detail-image"
      />
      <p>{image.description}</p>
    </div>
  );
};

export default ImageDetail;