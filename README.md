# Voicefolio - Voice-Controlled Portfolio

A modern, interactive portfolio website with voice navigation capabilities. Built with Next.js, React, and AI-powered features.

## 🚀 Features

### Core Features
- **Voice Navigation**: Control the entire website using voice commands
- **Interactive Profile Card**: 3D flip animation with personal information
- **AI Chatbot**: Intelligent assistant that knows about your projects and experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with voice commands
- **Smooth Animations**: Framer Motion powered animations throughout

### Voice Commands
- **Navigation**: "Go to projects", "Show skills", "Navigate to contact"
- **Theme Control**: "Change theme", "Toggle dark mode"
- **Profile Interaction**: "Flip the card", "Flip profile"
- **Chatbot**: "Open chat", "Type [message]", "Ask [question]"
- **Social Links**: "Open GitHub", "Go to LinkedIn", "Open Twitter"
- **Scrolling**: "Scroll up", "Scroll down", "Go back"
- **Project Analysis**: "Analyze [project name]", "Tell me more about this project"

### Sections
- **Home**: Introduction with animated background video
- **Projects**: Showcase of development work with live demos
- **Skills**: Interactive skill bubbles with animations
- **Education**: Academic background and qualifications
- **Contact**: Modern contact form with video background

## 🛠️ Technologies

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### AI & Voice
- **Genkit**: AI framework for chatbot and voice navigation
- **Web Speech API**: Voice recognition and synthesis
- **Custom AI Flows**: Project analysis and intelligent responses

### UI Components
- **shadcn/ui**: Modern component library
- **Lucide React**: Icon library
- **React Icons**: Additional icon support

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/voicefolio.git
   cd voicefolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys and configuration to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Voice Navigation
1. **Enable microphone access** when prompted
2. **Click the microphone icon** or press `Alt + V` to start listening
3. **Speak your command** clearly
4. **Wait for the action** to be executed

### Keyboard Shortcuts
- `Alt + V`: Toggle voice recognition
- `Enter/Space` on profile card: Flip the card
- `Tab`: Navigate through interactive elements

### Chatbot
- **Click the chat icon** to open the AI assistant
- **Drag the chat window** to reposition it
- **Ask questions** about projects, skills, or experience
- **Voice commands**: "Type [your question]" to automatically open and populate the chat

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── ai/                    # AI flows and prompts
│   │   ├── flows/            # Voice navigation, chatbot, project analysis
│   │   └── genkit.ts         # AI configuration
│   ├── app/                  # Next.js app router pages
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   └── ...              # Custom components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and data
│   └── assets/              # Images and static files
├── docs/                    # Documentation
└── public/                  # Public assets
```

## 🎨 Customization

### Adding Projects
Edit `src/lib/data.ts` to add new projects:
```typescript
export const projects: Project[] = [
  {
    title: 'Your Project',
    description: 'Project description',
    imageUrl: projectImage.src,
    tags: ['React', 'TypeScript'],
    liveUrl: 'https://your-project.com',
    repoUrl: 'https://github.com/your-repo'
  }
];
```

### Modifying Voice Commands
Update `src/ai/flows/voice-navigation.ts` to add new voice commands and actions.

### Styling
- **Theme colors**: Modify `tailwind.config.ts`
- **Component styles**: Edit individual component files
- **Animations**: Adjust Framer Motion configurations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Genkit** for AI capabilities
- **Next.js** team for the amazing framework

## 📞 Contact

- **Email**: lokireddymanikanta12@gmail.com
- **GitHub**: [@lokireddymanikantaredddy](https://github.com/lokireddymanikantaredddy)
- **LinkedIn**: [Lokireddy Manikanta Reddy](https://linkedin.com/in/lokireddy)
- **Twitter**: [@lokireddy](https://twitter.com/lokireddy)

---

Made with ❤️ by LOKIREDDY MANIKANTA REDDY
