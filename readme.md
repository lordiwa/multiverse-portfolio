# Rafael Matovelle - Multiverse Portfolio

A unique Vue.js portfolio website showcasing Rafael Matovelle's real professional experience alongside imaginative alternate career paths. Each "universe" represents a different career journey with its own visual theme and professional timeline.

## ✨ Features

- **Dual Universe System**: Toggle between "Current Universe" (real career) and "Multiverse" (alternate careers)
- **7 Different Career Paths**: Software Developer, Tattoo Artist, Veterinarian, Dance Teacher, Chef, Marine Biologist, Professional Gamer
- **Dynamic Theming**: Each career has its own color scheme and visual identity
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Component-Based Architecture**: Modular Vue components for easy maintenance
- **Smooth Transitions**: Animated transitions between universes and themes

## 🎨 Career Universes

### Current Universe
- **Software Developer**: Tech-focused theme with cyan accents
- Real professional experience from LinkedIn

### Multiverse Careers
- **Tattoo Artist**: Dark red theme with artistic flair
- **Veterinarian**: Green nature theme focused on wildlife conservation
- **Dance Teacher**: Purple/pink theme celebrating Latin dance culture
- **Chef**: Warm orange theme highlighting culinary innovation
- **Marine Biologist**: Ocean blue theme for marine conservation
- **Professional Gamer**: Purple gaming theme with esports focus

## 🚀 Tech Stack

- **Vue 3** (Composition API)
- **Vite** for build tooling
- **CSS3** with custom themes
- **Responsive Design**
- **Modern JavaScript (ES6+)**

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/multiverse-portfolio.git

# Navigate to project directory
cd multiverse-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactInfo.vue      # Contact information component
│   ├── ExperienceList.vue   # Timeline experience component
│   └── PersonalLinks.vue    # Links and projects component
├── data/
│   ├── profiles.js          # All career profile data
│   └── themes.js           # Theme configurations
├── App.vue                 # Main application component
└── main.js                # Application entry point
```

## 🎯 Key Components

### App.vue
Main component handling universe switching and career selection.

### ContactInfo.vue
Displays personal information, skills, and summary for each career.

### ExperienceList.vue
Timeline component showing professional experience with custom styling per career.

### PersonalLinks.vue
Links to portfolios, projects, and social media relevant to each career.

## 🎨 Customization

### Adding New Careers
1. Add career data to `src/data/profiles.js`
2. Add theme configuration to `src/data/themes.js`
3. Add CSS theme classes to `App.vue`
4. Update career selector in `App.vue`

### Modifying Themes
Edit the theme objects in `src/data/themes.js` and corresponding CSS classes in `App.vue`.

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized typography scaling

## 🚀 Deployment

The project can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo for automatic deploys
- **Vercel**: Import project for instant deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Deploy with Firebase CLI

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/multiverse-portfolio/issues).

## 👨‍💻 About

Created by Rafael Matovelle as a unique way to showcase both real professional experience and creative storytelling through alternate career paths.

---

**Live Demo**: [View Portfolio](https://your-portfolio-url.com)  
**Contact**: srparca@gmail.com  
**LinkedIn**: [linkedin.com/in/rmatovelle](https://www.linkedin.com/in/rmatovelle)