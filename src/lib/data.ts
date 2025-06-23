import type { Project } from '@/components/project-card';
import type { Education } from '@/components/education-card';

export const projects: Project[] = [
  {
    title: 'AI-Powered E-commerce Platform',
    description: 'A full-stack e-commerce solution with personalized recommendations and voice search capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'TypeScript', 'GenAI', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'e-commerce website'
  },
  {
    title: 'Interactive Data Visualization Dashboard',
    description: 'A dashboard for visualizing complex datasets with interactive charts and filters.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React', 'D3.js', 'Firebase', 'Styled Components'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'dashboard chart'
  },
  {
    title: 'Mobile Health & Wellness App',
    description: 'A cross-platform mobile app to track fitness goals and connect with personal trainers.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React Native', 'GraphQL', 'PostgreSQL', 'Figma'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'mobile app'
  },
];

export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  backend: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'Firebase', 'Docker'],
  design: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
};

export const education: Education[] = [
  {
    institution: 'University of Design & Technology',
    degree: 'M.S. in Human-Computer Interaction',
    years: '2020 - 2022',
    description: 'Focused on user-centered design methodologies, interactive prototyping, and usability testing.'
  },
  {
    institution: 'State University of Arts & Science',
    degree: 'B.S. in Computer Science',
    years: '2016 - 2020',
    description: 'Coursework included data structures, algorithms, web development, and software engineering principles.'
  }
];
