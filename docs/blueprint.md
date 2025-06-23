# **App Name**: Voicefolio

## Core Features:

- Portfolio Display: Display a responsive, animated portfolio layout with sections for projects, skills, and contact information.
- Interactive Profile Card: Implement a 3D flipping animation for the profile card, showing different information on each side.
- Interactive Tooltip: Create a tooltip that appears on the first visit to explain voice navigation and other key interactions.
- Theme Toggle: Implement a toggle to switch between light and dark modes, with smooth transitions between color schemes.
- Voice Navigation: Use voice commands (e.g., 'Show me Projects', 'Go to Contact') for navigation, utilizing the webkitSpeechRecognition API as a tool for interpreting speech. Use descriptive labels so that screen readers and other assistive technologies will also activate navigation.
- Chatbot: chat bot that tell about my life and my works and projects, portifolio and many thing about me

## Style Guidelines:

- Primary color: HSL(210, 50%, 50%) - A moderate, saturated blue (#4DA6FF) to represent a tech-forward but reliable feeling.
- Background color: HSL(210, 20%, 95%) - Very light, desaturated blue (#F0F5FA) for a clean, modern feel in light mode. Dark mode will use the inverse of this color scheme.
- Accent color: HSL(180, 60%, 40%) - A brighter cyan (#26B3B3) for interactive elements, providing good contrast against the primary color and background.
- Body font: 'PT Sans', a humanist sans-serif for both headings and body text
- Utilize React Icons (Feather Icons) for a consistent and clean visual style. Icons should be minimalistic and representational.
- Responsive layout adapting to mobile, tablet, and desktop screens, ensuring usability across devices. Use a grid-based system for alignment.
- Implement smooth transitions and animations using Framer Motion for interactive elements like the profile card flip, theme toggle, and page transitions. Animations should be subtle and enhance user experience without being distracting.