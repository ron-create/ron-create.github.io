import { useState } from 'react';
import { useAudio } from "../AudioContext";
import './dateideas.css';

// Import images from the assets folder
import ronacArtCenterImage from '../assets/ronac5.jpg';
import galaFoodParkImage from '../assets/gala5.jpg';
import binondoDateImage from '../assets/binondo.jpg';

// Import images for the modal (8 images in total)
import ronacImage1 from '../assets/ronac1.jpg';
import ronacImage2 from '../assets/ronac2.jpg';
import ronacImage3 from '../assets/ronac3.jpg';
import ronacImage4 from '../assets/ronac4.jpg';

import galaImage1 from '../assets/gala1.jpg';
import galaImage2 from '../assets/gala2.jpg';
import galaImage3 from '../assets/gala3.jpg';
import galaImage4 from '../assets/gala4.jpg';

export default function DateIdeasPage() {
  const { setIsPlaying } = useAudio();

  // State for handling modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);


  // Function to open the modal and set the respective images
  const openModal = (images) => {
    setModalImages(images);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setModalImages([]);
  };

  const dateIdeas = [
    {
      title: "Ronac Art Center Museum Date Ortigas Ave",
      details: "Address: J24R+V4C, Ortigas Ave, San Juan, 1504 Metro Manila closes at weekends",
      image: ronacArtCenterImage,
      buttonText: "View Details",
      images: [ronacImage1, ronacImage2, ronacImage3, ronacImage4],
    },
    {
      title: "Food Trip Date Gala Food Park Pasay",
      details: "Address: lot4 block2 superblock a cbp 1-a, Pasay, malapit sa double dragon",
      image: galaFoodParkImage,
      buttonText: "View Details",
      images: [galaImage1, galaImage2, galaImage3, galaImage4],
    },
    {
      title: "Recreate Our Binondo Date",
      details: "Here are the walking tour, click to view:",
      image: binondoDateImage,
      buttonText: null,
      link: "https://www.google.com/maps/d/u/0/viewer?mid=1AkkaHN-UwbtkVHTWGbGYyuBtGz21TF0&ll=14.601116190115754%2C120.97545830524972&z=17&fbclid=IwY2xjawIL4GlleHRuA2FlbQIxMAABHT-2fS7ZHmAJ2IYxOQoWYFYHaOcxed26Q7gg1Q9EE3kArtzAZKZulbsq3g_aem_ebAOoY7xZPrdbl3QDduhYw"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Here are some cute date ideas! 💕</h1>
      <div className="card-container">
        {dateIdeas.map((idea, index) => (
          <div key={index} className="card">
            <img src={idea.image} alt={idea.title} className="card-image" />
            <h2 className="card-title">{idea.title}</h2>
            <p className="card-details">{idea.details}</p>
            {idea.buttonText && (
              <button
                onClick={() => openModal(idea.images)} // Open modal with respective images
                className="view-details-btn"
              >
                {idea.buttonText}
              </button>
            )}
            {idea.link && !idea.buttonText && (
              <a
                href={idea.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-details-btn"
              >
                View Walking Tour
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Modal for viewing images */}
      {modalVisible && (
  <div className="modal">
    <div className="modal-content">
      <span className="close-btn" onClick={closeModal}>×</span>
      <div className="modal-images-container">
        {modalImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`modal-${index}`}
            className="modal-image"
            onClick={() => setFullScreenImage(image)} // Set full-screen image on click
          />
        ))}
      </div>
    </div>
  </div>
)}

{fullScreenImage && (
  <div className="full-screen-modal" onClick={() => setFullScreenImage(null)}>
    <img src={fullScreenImage} alt="full-screen" className="full-screen-image" />
  </div>
)}

    </div>
  );
}
