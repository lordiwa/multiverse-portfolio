<template>
  <div id="app" :class="currentTheme.containerClass">
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
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContactInfo from './components/ContactInfo.vue'
import ExperienceList from './components/ExperienceList.vue'
import PersonalLinks from './components/PersonalLinks.vue'
import { profileData } from './data/profiles.js'
import { themes } from './data/themes.js'

const currentUniverse = ref('current')
const selectedCareer = ref('current')

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
];

const currentProfile = computed(() => {
  return profileData[selectedCareer.value]
})

const currentTheme = computed(() => {
  return themes[selectedCareer.value] || themes.current;
});

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
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

#app {
  min-height: 100vh;
  width: 100vw;
  transition: all 0.5s ease;
  margin: 0;
  position: relative;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.15), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.1), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.1), transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: pixelFloat 20s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes pixelFloat {
  0% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-20px) translateX(-5px); }
  75% { transform: translateY(-10px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
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

/* Tech Theme */
.tech-container {
  background:
      linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,245,255,0.03) 2px, rgba(0,245,255,0.03) 4px);
  color: #00f5ff;
  position: relative;
}

.tech-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 25% 25%, rgba(0,245,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(0,150,255,0.08) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
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

.tech-container .universe-btn:hover {
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.6), 0 5px 25px rgba(0,0,0,0.3);
  text-shadow: 0 0 15px rgba(0,245,255,0.8);
}

/* Tattoo Theme */
.tattoo-container {
  background:
      linear-gradient(135deg, #1a0000 0%, #330000 30%, #4a0000 60%, #660000 100%),
      repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,107,107,0.05) 3px, rgba(255,107,107,0.05) 6px);
  color: #ff6b6b;
  position: relative;
  font-family: 'Metal Mania', cursive;
}

