import type { Project } from '@/components/project-card';
import type { Education } from '@/components/education-card';
import carRentalImage from '@/assets/car rental.png';
import creatorDashboardImage from '@/assets/dashboard.png';
import sriSrinivasaBillPrinterImage from '@/assets/bill-printer.png';
import agroFlowImage from '@/assets/agroflow.png';
import extensionImage from '@/assets/extension.png';
import chatbotImage from '@/assets/chat-interface.png';
import portfolioImage from '@/assets/portfolio.png';

export const projects: Project[] = [
  {
    title: 'Car Rental Platform',
    description: 'Full-featured car rental platform with booking system.A comprehensive car rental platform that allows users to browse, book, and manage vehicle rentals.    Built with HTML, CSS, and JavaScript for a responsive and user-friendly interface.',
    imageUrl: carRentalImage.src,
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://manirentacar.netlify.app/',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/car-rental.io',
    imageHint: 'car rental website'
  },
  {
    title: 'Creator Dashboard',
    description: 'A sleek and intuitive dashboard designed specifically for content creators.Features a modern UI with Tailwind CSS, real-time analytics, and a drag-and-drop interface for task management. ',
    imageUrl: creatorDashboardImage.src,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://creator-dashboard-nu.vercel.app/',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/Creator-Dashboard',
    imageHint: 'dashboard chart'
  },
  {
    title: 'Sri Srinivasa Bill Printer',
    description: 'A comprehensive shop management system built for Sri Srinivasa Fertilizers. Features include inventory management, billing system, customer tracking, and detailed analytics dashboard. ',
    imageUrl: sriSrinivasaBillPrinterImage.src,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://srisrinivasafertilizers.netlify.app/dashboard',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/bill-printer',
    imageHint: 'bill printer'
  },
  {
    title: 'AgroFlow',
    description: 'AgroFlow is a comprehensive agricultural business management system designed to help manage inventory, sales, and customer relationships for agricultural businesses in India.',
    imageUrl: agroFlowImage.src,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://agroflow.netlify.app/',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/agroflow',
    imageHint: 'agroflow'
  },
  {
    title: 'AI Video Summarizer',
    description: 'An innovative tool that leverages AI to automatically generate concise summaries of YouTube video transcripts. Combines frontend technologies with AI services for an efficient and user-friendly experience',
    imageUrl: extensionImage.src,
    tags: ['HTML', 'CSS', 'JavaScript', 'OpenAI API'],
    liveUrl: 'https://youtu.be/8fhrsuhGuaI?si=wpwJoSq4q9TParol',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/youtube-video-transcript-summarizer',
    imageHint: 'ai video summarizer'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean and responsive design with a focus on user experience.',
    imageUrl: portfolioImage.src,
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://manikantareddyportfolio.netlify.app/',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/portfolio',
    imageHint: 'portfolio website'
  },
  {
    title: 'AI Chatbot',
    description: 'An AI chatbot built with React, TypeScript, and Tailwind CSS. Features a clean and responsive design with a focus on user experience.',
    imageUrl: chatbotImage.src,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    liveUrl: 'https://zerocode-fe.netlify.app/',
    repoUrl: 'https://github.com/lokireddymanikantaredddy/zerocode-fe-assignment',
    imageHint: 'ai chatbot'
  }
];

export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
  design: ['Figma', 'Git', 'GitHub', 'AI Tools'],
};

export const education: Education[] = [
  {
    institution: 'Jain University',
    degree: 'B.Tech in Computer Science & Engineering',
    years: '2020 - 2024',
    description: 'I have completed my B.Tech in Computer Science & Engineering with a CGPA of 8.0. I have learned about Data Structures, Algorithms, Web Development, and Software Engineering Principles.'
  },
  {
    institution: 'Gurus junior college',
    degree: 'Intermediate',
    years: '2018 - 2020',
    description: 'I have completed my Intermediate with a percentage of 9.09. I have learned about Mathematics, Physics, Chemistry, and Computer Science.'
  },
  {
    institution: 'Bell and Bennett High School',
    degree: 'Secondary School',
    years: '2016 - 2018',
    description: 'I have completed my Secondary with a percentage of 8.8. I have learned about Mathematics, Science, Social, and English.'
  }
];

export const philosophy = `I believe in continuous learning, building with empathy, and using technology to solve real-world problems. My approach combines creativity, discipline, and a passion for making a positive impact through code. I strive to blend great design with powerful functionality, and I value collaboration, curiosity, and resilience.`;

export const funFacts = [
  "I love hiking and landscape photography.",
  "I built my first website at age 14.",
  "I'm passionate about AI and automation.",
  "I enjoy experimenting with new web technologies in my free time.",
  "I can solve a Rubik's cube in under a minute!"
];

export const awards = [
  {
    title: "Best Project Award",
    year: "2023",
    description: "Received for developing the 'AgroFlow' agricultural management system at Jain University."
  },
  {
    title: "Hackathon Finalist",
    year: "2022",
    description: "Finalist at the National Level Hackathon for building an AI-powered video summarizer."
  }
];
