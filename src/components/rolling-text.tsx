
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const roles = [
  { title: "Full Stack Developer", color: "text-blue-500 dark:text-blue-400" },
  { title: "MERN Stack Developer", color: "text-green-500 dark:text-green-400" },
  { title: "Web Developer", color: "text-purple-500 dark:text-purple-400" }
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
    <div className="h-8 overflow-hidden text-2xl font-semibold">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index].title}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${roles[index].color} inline-block`}
        >
          {roles[index].title}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
