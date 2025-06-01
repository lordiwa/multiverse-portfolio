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

    <!-- Career Selector (only for multiverse) -->
    <!-- Removed dropdown - careers are selected randomly -->

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
import { ref, computed, onMounted } from 'vue'
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
  { id: 'gamer', name: 'Professional Gamer' }
]

const currentProfile = computed(() => {
  return profileData[selectedCareer.value]
})

const currentTheme = computed(() => {
  return themes[selectedCareer.value]
})

const switchUniverse = (universe) => {
  currentUniverse.value = universe
  if (universe === 'current') {
    selectedCareer.value = 'current'
  } else {
    // Randomly select a multiverse career (excluding 'current')
    const multiverseCareers = careers.filter(c => c.id !== 'current')
    const randomIndex = Math.floor(Math.random() * multiverseCareers.length)
    selectedCareer.value = multiverseCareers[randomIndex].id
  }
}

const updateCareer = () => {
  // Trigger reactivity - not needed anymore since we removed dropdown
}

onMounted(() => {
  // Initialize with current universe
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  width: 100vw;
  transition: all 0.5s ease;
  margin: 0;
}

.universe-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.universe-btn {
  padding: 10px 20px;
  border: 2px solid;
  background: transparent;
  cursor: pointer;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
}

.universe-btn:hover {
  transform: translateY(-2px);
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
}

/* Tech Theme */
.tech-container {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
  color: #00f5ff;
}

.tech-container .universe-btn {
  border-color: #00f5ff;
  color: #00f5ff;
}

.tech-container .universe-btn.active {
  background: #00f5ff;
  color: #0f0f0f;
}

.tech-container .universe-btn:hover {
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
}

/* Tattoo Theme */
.tattoo-container {
  background: linear-gradient(135deg, #1a0000 0%, #330000 50%, #4a0000 100%);
  color: #ff6b6b;
}

.tattoo-container .universe-btn {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.tattoo-container .universe-btn.active {
  background: #ff6b6b;
  color: #1a0000;
}

/* Vet Theme */
.vet-container {
  background: linear-gradient(135deg, #0a3d0a 0%, #1a5a1a 50%, #2d7d2d 100%);
  color: #90ee90;
}

.vet-container .universe-btn {
  border-color: #90ee90;
  color: #90ee90;
}

.vet-container .universe-btn.active {
  background: #90ee90;
  color: #0a3d0a;
}

/* Dance Theme */
.dance-container {
  background: linear-gradient(135deg, #4a0040 0%, #7a0070 50%, #aa00aa 100%);
  color: #ff69b4;
}

.dance-container .universe-btn {
  border-color: #ff69b4;
  color: #ff69b4;
}

.dance-container .universe-btn.active {
  background: #ff69b4;
  color: #4a0040;
}

/* Chef Theme */
.chef-container {
  background: linear-gradient(135deg, #2d1810 0%, #4a2818 50%, #6b3820 100%);
  color: #ffa500;
}

.chef-container .universe-btn {
  border-color: #ffa500;
  color: #ffa500;
}

.chef-container .universe-btn.active {
  background: #ffa500;
  color: #2d1810;
}

/* Marine Theme */
.marine-container {
  background: linear-gradient(135deg, #001a33 0%, #003366 50%, #004d99 100%);
  color: #00bfff;
}

.marine-container .universe-btn {
  border-color: #00bfff;
  color: #00bfff;
}

.marine-container .universe-btn.active {
  background: #00bfff;
  color: #001a33;
}

/* Gamer Theme */
.gamer-container {
  background: linear-gradient(135deg, #1a001a 0%, #330033 50%, #4d004d 100%);
  color: #9d4edd;
}

.gamer-container .universe-btn {
  border-color: #9d4edd;
  color: #9d4edd;
}

.gamer-container .universe-btn.active {
  background: #9d4edd;
  color: #1a001a;
}
</style>