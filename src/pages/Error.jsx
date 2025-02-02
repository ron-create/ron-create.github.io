import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binaryChars = "01";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(drawMatrix, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Background */}
      <canvas
        id="matrixCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></canvas>

      {/* Glitchy Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "url(https://media1.tenor.com/m/1vkyYsjSLfcAAAAC/glitch-error.gif)",
          backgroundSize: "cover",
          opacity: 0.15,
          zIndex: 1,
        }}
      ></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center p-6 flex flex-col items-center justify-center z-20"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.h1
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }} // Slower effect
          className="text-red-500 text-4xl font-bold"
        >
          ⚠ ERROR: SYSTEM INFECTED ⚠
        </motion.h1>

        <p className="mt-4 text-lg max-w-lg text-center">
          Possible virus detected. Immediate action required.
          Unauthorized access, data corruption, and security breaches may be occurring.
          Ensure your system is protected against potential cyber threats, malware, and unauthorized modifications.
        </p>
      </motion.div>

      <motion.p
  onClick={() => navigate("/question")}
  whileHover={{ scale: 1.1 }}
  style={{
    position: "absolute",
    top: "63%", // Ensuring absolute positioning
    left: "25%",
    transform: "translateX(-50%)",
    zIndex: 1000, // Highest z-index
    color: "white", // Equivalent to text-white
    fontWeight: "bold", // Equivalent to font-bold
    textDecoration: "underline", // Equivalent to underline
    cursor: "pointer", // Equivalent to cursor-pointer
  }}
>
  Learn More
</motion.p>




    </div>
  );
}
