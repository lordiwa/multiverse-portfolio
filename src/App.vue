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
}

#app {
  min-height: 100vh;
  width: 100vw;
  transition: all 0.5s ease;
  margin: 0;
  position: relative;
  overflow: hidden;
}

/* Dense starfield with varied star sizes - extended coverage */
#app::before {
  content: '';
  position: fixed;
  top: -50vh;
  left: -50vw;
  width: 200vw;
  height: 200vh;
  background:
    /* Large bright stars - 3px */
      radial-gradient(3px 3px at 50px 80px, #ffffff, transparent 4px),
      radial-gradient(3px 3px at 250px 60px, #ffd700, transparent 4px),
      radial-gradient(3px 3px at 100px 200px, #00ff7f, transparent 4px),
      radial-gradient(3px 3px at 375px 260px, #87ceeb, transparent 4px),
      radial-gradient(3px 3px at 425px 100px, #ffffff, transparent 4px),
        /* Medium stars - 2px */
      radial-gradient(2px 2px at 150px 120px, #87ceeb, transparent 3px),
      radial-gradient(2px 2px at 350px 140px, #ff69b4, transparent 3px),
      radial-gradient(2px 2px at 200px 180px, #ffffff, transparent 3px),
      radial-gradient(2px 2px at 400px 160px, #ffd700, transparent 3px),
      radial-gradient(2px 2px at 275px 320px, #ffffff, transparent 3px),
      radial-gradient(2px 2px at 125px 40px, #ffd700, transparent 3px),
      radial-gradient(2px 2px at 325px 20px, #00ff7f, transparent 3px),
        /* Small distant stars - 1px */
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

/* Dense second layer with varied sizes - extended coverage */
#app::after {
  content: '';
  position: fixed;
  top: -50vh;
  left: -50vw;
  width: 200vw;
  height: 200vh;
  background:
    /* Large foreground stars - 4px (closest/brightest) */
      radial-gradient(4px 4px at 225px 150px, #87ceeb, transparent 5px),
      radial-gradient(4px 4px at 425px 190px, #ff69b4, transparent 5px),
      radial-gradient(4px 4px at 325px 290px, #ffffff, transparent 5px),
      radial-gradient(4px 4px at 450px 70px, #ffffff, transparent 5px),
        /* Medium-large stars - 2.5px */
      radial-gradient(2.5px 2.5px at 125px 90px, #ffffff, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 325px 110px, #ffd700, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 175px 50px, #87ceeb, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 350px 200px, #ff69b4, transparent 3.5px),
      radial-gradient(2.5px 2.5px at 400px 120px, #ffffff, transparent 3.5px),
        /* Small background stars - 1px and 0.5px */
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

/* Seamless downward movement - no gaps */
@keyframes starFallSeamless {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(300px);
  }
}

/* Individual blinking patterns with different delays and rhythms */
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

/* Tech Theme */
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

.tech-container .universe-btn:hover {
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.6), 0 5px 25px rgba(0,0,0,0.3);
  text-shadow: 0 0 15px rgba(0,245,255,0.8);
}

/* Tattoo Theme */
.tattoo-container {
  background: linear-gradient(135deg, #1a0000 0%, #330000 30%, #4a0000 60%, #660000 100%);
  color: #ff6b6b;
  position: relative;
  font-family: 'Metal Mania', cursive;
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
  background: linear-gradient(135deg, #0a3d0a 0%, #1a5a1a 30%, #2d7d2d 60%, #40a040 100%);
  color: #90ee90;
  position: relative;
  font-family: 'Fredoka One', cursive;
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
  background: linear-gradient(135deg, #4a0040 0%, #7a0070 30%, #aa00aa 60%, #dd00dd 100%);
  color: #ff69b4;
  position: relative;
  font-family: 'Pacifico', cursive;
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
  background: linear-gradient(135deg, #2d1810 0%, #4a2818 30%, #6b3820 60%, #8b4513 100%);
  color: #ffa500;
  position: relative;
  font-family: 'Fredoka One', cursive;
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
  background: linear-gradient(135deg, #001a33 0%, #003366 30%, #004d99 60%, #0066cc 100%);
  color: #00bfff;
  position: relative;
  font-family: 'Space Mono', monospace;
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
  background: linear-gradient(135deg, #1a001a 0%, #330033 30%, #4d004d 60%, #660066 100%);
  color: #9d4edd;
  position: relative;
  font-family: 'Russo One', monospace;
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
  background: linear-gradient(135deg, #2d1b3d 0%, #4a2c5a 30%, #663d77 60%, #8b4e94 100%);
  color: #dda0dd;
  position: relative;
  font-family: 'Pacifico', cursive;
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
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 30%, #2a2a4a 60%, #3a3a5a 100%);
  color: #c0c0c0;
  position: relative;
  font-family: 'Orbitron', monospace;
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
  background: linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 30%, #4a4a2a 60%, #5a5a3a 100%);
  color: #ffd700;
  position: relative;
  font-family: 'Bungee', cursive;
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
  background: linear-gradient(135deg, #3a0a0a 0%, #5a1a1a 30%, #7a2a2a 60%, #9a3a3a 100%);
  color: #ff4500;
  position: relative;
  font-family: 'Metal Mania', cursive;
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
  background: linear-gradient(135deg, #0a1a3a 0%, #1a2a5a 30%, #2a3a7a 60%, #3a4a9a 100%);
  color: #1e90ff;
  position: relative;
  font-family: 'Russo One', sans-serif;
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
  background: linear-gradient(135deg, #1a0a3a 0%, #2a1a5a 30%, #3a2a7a 60%, #4a3a9a 100%);
  color: #9300d3;
  position: relative;
  font-family: 'Creepster', cursive;
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
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #2a2a2a 60%, #3a3a3a 100%);
  color: #00ff00;
  position: relative;
  font-family: 'Orbitron', monospace;
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
}
</style>