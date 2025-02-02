import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAudio } from "../AudioContext";
import "./QuestionPage.css";

// Import images
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.jpg";
import loveLetter from "../assets/love_letter.jpg"; // Import love letter image

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

export default function QuestionPage() {
  const navigate = useNavigate();
  const { setIsPlaying } = useAudio();
  const [showModal, setShowModal] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fallingImages, setFallingImages] = useState([]);
  const [isHeartbroken, setIsHeartbroken] = useState(false);
  const [isNoClicked, setIsNoClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "0px", left: "0px" });

  useEffect(() => {
    const generateFallingImages = () => {
      setFallingImages(
        images.map((image) => ({
          src: image,
          left: `${Math.random() * 90 + 5}%`,
          delay: Math.random() * 3,
          duration: Math.random() * 4 + 3,
        }))
      );
    };
    generateFallingImages();
  }, []);

  const openModal = (image) => {
    if (isHeartbroken) return;
    setSelectedImage(image);
    setShowModal(true);
  };

  const moveNoButton = () => {
    setIsNoClicked(true);
    const newTop = `${Math.random() * 60 + 20}%`;
    const newLeft = `${Math.random() * 60 + 20}%`;
    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="full-page"
      style={{
        backgroundImage: `url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHQ0OTBoZ2pybHppNm10bm02NjR6MHViYzVrMzEzcjc0dnEweDc4MSZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/Y80iPTzJSLa9YOgBI9/giphy.gif')`,
      }}
    >
      {fallingImages.map((img, index) => (
        <motion.img
          key={index}
          src={img.src}
          alt="floating"
          className={`heart-image ${isHeartbroken ? "disabled" : ""}`}
          onClick={() => openModal(img.src)}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: [0, window.innerHeight - 50], opacity: [1, 1, 0] }}
          transition={{ duration: img.duration, delay: img.delay, repeat: Infinity }}
          style={{ left: img.left, top: 0, pointerEvents: isHeartbroken ? "none" : "auto" }}
        />
      ))}

      <div className="valentine-container">
        <motion.h1
          className="valentine-text"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          Will you be my Valentine? 💖
        </motion.h1>

        <div className="button-container">
          <motion.button
            onClick={() => {
              setIsPlaying(true);
              setTimeout(() => navigate("/date-ideas"), 1000);
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="modal-button yes"
          >
            YES 💕
          </motion.button>

          <motion.button
            onClick={moveNoButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="modal-button no"
            style={{
              position: isNoClicked ? "absolute" : "relative",
              transition: "top 0.3s ease, left 0.3s ease",
              ...noButtonPosition,
            }}
          >
            NO 💔
          </motion.button>
        </div>

        {/* Heart-shaped button */}
        <motion.button
          className="heart-button"
          onClick={() => setShowHeartModal(true)}
          whileHover={{ scale: 1.2 }}
        >
          💌 Click Me
        </motion.button>
      </div>

      {showModal &&
        createPortal(
          <div className="modal">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-content"
            >
              {isHeartbroken ? (
                <div className="heartbroken-message">
                  <h2>💔 I'm heartbroken... 💔</h2>
                  <p>Why would you say no? 😭</p>
                </div>
              ) : (
                selectedImage && <img src={selectedImage} alt="Selected" className="modal-image" />
              )}
              <button onClick={() => setShowModal(false)} className="modal-close">
                Close
              </button>
            </motion.div>
          </div>,
          document.body
        )}

      {showHeartModal &&
        createPortal(
          <div className="modal">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="heart-modal-content"
            >
              <img src={loveLetter} alt="Love Letter" className="modal-image" />
              <button onClick={() => setShowHeartModal(false)} className="modal-close">
                Close
              </button>
            </motion.div>
          </div>,
          document.body
        )}
    </motion.div>
  );
}
