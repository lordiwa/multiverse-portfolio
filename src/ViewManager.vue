<!-- ViewManager.vue - Handles all view transitions -->
<template>
  <div class="view-manager" :class="currentTheme?.containerClass">
    <!-- Main Portfolio View -->
    <div v-if="currentView === 'portfolio'" class="portfolio-view">
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

      <!-- Portfolio Content -->
      <div class="portfolio-container">
        <!-- Contact Information Component -->
        <ContactInfo
            :contact="currentProfile.contact"
            :theme="currentTheme"
            @open-email="openView('email')"
            @open-madlibs="openView('madlibs')"
            @open-tetris="openView('tetris')"
        />

        <!-- Experience List Component -->
        <ExperienceList
            :experiences="currentProfile.experiences"
            :theme="currentTheme"
        />

        <!-- Personal Links Component -->
        <PersonalLinks
            :links="currentProfile.links"
            :theme="currentTheme"
            @open-tetris="openView('tetris')"
            @open-madlibs="openView('madlibs')"
            @open-coming-soon="openComingSoon"
        />
      </div>
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

    <!-- Coming Soon Modal (keep as modal since it's lightweight) -->
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
import ContactInfo from './components/ContactInfo.vue'
import ExperienceList from './components/ExperienceList.vue'
import PersonalLinks from './components/PersonalLinks.vue'
import EmailContactView from './components/EmailContactView.vue'
import MadLibsView from './components/MadLibsView.vue'
import TetrisView from './components/TetrisView.vue'
import ComingSoonModal from './components/ComingSoonModal.vue'
import { profileData } from './data/profiles.js'
import { themes } from './data/themes.js'

// View management
const currentView = ref('portfolio')
const currentUniverse = ref('current')
const selectedCareer = ref('current')

// Coming soon modal
const showComingSoon = ref(false)
const comingSoonUrl = ref('')

const careers = [
  { id: 'current', name: 'Software Developer' },
  { id: 'tattoo', name: 'Tattoo Artist' },
  { id: 'vet', name: 'Veterinarian' },
  { id: 'dance', name: 'Dance Teacher' },
  { id: 'chef', name: 'Chef' },
  { id: 'marine', name: 'Marine Biologist' },
  { id: 'gamer', name: 'Professional Gamer' },
  { id: 'artist', name: 'Digital Artist' },
  { id: 'astronaut', name: 'Astronaut' },
  { id: 'timeTraveler', name: 'Time Traveler' },
  { id: 'dragonTamer', name: 'Dragon Tamer' },
  { id: 'superhero', name: 'Superhero' },
  { id: 'wizard', name: 'Wizard' },
  { id: 'aiOverlord', name: 'AI Overlord' }
]

const currentProfile = computed(() => {
  return profileData[selectedCareer.value]
})

const currentTheme = computed(() => {
  return themes[selectedCareer.value] || themes.current
})

const switchUniverse = (universe) => {
  currentUniverse.value = universe
  if (universe === 'current') {
    selectedCareer.value = 'current'
  } else {
    const multiverseCareers = careers.filter(c => c.id !== 'current')
    const randomIndex = Math.floor(Math.random() * multiverseCareers.length)
    selectedCareer.value = multiverseCareers[randomIndex].id
  }
}

const openView = (viewName) => {
  currentView.value = viewName
  // Scroll to top when opening new view
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

const backToPortfolio = () => {
  currentView.value = 'portfolio'
  // Scroll to top when returning to portfolio
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Metal+Mania&family=Fredoka+One&family=Pacifico&family=Russo+One&family=Bungee&display=swap');

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
  overflow-x: hidden;
  /* Prevent mobile scroll bounce */
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

.view-manager {
  min-height: 100vh;
  width: 100vw;
  transition: all 0.5s ease;
  margin: 0;
  position: relative;
  overflow: hidden;
}

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
  gap: 15px;
  z-index: 1000;
}

.universe-btn {
  padding: 12px 24px;
  border: 3px solid;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  transition: all 0.3s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
}

.universe-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 5px 25px rgba(0,0,0,0.3);
}

.universe-btn:first-child {
  background: linear-gradient(45deg,
  rgba(255,0,150,0.1) 0%,
  rgba(0,255,255,0.1) 25%,
  rgba(255,255,0,0.1) 50%,
  rgba(255,0,255,0.1) 75%,
  rgba(0,255,150,0.1) 100%);
  animation: rainbowGlow 3s ease-in-out infinite alternate;
}

.universe-btn:first-child::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(45deg,
  #0066ff, #00ffff, rgba(255, 255, 255, 0.13), #ff00ff, #00ff96);
  border-radius: 12px;
  z-index: -1;
  filter: blur(10px);
  opacity: 0.7;
  animation: rainbowPulse 2s ease-in-out infinite alternate;
}

@keyframes rainbowGlow {
  0% { filter: brightness(1) saturate(1.2); }
  100% { filter: brightness(1.3) saturate(1.5); }
}

@keyframes rainbowPulse {
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0.9; transform: scale(1.1); }
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

/* Mobile optimizations */
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

  /* Ensure mobile viewport doesn't get cut off */
  .view-manager {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}

/* Prevent mobile bounce and ensure proper scrolling */
@media (max-width: 768px) {
  body {
    position: relative;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .view-manager {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    overflow-x: hidden;
  }
}
</style>