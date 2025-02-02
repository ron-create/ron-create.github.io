import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio("/background-music.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.2;

    // Auto-start music only on valid pages (not the error page "/")
    if (location.pathname !== "/") {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    if (isPlaying) {
      audio.play().catch((err) => console.log("Audio autoplay blocked:", err));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, location.pathname]);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
