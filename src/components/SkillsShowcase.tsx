"use client"
import React from "react";
import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiTypescript, SiMongodb, SiFigma, SiJavascript, SiHtml5, SiCss3, SiFirebase, SiGit } from "react-icons/si";

const skills = [
  { name: "React", icon: <SiReact size={36} color="#61DAFB" /> },
  { name: "Next.js", icon: <SiNextdotjs size={36} className="text-black dark:text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs size={36} color="#3C873A" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={36} color="#38BDF8" /> },
  { name: "TypeScript", icon: <SiTypescript size={36} color="#3178C6" /> },
  { name: "JavaScript", icon: <SiJavascript size={36} color="#F7DF1E" /> },
  { name: "HTML5", icon: <SiHtml5 size={36} color="#E34F26" /> },
  { name: "CSS3", icon: <SiCss3 size={36} color="#1572B6" /> },
  { name: "MongoDB", icon: <SiMongodb size={36} color="#10AA50" /> },
  { name: "Firebase", icon: <SiFirebase size={36} color="#FFCA28" /> },
  { name: "Git", icon: <SiGit size={36} color="#F05032" /> },
  { name: "Figma", icon: <SiFigma size={36} color="#F24E1E" /> },
  // Add more as needed
];

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -10, 0, 10, 0],
    transition: {
      duration: 4 + (i % 3),
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.1,
    },
  }),
};

export default function SkillsShowcase() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-background py-16 px-4 transition-colors">
      {/* Heading and Description: on top for mobile, right for desktop */}
      <div className="order-1 md:order-2 flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left mb-12 md:mb-0 md:pl-16">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">My Skills</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-md transition-colors">
          A blend of modern frontend, backend, and design tools. I use these technologies to build fast, beautiful, and scalable digital products.
        </p>
      </div>
      {/* Animated Skill Bubbles Grid: below heading for mobile, left for desktop */}
      <div className="order-2 md:order-1 grid grid-cols-3 gap-8 flex-1 place-items-center">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="rounded-full border border-gray-300 dark:border-gray-600 w-24 h-24 flex flex-col items-center justify-center bg-white dark:bg-[#232326] shadow-lg transition-colors cursor-pointer hover:ring-4 hover:ring-primary/40 dark:hover:ring-primary/60 hover:shadow-xl"
            custom={i}
            variants={floatVariants}
            animate="animate"
            whileHover={{ scale: 1.08 }}
          >
            <div className="mb-1">{skill.icon}</div>
            <span className="text-gray-900 dark:text-white text-base font-semibold transition-colors">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 