.tattoo-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 30% 40%, rgba(255,107,107,0.15) 0%, transparent 60%),
      radial-gradient(circle at 70% 60%, rgba(255,50,50,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.tattoo-container .universe-btn {
  border-color: #ff6b6b;
  color: #ff6b6b;
  text-shadow: 0 0 10px rgba(255,107,107,0.5);
}

.tattoo-container .universe-btn.active {
  background: linear-gradient(45deg, #ff6b6b, #ff4444);
  color: #1a0000;
  box-shadow: 0 0 30px rgba(255,107,107,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Vet Theme */
.vet-container {
  background:
      linear-gradient(135deg, #0a3d0a 0%, #1a5a1a 30%, #2d7d2d 60%, #40a040 100%),
      repeating-linear-gradient(60deg, transparent, transparent 4px, rgba(144,238,144,0.06) 4px, rgba(144,238,144,0.06) 8px);
  color: #90ee90;
  position: relative;
  font-family: 'Fredoka One', cursive;
}

.vet-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 20% 30%, rgba(144,238,144,0.12) 0%, transparent 55%),
      radial-gradient(circle at 80% 70%, rgba(100,200,100,0.08) 0%, transparent 45%);
  pointer-events: none;
  z-index: 1;
}

.vet-container .universe-btn {
  border-color: #90ee90;
  color: #90ee90;
  text-shadow: 0 0 10px rgba(144,238,144,0.5);
}

.vet-container .universe-btn.active {
  background: linear-gradient(45deg, #90ee90, #70dd70);
  color: #0a3d0a;
  box-shadow: 0 0 30px rgba(144,238,144,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Dance Theme */
.dance-container {
  background:
      linear-gradient(135deg, #4a0040 0%, #7a0070 30%, #aa00aa 60%, #dd00dd 100%),
      repeating-linear-gradient(120deg, transparent, transparent 3px, rgba(255,105,180,0.07) 3px, rgba(255,105,180,0.07) 6px);
  color: #ff69b4;
  position: relative;
  font-family: 'Pacifico', cursive;
}

.dance-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 35% 25%, rgba(255,105,180,0.15) 0%, transparent 50%),
      radial-gradient(circle at 65% 75%, rgba(255,20,147,0.1) 0%, transparent 55%);
  pointer-events: none;
  z-index: 1;
}

.dance-container .universe-btn {
  border-color: #ff69b4;
  color: #ff69b4;
  text-shadow: 0 0 10px rgba(255,105,180,0.5);
}

.dance-container .universe-btn.active {
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: #4a0040;
  box-shadow: 0 0 30px rgba(255,105,180,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Chef Theme */
.chef-container {
  background:
      linear-gradient(135deg, #2d1810 0%, #4a2818 30%, #6b3820 60%, #8b4513 100%),
      repeating-linear-gradient(30deg, transparent, transparent 5px, rgba(255,165,0,0.05) 5px, rgba(255,165,0,0.05) 10px);
  color: #ffa500;
  position: relative;
  font-family: 'Fredoka One', cursive;
}

.chef-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 40% 35%, rgba(255,165,0,0.12) 0%, transparent 50%),
      radial-gradient(circle at 60% 65%, rgba(255,140,0,0.08) 0%, transparent 45%);
  pointer-events: none;
  z-index: 1;
}

.chef-container .universe-btn {
  border-color: #ffa500;
  color: #ffa500;
  text-shadow: 0 0 10px rgba(255,165,0,0.5);
}

.chef-container .universe-btn.active {
  background: linear-gradient(45deg, #ffa500, #ff8c00);
  color: #2d1810;
  box-shadow: 0 0 30px rgba(255,165,0,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Marine Theme */
.marine-container {
  background:
      linear-gradient(135deg, #001a33 0%, #003366 30%, #004d99 60%, #0066cc 100%),
      repeating-linear-gradient(75deg, transparent, transparent 4px, rgba(0,191,255,0.06) 4px, rgba(0,191,255,0.06) 8px);
  color: #00bfff;
  position: relative;
  font-family: 'Space Mono', monospace;
}

.marine-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 25% 40%, rgba(0,191,255,0.15) 0%, transparent 60%),
      radial-gradient(circle at 75% 60%, rgba(0,150,255,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.marine-container .universe-btn {
  border-color: #00bfff;
  color: #00bfff;
  text-shadow: 0 0 10px rgba(0,191,255,0.5);
}

.marine-container .universe-btn.active {
  background: linear-gradient(45deg, #00bfff, #0099ff);
  color: #001a33;
  box-shadow: 0 0 30px rgba(0,191,255,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Gamer Theme */
.gamer-container {
  background:
      linear-gradient(135deg, #1a001a 0%, #330033 30%, #4d004d 60%, #660066 100%),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(157,78,221,0.08) 2px, rgba(157,78,221,0.08) 4px);
  color: #9d4edd;
  position: relative;
  font-family: 'Russo One', monospace;
}

.gamer-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 30% 20%, rgba(157,78,221,0.15) 0%, transparent 55%),
      radial-gradient(circle at 70% 80%, rgba(138,43,226,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.gamer-container .universe-btn {
  border-color: #9d4edd;
  color: #9d4edd;
  text-shadow: 0 0 10px rgba(157,78,221,0.5);
}

.gamer-container .universe-btn.active {
  background: linear-gradient(45deg, #9d4edd, #8a2be2);
  color: #1a001a;
  box-shadow: 0 0 30px rgba(157,78,221,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Artist Theme */
.artist-container {
  background:
      linear-gradient(135deg, #2d1b3d 0%, #4a2c5a 30%, #663d77 60%, #8b4e94 100%),
      repeating-linear-gradient(30deg, transparent, transparent 3px, rgba(221,160,221,0.07) 3px, rgba(221,160,221,0.07) 6px);
  color: #dda0dd;
  position: relative;
  font-family: 'Pacifico', cursive;
}

.artist-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 40% 30%, rgba(221,160,221,0.12) 0%, transparent 50%),
      radial-gradient(circle at 60% 70%, rgba(186,85,211,0.08) 0%, transparent 45%);
  pointer-events: none;
  z-index: 1;
}

.artist-container .universe-btn {
  border-color: #dda0dd;
  color: #dda0dd;
  text-shadow: 0 0 10px rgba(221,160,221,0.5);
}

.artist-container .universe-btn.active {
  background: linear-gradient(45deg, #dda0dd, #ba55d3);
  color: #2d1b3d;
  box-shadow: 0 0 30px rgba(221,160,221,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Astronaut Theme */
.astronaut-container {
  background:
      linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 30%, #2a2a4a 60%, #3a3a5a 100%),
      repeating-linear-gradient(60deg, transparent, transparent 4px, rgba(192,192,192,0.06) 4px, rgba(192,192,192,0.06) 8px);
  color: #c0c0c0;
  position: relative;
  font-family: 'Orbitron', monospace;
}

.astronaut-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 30% 25%, rgba(192,192,192,0.15) 0%, transparent 60%),
      radial-gradient(circle at 70% 75%, rgba(135,206,235,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.astronaut-container .universe-btn {
  border-color: #c0c0c0;
  color: #c0c0c0;
  text-shadow: 0 0 10px rgba(192,192,192,0.5);
}

.astronaut-container .universe-btn.active {
  background: linear-gradient(45deg, #c0c0c0, #87ceeb);
  color: #0a0a1a;
  box-shadow: 0 0 30px rgba(192,192,192,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Time Traveler Theme */
.time-container {
  background:
      linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 30%, #4a4a2a 60%, #5a5a3a 100%),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,215,0,0.08) 2px, rgba(255,215,0,0.08) 4px);
  color: #ffd700;
  position: relative;
  font-family: 'Bungee', cursive;
}

.time-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 25% 35%, rgba(255,215,0,0.12) 0%, transparent 55%),
      radial-gradient(circle at 75% 65%, rgba(255,165,0,0.08) 0%, transparent 45%);
  pointer-events: none;
  z-index: 1;
}

.time-container .universe-btn {
  border-color: #ffd700;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255,215,0,0.5);
}

.time-container .universe-btn.active {
  background: linear-gradient(45deg, #ffd700, #ffa500);
  color: #1a1a0a;
  box-shadow: 0 0 30px rgba(255,215,0,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Dragon Tamer Theme */
.dragon-container {
  background:
      linear-gradient(135deg, #3a0a0a 0%, #5a1a1a 30%, #7a2a2a 60%, #9a3a3a 100%),
      repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,69,0,0.08) 3px, rgba(255,69,0,0.08) 6px);
  color: #ff4500;
  position: relative;
  font-family: 'Metal Mania', cursive;
}

.dragon-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 35% 30%, rgba(255,69,0,0.15) 0%, transparent 60%),
      radial-gradient(circle at 65% 70%, rgba(255,0,0,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.dragon-container .universe-btn {
  border-color: #ff4500;
  color: #ff4500;
  text-shadow: 0 0 10px rgba(255,69,0,0.5);
}

.dragon-container .universe-btn.active {
  background: linear-gradient(45deg, #ff4500, #ff0000);
  color: #3a0a0a;
  box-shadow: 0 0 30px rgba(255,69,0,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Superhero Theme */
.hero-container {
  background:
      linear-gradient(135deg, #0a1a3a 0%, #1a2a5a 30%, #2a3a7a 60%, #3a4a9a 100%),
      repeating-linear-gradient(120deg, transparent, transparent 4px, rgba(30,144,255,0.07) 4px, rgba(30,144,255,0.07) 8px);
  color: #1e90ff;
  position: relative;
  font-family: 'Russo One', sans-serif;
}

.hero-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 40% 25%, rgba(30,144,255,0.15) 0%, transparent 55%),
      radial-gradient(circle at 60% 75%, rgba(0,100,200,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.hero-container .universe-btn {
  border-color: #1e90ff;
  color: #1e90ff;
  text-shadow: 0 0 10px rgba(30,144,255,0.5);
}

.hero-container .universe-btn.active {
  background: linear-gradient(45deg, #1e90ff, #0064c8);
  color: #0a1a3a;
  box-shadow: 0 0 30px rgba(30,144,255,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Wizard Theme */
.wizard-container {
  background:
      linear-gradient(135deg, #1a0a3a 0%, #2a1a5a 30%, #3a2a7a 60%, #4a3a9a 100%),
      repeating-linear-gradient(60deg, transparent, transparent 3px, rgba(147,0,211,0.08) 3px, rgba(147,0,211,0.08) 6px);
  color: #9300d3;
  position: relative;
  font-family: 'Creepster', cursive;
}

.wizard-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 30% 35%, rgba(147,0,211,0.15) 0%, transparent 60%),
      radial-gradient(circle at 70% 65%, rgba(75,0,130,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.wizard-container .universe-btn {
  border-color: #9300d3;
  color: #9300d3;
  text-shadow: 0 0 10px rgba(147,0,211,0.5);
}

.wizard-container .universe-btn.active {
  background: linear-gradient(45deg, #9300d3, #4b0082);
  color: #1a0a3a;
  box-shadow: 0 0 30px rgba(147,0,211,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* AI Overlord Theme */
.ai-container {
  background:
      linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #2a2a2a 60%, #3a3a3a 100%),
      repeating-linear-gradient(30deg, transparent, transparent 2px, rgba(0,255,0,0.08) 2px, rgba(0,255,0,0.08) 4px);
  color: #00ff00;
  position: relative;
  font-family: 'Orbitron', monospace;
}

.ai-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 25% 25%, rgba(0,255,0,0.15) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(0,200,0,0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.ai-container .universe-btn {
  border-color: #00ff00;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0,255,0,0.5);
}

.ai-container .universe-btn.active {
  background: linear-gradient(45deg, #00ff00, #00c800);
  color: #0a0a0a;
  box-shadow: 0 0 30px rgba(0,255,0,0.6), inset 0 0 20px rgba(255,255,255,0.1);
}

/* Section-specific styles for each theme */
.tech-section .skills-section,
.tech-section .languages-section,
.tech-section .summary-section {
  border-left: 4px solid #00f5ff;
  background: linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(0,245,255,0.02) 100%);
}

.tattoo-section .skills-section,
.tattoo-section .languages-section,
.tattoo-section .summary-section {
  border-left: 4px solid #ff6b6b;
  background: linear-gradient(135deg, rgba(255,107,107,0.08) 0%, rgba(255,107,107,0.02) 100%);
  font-style: italic;
}

.vet-section .skills-section,
.vet-section .languages-section,
.vet-section .summary-section {
  border-left: 4px solid #90ee90;
  background: linear-gradient(135deg, rgba(144,238,144,0.08) 0%, rgba(144,238,144,0.02) 100%);
  border-radius: 20px;
}

.dance-section .skills-section,
.dance-section .languages-section,
.dance-section .summary-section {
  border-left: 4px solid #ff69b4;
  background: linear-gradient(135deg, rgba(255,105,180,0.08) 0%, rgba(255,105,180,0.02) 100%);
  transform: skew(-2deg);
}

.chef-section .skills-section,
.chef-section .languages-section,
.chef-section .summary-section {
  border-left: 4px solid #ffa500;
  background: linear-gradient(135deg, rgba(255,165,0,0.08) 0%, rgba(255,165,0,0.02) 100%);
  border-radius: 15px 0 15px 0;
}

.marine-section .skills-section,
.marine-section .languages-section,
.marine-section .summary-section {
  border-left: 4px solid #00bfff;
  background: linear-gradient(135deg, rgba(0,191,255,0.08) 0%, rgba(0,191,255,0.02) 100%);
  border-radius: 0 20px 0 20px;
}

.gamer-section .skills-section,
.gamer-section .languages-section,
.gamer-section .summary-section {
  border-left: 4px solid #9d4edd;
  background: linear-gradient(135deg, rgba(157,78,221,0.08) 0%, rgba(157,78,221,0.02) 100%);
  clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
}

.artist-section .skills-section,
.artist-section .languages-section,
.artist-section .summary-section {
  border-left: 4px solid #dda0dd;
  background: linear-gradient(135deg, rgba(221,160,221,0.08) 0%, rgba(221,160,221,0.02) 100%);
  border-radius: 25px 5px 25px 5px;
}

.astronaut-section .skills-section,
.astronaut-section .languages-section,
.astronaut-section .summary-section {
  border-left: 4px solid #c0c0c0;
  background: linear-gradient(135deg, rgba(192,192,192,0.08) 0%, rgba(192,192,192,0.02) 100%);
  border: 2px solid rgba(192,192,192,0.3);
  border-radius: 10px;
}

.time-section .skills-section,
.time-section .languages-section,
.time-section .summary-section {
  border-left: 4px solid #ffd700;
  background: linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.02) 100%);
  transform: perspective(1000px) rotateX(5deg);
}

.dragon-section .skills-section,
.dragon-section .languages-section,
.dragon-section .summary-section {
  border-left: 4px solid #ff4500;
  background: linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(255,69,0,0.02) 100%);
  border-radius: 0 30px 0 30px;
  position: relative;
}

.dragon-section .skills-section::before,
.dragon-section .languages-section::before,
.dragon-section .summary-section::before {
  content: '🔥';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2em;
  opacity: 0.3;
}

.hero-section .skills-section,
.hero-section .languages-section,
.hero-section .summary-section {
  border-left: 4px solid #1e90ff;
  background: linear-gradient(135deg, rgba(30,144,255,0.08) 0%, rgba(30,144,255,0.02) 100%);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(30,144,255,0.3);
}

.wizard-section .skills-section,
.wizard-section .languages-section,
.wizard-section .summary-section {
  border-left: 4px solid #9300d3;
  background: linear-gradient(135deg, rgba(147,0,211,0.08) 0%, rgba(147,0,211,0.02) 100%);
  border-radius: 50px 0 50px 0;
  position: relative;
}

.wizard-section .skills-section::after,
.wizard-section .languages-section::after,
.wizard-section .summary-section::after {
  content: '✨';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5em;
  opacity: 0.4;
  animation: sparkle 2s ease-in-out infinite alternate;
}

@keyframes sparkle {
  0% { opacity: 0.2; transform: scale(1); }
  100% { opacity: 0.8; transform: scale(1.2); }
}

.ai-section .skills-section,
.ai-section .languages-section,
.ai-section .summary-section {
  border-left: 4px solid #00ff00;
  background: linear-gradient(135deg, rgba(0,255,0,0.08) 0%, rgba(0,255,0,0.02) 100%);
  border: 1px solid rgba(0,255,0,0.3);
  position: relative;
}

.ai-section .skills-section::before,
.ai-section .languages-section::before,
.ai-section .summary-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 11px);
  pointer-events: none;
  animation: matrix 10s linear infinite;
}

@keyframes matrix {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

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

  /* Reset transforms for mobile */
  .dance-section .skills-section,
  .dance-section .languages-section,
  .dance-section .summary-section {
    transform: none;
  }

  .time-section .skills-section,
  .time-section .languages-section,
  .time-section .summary-section {
    transform: none;
  }

  .gamer-section .skills-section,
  .gamer-section .languages-section,
  .gamer-section .summary-section {
    clip-path: none;
  }
}
</style>