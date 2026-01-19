<template>
  <div class="view-manager" :class="currentTheme?.containerClass">
    <!-- Main Portfolio View -->
    <div v-if="currentView === 'portfolio'" :class="['portfolio-view', { 'transitioning': isTransitioning }]">
      <!-- Universe Switcher -->
      <div class="universe-switcher">
        <button
            @click="switchUniverse('multiverse')"
            :class="['universe-btn', { active: currentUniverse === 'multiverse' }]"
        >
          Multiverse Me
        </button>
        <button
            @click="switchUniverse('current')"
            :class="['universe-btn', { active: currentUniverse === 'current' }]"
        >
          Current Universe Me
        </button>
      </div>

      <!-- Layout Manager - handles different compositions -->
      <LayoutManager
          :profile="currentProfile"
          :theme="currentTheme"
          :career="selectedCareer"
          @open-email="openView('email')"
          @open-madlibs="openView('madlibs')"
          @open-tetris="openView('tetris')"
          @open-coming-soon="openComingSoon"
      />
    </div>

    <!-- Email Contact View -->
    <EmailContactView
        v-else-if="currentView === 'email'"
        :theme="currentTheme"
        :career="selectedCareer"
        @back="backToPortfolio"
    />

    <!-- Mad Libs Game View -->
    <MadLibsView
        v-else-if="currentView === 'madlibs'"
        :theme="currentTheme"
        :career="selectedCareer"
        @back="backToPortfolio"
    />

    <!-- Tetris Game View -->
    <TetrisView
        v-else-if="currentView === 'tetris'"
        :theme="currentTheme"
        :career="selectedCareer"
        @back="backToPortfolio"
    />

    <!-- Coming Soon Modal -->
    <ComingSoonModal
        :show="showComingSoon"
        :linkUrl="comingSoonUrl"
        :theme="currentTheme"
        :career="selectedCareer"
        @close="closeComingSoon"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LayoutManager from './layouts/LayoutManager.vue'
import EmailContactView from './components/EmailContactView.vue'
import MadLibsView from './components/MadLibsView.vue'
import TetrisView from './components/TetrisView.vue'
import ComingSoonModal from './components/ComingSoonModal.vue'
import { profileData } from './data/profiles.js'
import { themes, getThemeGroup, getCareersNotInGroups } from './data/themes.js'

// View management
const currentView = ref('portfolio')
const currentUniverse = ref('current')
const selectedCareer = ref('current')
const isTransitioning = ref(false)

// Track last 2 theme groups to prevent repetition
const lastThemeGroups = ref([])

// Coming soon modal
const showComingSoon = ref(false)
const comingSoonUrl = ref('')

// All 14 career options
const careers = [
  { id: 'current', name: 'Software Developer' },
  { id: 'tattoo', name: 'Tattoo Artist' },
  { id: 'artist', name: 'Digital Artist' },
  { id: 'vet', name: 'Veterinarian' },
  { id: 'marine', name: 'Marine Biologist' },
  { id: 'astronaut', name: 'Astronaut' },
  { id: 'dance', name: 'Dance Teacher' },
  { id: 'chef', name: 'Chef' },
  { id: 'gamer', name: 'Professional Gamer' },
  { id: 'wizard', name: 'Wizard' },
  { id: 'dragonTamer', name: 'Dragon Tamer' },
  { id: 'timeTraveler', name: 'Time Traveler' },
  { id: 'superhero', name: 'Superhero' },
  { id: 'aiOverlord', name: 'AI Overlord' }
]

const currentProfile = computed(() => {
  return profileData[selectedCareer.value]
})

const currentTheme = computed(() => {
  return themes[selectedCareer.value] || themes.current
})

