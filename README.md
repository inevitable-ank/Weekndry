# Weekendly 🎯

**Your Personal Weekend Planning Companion**

Weekendly is a modern, intuitive web application designed to help you make the most of your weekends. Whether you're looking for activities, planning meals, or organizing your schedule, Weekendly provides personalized recommendations based on your mood and preferences.

![Weekendly Logo](public/weekendly-favicon.svg)

## ✨ Features

### 🏠 **Smart Home Dashboard**
- **Mood-Based Recommendations**: Select your current mood and get personalized activity suggestions
- **Activity Discovery**: Browse curated activities across multiple categories
- **Meal Planning**: Get inspired with weekend meal ideas and recipes
- **Quick Start**: Jump into planning with one-click access to the planner

### 📅 **Comprehensive Planning Tools**
- **Interactive Calendar**: Visual calendar view for long-term planning
- **Day View**: Detailed daily schedule with drag-and-drop functionality
- **Schedule Management**: Create, edit, and organize your weekend activities
- **Activity Browser**: Search and filter activities by category, mood, duration, and energy level

### 🎨 **Activity Categories**
- **🍽️ Food & Dining**: Brunch spots, cooking activities, food tours
- **🎬 Entertainment**: Movies, shows, games, cultural events
- **🌳 Outdoor**: Hiking, picnics, sports, nature activities
- **🧘 Relaxation**: Yoga, reading, spa activities, meditation
- **📚 Learning**: Workshops, museums, skill-building activities
- **👥 Social**: Group activities, meetups, social events
- **💪 Fitness**: Workouts, sports, active adventures
- **✈️ Travel**: Day trips, local exploration, sightseeing

### 🎯 **Smart Features**
- **Mood Selector**: Choose from relaxed, adventurous, energetic, social, creative, or happy moods
- **Energy Level Filtering**: Activities rated from 1 (chill) to 5 (intense)
- **Duration-Based Planning**: Filter activities by time commitment
- **Location Recommendations**: Get suggestions based on your area
- **Weather Integration**: Real-time weather data with location-based recommendations

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Multiple Themes**: Choose from Lazy Weekend, Adventurous, Family Time, or Productive themes
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Accessibility**: Full keyboard navigation and screen reader support
- **PWA Ready**: Install as a native app on your device

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weekendly.git
   cd weekendly/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching

### UI Components & Libraries
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **React Router DOM** - Client-side routing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **TypeScript** - Static type checking

### Additional Features
- **Drag & Drop** - @dnd-kit for intuitive interactions
- **Calendar Integration** - React Calendar for date management
- **PWA Support** - Install as native app with service worker
- **Weather API** - Open-Meteo API for real-time weather data
- **Export Functionality** - Export weekend plans as images

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── activity/       # Activity-related components
│   ├── calendar/       # Calendar components
│   ├── common/         # Shared UI components
│   ├── home/           # Homepage components
│   ├── layout/         # Layout components
│   ├── mood/           # Mood selection components
│   ├── schedule/       # Schedule management
│   ├── share/          # Sharing functionality
│   ├── theme/          # Theme components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── data/              # Static data and mock data
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services and utilities
├── store/             # State management (Zustand)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── router.tsx         # Application routing
```

## 🎯 Key Pages

- **Home** (`/`) - Landing page with mood selector and featured activities
- **Planner** (`/planner`) - Main planning interface
- **Schedule** (`/schedule`) - Weekly schedule view
- **Day View** (`/day/:day`) - Detailed daily planning
- **Calendar** (`/calendar`) - Monthly calendar view
- **Settings** (`/settings`) - User preferences and configuration

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern design systems
- Community feedback and suggestions

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check our [FAQ](docs/FAQ.md)
- Contact us at support@weekendly.app

---

**Made with ❤️ for better weekends**
