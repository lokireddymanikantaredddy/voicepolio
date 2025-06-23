"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Web Developer"
];

export function RollingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden text-2xl font-medium text-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index]}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
