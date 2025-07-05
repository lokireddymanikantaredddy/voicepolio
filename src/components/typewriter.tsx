import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  onDone?: () => void;
  onProgress?: (current: string) => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 10, onDone, onProgress }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const next = prev + text[i];
        if (onProgress) onProgress(next);
        return next;
      });
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone, onProgress]);

  return <span>{displayed}</span>;
};

export default Typewriter; 