const switchUniverse = (universe) => {
  // Trigger portal transition animation
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 600)

  currentUniverse.value = universe

  if (universe === 'current') {
    selectedCareer.value = 'current'
    lastThemeGroups.value = []
  } else {
    const allCareerIds = careers
        .filter(c => c.id !== 'current')
        .map(c => c.id)

    let availableCareers = getCareersNotInGroups(
        lastThemeGroups.value,
        allCareerIds
    )

    if (availableCareers.length === 0) {
      const currentGroup = getThemeGroup(selectedCareer.value)
      availableCareers = getCareersNotInGroups([currentGroup], allCareerIds)
    }

    if (availableCareers.length === 0) {
      availableCareers = allCareerIds
    }

    const randomIndex = Math.floor(Math.random() * availableCareers.length)
    selectedCareer.value = availableCareers[randomIndex]

    const newGroup = getThemeGroup(selectedCareer.value)
    lastThemeGroups.value = [newGroup, ...lastThemeGroups.value].slice(0, 2)
  }
}

const openView = (viewName) => {
  currentView.value = viewName
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

const backToPortfolio = () => {
  currentView.value = 'portfolio'
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

const openComingSoon = (url) => {
  comingSoonUrl.value = url
  showComingSoon.value = true
}

const closeComingSoon = () => {
  showComingSoon.value = false
  comingSoonUrl.value = ''
}
</script>

<!-- Keep all existing styles from ViewManager.vue -->

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Metal+Mania&family=Fredoka+One&family=Pacifico&family=Russo+One&family=Bungee&display=swap');

/* ========================================
   MODERN DESIGN SYSTEM - GLASSMORPHISM
   ======================================== */
:root {
  /* Glassmorphism base */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  /* Modern border radius */
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 32px;

  /* Smooth transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Theme colors with RGB values for gradients */
  --tech-primary: #00f5ff;
  --tech-secondary: #0080ff;
  --tech-rgb: 0, 245, 255;

  --artist-primary: #ff4757;
  --artist-secondary: #ff6b81;
  --artist-rgb: 255, 71, 87;

  --explorer-primary: #10ac84;
  --explorer-secondary: #1abc9c;
  --explorer-rgb: 16, 172, 132;

  --performer-primary: #e056fd;
  --performer-secondary: #ff9f43;
  --performer-rgb: 224, 86, 253;

  --gamer-primary: #9d4edd;
  --gamer-secondary: #00d9ff;
  --gamer-rgb: 157, 78, 221;

  --fantasy-primary: #8854d0;
  --fantasy-secondary: #f9ca24;
  --fantasy-rgb: 136, 84, 208;
}

/* Modern card base class */
.modern-card {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all var(--transition-smooth);
}

.modern-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 40px var(--theme-glow, rgba(255, 255, 255, 0.2));
  border-color: rgba(255, 255, 255, 0.25);
}

/* Modern skill badge */
.modern-skill-badge {
  background: linear-gradient(135deg,
    rgba(var(--theme-rgb, 255, 255, 255), 0.2) 0%,
    rgba(var(--theme-rgb, 255, 255, 255), 0.1) 100%);
  border: 1px solid rgba(var(--theme-rgb, 255, 255, 255), 0.3);
  border-radius: var(--radius-sm);
  padding: 8px 16px;
  font-size: 0.85em;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.modern-skill-badge:hover {
  background: linear-gradient(135deg, var(--primary, #fff), var(--secondary, #ccc));
  color: white;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(var(--theme-rgb, 255, 255, 255), 0.4);
}

/* Portal transition animation */
@keyframes portalOpen {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
    filter: blur(20px);
  }
  50% {
    transform: scale(1.1) rotate(0deg);
    opacity: 1;
    filter: blur(5px);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
    filter: blur(0);
  }
}

.portfolio-view.transitioning {
  animation: portalOpen 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  line-height: 1.6;
  transition: all 0.3s ease;
  /* FIXED: Remove overflow-x: hidden from body to allow proper scrolling */
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
  /* FIXED: Set proper height without restrictions */
  height: auto;
  min-height: 100vh;
}

.view-manager {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto; /* Allow vertical scrolling */
  touch-action: pan-y; /* Enable touch scrolling */
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  line-height: 1.6;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
  height: auto;
  min-height: 100vh; /* Ensure proper height */
  overflow-x: hidden;
  overflow-y: auto; /* Allow vertical scrolling */
  touch-action: pan-y; /* Enable touch scrolling */
}

@media (max-width: 768px) {
  .view-manager {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto; /* Ensure scrolling on mobile */
  }

  body {
    height: auto;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto; /* Allow scrolling */
  }
}

/* FIXED: Remove conflicting height rules */
/* Keep all your existing starfield animations */
.view-manager::before {
  content: '';
  position: fixed;
  top: -50vh;
  left: -50vw;
  width: 200vw;
  height: 200vh;
  background:
      radial-gradient(3px 3px at 50px 80px, #ffffff, transparent 4px),
      radial-gradient(3px 3px at 250px 60px, #ffd700, transparent 4px),
      radial-gradient(3px 3px at 100px 200px, #00ff7f, transparent 4px),
      radial-gradient(3px 3px at 375px 260px, #87ceeb, transparent 4px),
      radial-gradient(3px 3px at 425px 100px, #ffffff, transparent 4px),
      radial-gradient(2px 2px at 150px 120px, #87ceeb, transparent 3px),
      radial-gradient(2px 2px at 350px 140px, #ff69b4, transparent 3px),
      radial-gradient(2px 2px at 200px 180px, #ffffff, transparent 3px),
      radial-gradient(2px 2px at 400px 160px, #ffd700, transparent 3px),
      radial-gradient(2px 2px at 275px 320px, #ffffff, transparent 3px),
      radial-gradient(2px 2px at 125px 40px, #ffd700, transparent 3px),
      radial-gradient(2px 2px at 325px 20px, #00ff7f, transparent 3px),
      radial-gradient(1px 1px at 300px 220px, #87ceeb, transparent 2px),
      radial-gradient(1px 1px at 75px 300px, #ff69b4, transparent 2px),
      radial-gradient(1px 1px at 175px 280px, #00ff7f, transparent 2px),
      radial-gradient(1px 1px at 225px 340px, #ff69b4, transparent 2px),
      radial-gradient(1px 1px at 25px 160px, #87ceeb, transparent 2px),
      radial-gradient(1px 1px at 475px 240px, #ffd700, transparent 2px),
      radial-gradient(1px 1px at 450px 320px, #ff69b4, transparent 2px),
      radial-gradient(1px 1px at 50px 240px, #00ff7f, transparent 2px);
  background-repeat: repeat;
  background-size: 400px 300px;
  animation:
      starFallSeamless 4s linear infinite,
      starBlink-a 2.3s ease-in-out infinite,
      starBlink-b 3.1s ease-in-out infinite 0.5s,
      starBlink-c 1.7s ease-in-out infinite 1s,
      starBlink-d 2.8s ease-in-out infinite 1.5s;
  pointer-events: none;
  z-index: 1;
  opacity: 0.8;
}

.view-manager::after {
  content: '';
  position: fixed;
  top: -50vh;
  left: -50vw;
  width: 200vw;
  height: 200vh;
  background:
      radial-gradient(4px 4px at 225px 150px, #87ceeb, transparent 5px),
      radial-gradient(4px 4px at 425px 190px, #ff69b4, transparent 5px),
      radial-gradient(4px 4px at 325px 290px, #ffffff, transparent 5px),
      radial-gradient(4px 4px at 450px 70px, #ffffff, transparent 5px),
      radial-gradient(2.5px 2.5px at 125px 90px, #ffffff, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 325px 110px, #ffd700, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 175px 50px, #87ceeb, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 350px 200px, #ff69b4, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 400px 120px, #ffffff, transparent 3.5px),
      radial-gradient(1px 1px at 25px 250px, #00ff7f, transparent 2px),
      radial-gradient(1px 1px at 275px 170px, #ffd700, transparent 2px),
      radial-gradient(1px 1px at 375px 330px, #ff69b4, transparent 2px),
      radial-gradient(1px 1px at 75px 130px, #00ff7f, transparent 2px),
      radial-gradient(1px 1px at 150px 310px, #87ceeb, transparent 2px),
      radial-gradient(0.5px 0.5px at 250px 30px, #ffd700, transparent 1px),
      radial-gradient(0.5px 0.5px at 50px 350px, #00ff7f, transparent 1px),
      radial-gradient(0.5px 0.5px at 200px 270px, #87ceeb, transparent 1px),
      radial-gradient(0.5px 0.5px at 300px 80px, #ffd700, transparent 1px);
  background-repeat: repeat;
  background-size: 350px 280px;
  animation:
      starFallSeamless 2.5s linear infinite,
      starBlink-e 1.9s ease-in-out infinite 0.3s,
      starBlink-f 3.4s ease-in-out infinite 0.8s,
      starBlink-g 2.1s ease-in-out infinite 1.2s,
      starBlink-h 2.6s ease-in-out infinite 1.7s;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}

/* All your existing keyframes */
@keyframes starFallSeamless {
  0% { transform: translateY(0px); }
  100% { transform: translateY(300px); }
}

@keyframes starBlink-a {
  0% { filter: brightness(0.2); }
  15% { filter: brightness(1.8); }
  30% { filter: brightness(0.4); }
  70% { filter: brightness(0.8); }
  100% { filter: brightness(0.3); }
}

@keyframes starBlink-b {
  0% { filter: brightness(0.9); }
  25% { filter: brightness(0.1); }
  50% { filter: brightness(1.5); }
  75% { filter: brightness(0.6); }
  100% { filter: brightness(1.2); }
}

@keyframes starBlink-c {
  0% { filter: brightness(0.5); }
  40% { filter: brightness(1.9); }
  60% { filter: brightness(0.2); }
  100% { filter: brightness(0.7); }
}

@keyframes starBlink-d {
  0% { filter: brightness(1.1); }
  20% { filter: brightness(0.3); }
  45% { filter: brightness(0.8); }
  80% { filter: brightness(1.6); }
  100% { filter: brightness(0.4); }
}

@keyframes starBlink-e {
  0% { filter: brightness(0.6); }
  35% { filter: brightness(0.2); }
  55% { filter: brightness(1.4); }
  85% { filter: brightness(0.9); }
  100% { filter: brightness(0.5); }
}

@keyframes starBlink-f {
  0% { filter: brightness(0.8); }
  10% { filter: brightness(1.7); }
  30% { filter: brightness(0.3); }
  65% { filter: brightness(1.0); }
  90% { filter: brightness(0.4); }
  100% { filter: brightness(1.3); }
}

@keyframes starBlink-g {
  0% { filter: brightness(0.4); }
  25% { filter: brightness(1.2); }
  50% { filter: brightness(0.7); }
  75% { filter: brightness(0.2); }
  100% { filter: brightness(1.5); }
}

@keyframes starBlink-h {
  0% { filter: brightness(1.0); }
  30% { filter: brightness(0.3); }
  60% { filter: brightness(1.8); }
  80% { filter: brightness(0.6); }
  100% { filter: brightness(0.8); }
}

.universe-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 6px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 50px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.universe-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 44px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  transition: all 0.3s ease;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  color: rgba(255, 255, 255, 0.7);
}

.universe-btn:hover {
  transform: translateY(-2px);
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.1);
}

.universe-btn:first-child {
  background: linear-gradient(45deg,
    rgba(255,0,150,0.15) 0%,
    rgba(0,255,255,0.15) 25%,
    rgba(255,255,0,0.15) 50%,
    rgba(255,0,255,0.15) 75%,
    rgba(0,255,150,0.15) 100%);
  color: rgba(255, 255, 255, 0.9);
}

.universe-btn:first-child::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg,
    #0066ff, #00ffff, rgba(255, 255, 255, 0.2), #ff00ff, #00ff96);
  border-radius: 46px;
  z-index: -1;
  filter: blur(8px);
  opacity: 0.5;
  animation: rainbowPulse 2s ease-in-out infinite alternate;
}

.universe-btn.active {
  background: linear-gradient(135deg, var(--tech-primary, #00f5ff), var(--tech-secondary, #0080ff));
  color: #0f0f0f;
  box-shadow: 0 4px 20px rgba(0, 245, 255, 0.4);
  font-weight: 800;
}

.universe-btn:first-child.active {
  background: linear-gradient(135deg,
    #ff0096 0%,
    #00d9ff 50%,
    #00ff96 100%);
  box-shadow: 0 4px 25px rgba(255, 0, 150, 0.4), 0 4px 25px rgba(0, 255, 150, 0.3);
}

@keyframes rainbowPulse {
  0% { opacity: 0.4; transform: scale(1); }
  100% { opacity: 0.7; transform: scale(1.05); }
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 20px 20px;
  position: relative;
  z-index: 2;
}

/* All your existing theme styles... */
.tech-container {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%);
  color: #00f5ff;
  position: relative;
}

.tech-container .universe-btn {
  border-color: #00f5ff;
  color: #00f5ff;
  text-shadow: 0 0 10px rgba(0,245,255,0.5);
}

.tech-container .universe-btn.active {
  background: linear-gradient(45deg, #00f5ff, #0080ff);
  color: #0f0f0f;
  box-shadow: 0 0 30px rgba(0,245,255,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Include all other theme styles from your original App.vue... */

/* FIXED: Mobile optimizations with proper scrolling */
@media (max-width: 768px) {
  .universe-switcher {
    top: 10px;
    right: 10px;
    flex-direction: column;
    gap: 10px;
  }

  .universe-btn {
    padding: 10px 16px;
    font-size: 12px;
  }

  .portfolio-container {
    padding: 100px 15px 15px 15px;
  }

  /* FIXED: Ensure content doesn't get cut off */
  .portfolio-view {
    min-height: 100vh;
    padding-bottom: 20px;
  }
}

/* FIXED: Additional mobile safety */
@media (max-width: 480px) {
  .portfolio-container {
    padding: 90px 10px 30px 10px;
  }

  .portfolio-view {
    padding-bottom: 30px;
  }
}

/* FIXED: Landscape orientation */
@media (max-height: 600px) and (orientation: landscape) {
  .portfolio-container {
    padding: 80px 15px 20px 15px;
  }
}

/* ========================================
   SUBSTANTIAL THEME DIFFERENTIATION
   ======================================== */

/* ============= ARTIST THEME ============= */
/* Dark gallery with spotlight, NO stars */

.tattoo-container::before,
.tattoo-container::after {
  display: none !important; /* Remove starfield */
}

.tattoo-container {
  background:
      radial-gradient(circle at 30% 20%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(139, 0, 0, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #1a0000 0%, #0a0000 100%);
}

.tattoo-container .portfolio-container {
  background: rgba(0, 0, 0, 0.6);
  border-left: 5px solid #ff6b6b;
  border-right: 5px solid #ff6b6b;
  padding: 120px 40px 40px 40px;
  box-shadow:
      inset 20px 0 40px rgba(0, 0, 0, 0.8),
      inset -20px 0 40px rgba(0, 0, 0, 0.8);
}

.tattoo-container .contact-card,
.tattoo-container .experience-card,
.tattoo-container .links-card {
  background:
      linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%);
  border: 3px solid #ff6b6b;
  border-radius: 0 20px 0 20px; /* Asymmetric corners */
  transform: skewY(-1deg);
  position: relative;
}

.tattoo-container .contact-card::after,
.tattoo-container .experience-card::after,
.tattoo-container .links-card::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(45deg, #ff6b6b, transparent, #8b0000);
  z-index: -1;
  border-radius: inherit;
  opacity: 0.3;
}

.tattoo-container .timeline::before {
  background: linear-gradient(180deg, #ff6b6b, #8b0000, #ff6b6b);
  width: 6px;
  box-shadow: 0 0 20px #ff6b6b;
}

/* ============= EXPLORER THEME ============= */
/* Nature/organic with topographic lines, NO stars */

.vet-container::before,
.vet-container::after {
  display: none !important; /* Remove starfield */
}

.vet-container {
  background:
      radial-gradient(ellipse at top, rgba(144, 238, 144, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at bottom, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
      linear-gradient(180deg, #0a3d0a 0%, #001a33 100%);
  position: relative;
}

/* Add topographic contour lines */
.vet-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
      repeating-radial-gradient(circle at 30% 40%,
      transparent 0,
      transparent 49px,
      rgba(144, 238, 144, 0.1) 50px,
      transparent 51px
      ),
      repeating-radial-gradient(circle at 70% 60%,
      transparent 0,
      transparent 79px,
      rgba(0, 191, 255, 0.1) 80px,
      transparent 81px
      );
  pointer-events: none;
  z-index: 1;
  animation: topoShift 30s linear infinite;
}

@keyframes topoShift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.vet-container .contact-card,
.vet-container .experience-card,
.vet-container .links-card {
  border-radius: 30px;
  border: 3px solid rgba(144, 238, 144, 0.4);
  background:
      linear-gradient(135deg,
      rgba(144, 238, 144, 0.08) 0%,
      rgba(0, 191, 255, 0.08) 100%
      );
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      inset 0 0 40px rgba(144, 238, 144, 0.05);
}

.vet-container .avatar,
.vet-container .link-icon {
  border-radius: 50% !important; /* Fully circular for organic feel */
}

.vet-container .timeline::before {
  background: linear-gradient(180deg,
  rgba(144, 238, 144, 0.6),
  rgba(0, 191, 255, 0.6)
  );
  width: 4px;
  filter: blur(1px);
}

/* ============= PERFORMER THEME ============= */
/* Dynamic diagonal energy, motion blur, NO stars */

.dance-container::before,
.dance-container::after {
  display: none !important; /* Remove starfield */
}

.dance-container {
  background:
      linear-gradient(135deg,
      #4a0040 0%,
      #7a0070 25%,
      #aa00aa 50%,
      #d4145a 75%,
      #ff6900 100%
      );
  position: relative;
  overflow: hidden;
}

/* Diagonal motion streaks */
.dance-container::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
      repeating-linear-gradient(
          45deg,
          transparent,
          transparent 40px,
          rgba(255, 105, 180, 0.1) 40px,
          rgba(255, 105, 180, 0.1) 80px
      );
  animation: diagonalSlide 20s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes diagonalSlide {
  0% { transform: translate(0, 0) rotate(45deg); }
  100% { transform: translate(113px, 113px) rotate(45deg); }
}

.dance-container .portfolio-container {
  transform: skewY(-2deg);
}

.dance-container .contact-card,
.dance-container .experience-card,
.dance-container .links-card {
  border-radius: 15px;
  border: 3px solid rgba(255, 105, 180, 0.6);
  background:
      linear-gradient(135deg,
      rgba(255, 105, 180, 0.15) 0%,
      rgba(255, 165, 0, 0.1) 100%
      );
  transform: rotate(-1deg);
  box-shadow:
      5px 5px 0 rgba(255, 105, 180, 0.3),
      -5px -5px 0 rgba(255, 165, 0, 0.3),
      0 0 40px rgba(0, 0, 0, 0.5);
}

.dance-container .universe-btn {
  transform: rotate(-3deg);
  transition: all 0.3s ease;
}

.dance-container .universe-btn:hover {
  transform: rotate(0deg) translateY(-3px) scale(1.05);
}

/* ============= GAMER THEME ============= */
/* HUD interface with scanlines and hexagons */

.gamer-container::before,
.gamer-container::after {
  /* Keep some stars but add scanlines */
  opacity: 0.3;
}

/* Add scanlines overlay */
.gamer-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(157, 78, 221, 0.05) 2px,
      rgba(157, 78, 221, 0.05) 4px
  );
  pointer-events: none;
  z-index: 3;
  animation: scanlines 8s linear infinite;
}

@keyframes scanlines {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

.gamer-container .contact-card,
.gamer-container .experience-card,
.gamer-container .links-card {
  border-radius: 0;
  clip-path: polygon(
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px),
      0 10px
  ); /* Octagonal shape */
  border: 3px solid #9d4edd;
  background:
      linear-gradient(135deg,
      rgba(157, 78, 221, 0.1) 0%,
      rgba(0, 0, 0, 0.9) 100%
      );
  position: relative;
  box-shadow:
      inset 0 0 20px rgba(157, 78, 221, 0.3),
      0 0 30px rgba(157, 78, 221, 0.5);
}

/* Corner brackets like HUD */
.gamer-container .contact-card::before,
.gamer-container .experience-card::before,
.gamer-container .links-card::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  border-top: 3px solid #9d4edd;
  border-left: 3px solid #9d4edd;
  animation: hudBracket 2s ease-in-out infinite;
}

.gamer-container .contact-card::after,
.gamer-container .experience-card::after,
.gamer-container .links-card::after {
  content: '';
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-bottom: 3px solid #9d4edd;
  border-right: 3px solid #9d4edd;
  animation: hudBracket 2s ease-in-out infinite 1s;
}

@keyframes hudBracket {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* ============= FANTASY THEME ============= */
/* Mystical particles, ornate borders, NO stars */

.wizard-container::before,
.wizard-container::after {
  display: none !important; /* Remove starfield */
}

.wizard-container {
  background:
      radial-gradient(circle at 50% 50%, rgba(147, 0, 211, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #1a0a3a 0%, #0a0a1a 100%);
  position: relative;
}

/* Floating mystical particles */
.wizard-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
      radial-gradient(2px 2px at 20% 30%, #ffd700, transparent),
      radial-gradient(2px 2px at 60% 70%, #9300d3, transparent),
      radial-gradient(3px 3px at 50% 50%, #ffd700, transparent),
      radial-gradient(1px 1px at 80% 10%, #9300d3, transparent),
      radial-gradient(2px 2px at 90% 60%, #ffd700, transparent),
      radial-gradient(1px 1px at 15% 90%, #9300d3, transparent),
      radial-gradient(2px 2px at 40% 20%, #ffd700, transparent);
  background-size: 200px 200px;
  background-position: 0 0, 50px 50px, 100px 100px;
  animation: floatParticles 30s linear infinite;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}

@keyframes floatParticles {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-200px) translateX(50px); }
}

.wizard-container .contact-card,
.wizard-container .experience-card,
.wizard-container .links-card {
  border-radius: 15px;
  border: 4px solid;
  border-image: linear-gradient(45deg, #9300d3, #ffd700, #9300d3) 1;
  background:
      linear-gradient(135deg,
      rgba(147, 0, 211, 0.15) 0%,
      rgba(0, 0, 0, 0.9) 100%
      );
  box-shadow:
      0 0 40px rgba(147, 0, 211, 0.5),
      inset 0 0 40px rgba(147, 0, 211, 0.1);
  position: relative;
}

/* Ornate corner decorations */
.wizard-container .contact-card::before,
.wizard-container .experience-card::before,
.wizard-container .links-card::before {
  content: '✦';
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: 20px;
  color: #ffd700;
  text-shadow: 0 0 10px #ffd700;
  animation: sparkle 3s ease-in-out infinite;
}

.wizard-container .contact-card::after,
.wizard-container .experience-card::after,
.wizard-container .links-card::after {
  content: '✦';
  position: absolute;
  bottom: -10px;
  right: -10px;
  font-size: 20px;
  color: #9300d3;
  text-shadow: 0 0 10px #9300d3;
  animation: sparkle 3s ease-in-out infinite 1.5s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2) rotate(90deg);
  }
}

/* ============= TECH THEME ADJUSTMENTS ============= */
/* Keep current but enhance slightly */

.tech-container .contact-card,
.tech-container .experience-card,
.tech-container .links-card {
  border-radius: 8px; /* Sharp corners */
  background:
      linear-gradient(135deg,
      rgba(0, 245, 255, 0.05) 0%,
      rgba(0, 0, 0, 0.9) 100%
      );
}

/* Add circuit board pattern */
.tech-container .contact-card::before,
.tech-container .experience-card::before,
.tech-container .links-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px),
      linear-gradient(0deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
}

/* ============= MOBILE RESPONSIVENESS ============= */

@media (max-width: 768px) {
  .dance-container .portfolio-container {
    transform: skewY(-1deg); /* Less skew on mobile */
  }

  .tattoo-container .portfolio-container {
    padding: 100px 15px 20px 15px;
  }

  .gamer-container .contact-card::before,
  .gamer-container .contact-card::after,
  .gamer-container .experience-card::before,
  .gamer-container .experience-card::after,
  .gamer-container .links-card::before,
  .gamer-container .links-card::after {
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
  }
}
</style>