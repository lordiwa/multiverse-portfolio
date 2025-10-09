<template>
  <div class="fantasy-layout">
    <!-- Ancient Tome Header -->
    <div class="tome-cover">
      <div class="cover-ornament">✦</div>
      <div class="wizard-seal">{{ profile.contact.avatar }}</div>
      <h1 class="wizard-name">{{ profile.contact.name }}</h1>
      <p class="wizard-title">{{ profile.contact.title }}</p>
      <div class="rune-divider">⟡ ✧ ⟡</div>
      <button @click="$emit('open-email')" class="summon-button">
        <span class="summon-icon">✉</span>
        <span>Summon via Scroll</span>
      </button>
      <div class="cover-ornament bottom">✦</div>
    </div>

    <!-- Magical Chronicle (Experiences) -->
    <div class="magical-chronicle">
      <h2 class="chapter-title">Chronicle of Deeds</h2>
      <div class="scroll-container">
        <div
            v-for="(exp, idx) in profile.experiences"
            :key="idx"
            class="scroll-page"
            :style="{ animationDelay: `${idx * 0.2}s` }"
        >
          <div class="scroll-header">
            <span class="chapter-number">Chapter {{ toRoman(idx + 1) }}</span>
            <span class="time-period">{{ exp.duration }}</span>
          </div>
          <div class="scroll-content">
            <h3 class="deed-title">{{ exp.position }}</h3>
            <div class="location-rune">✦ {{ exp.company }} ✦</div>
            <div class="illuminated-text">
              <span class="drop-cap">{{ exp.description ? exp.description[0] : 'I' }}</span>
              <p v-if="exp.description">{{ exp.description.substring(1) }}</p>
            </div>
            <div v-if="exp.achievements" class="accomplishments">
              <div class="accomplishment-title">Notable Accomplishments:</div>
              <ul class="achievement-list">
                <li v-for="achievement in exp.achievements.slice(0, 3)" :key="achievement">
                  ⟐ {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
          <div class="scroll-footer">
            <span class="magical-seal">⟡</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Grimoire of Skills -->
    <div class="grimoire-section">
      <h2 class="grimoire-title">Grimoire of Mastered Arts</h2>
      <div class="spellbook">
        <div
            v-for="(skill, idx) in profile.contact.skills"
            :key="skill"
            class="spell-entry"
            :style="{ animationDelay: `${idx * 0.1}s` }"
        >
          <div class="spell-icon">✧</div>
          <div class="spell-name">{{ skill }}</div>
          <div class="spell-runes">
            <span v-for="n in 5" :key="n" class="rune" :class="{ active: n <= Math.floor(Math.random() * 2) + 4 }">✦</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mystical Portals (Links) -->
    <div class="mystical-portals">
      <h2 class="portals-title">Mystical Portals & Connections</h2>
      <div class="portals-grid">
        <div
            v-for="link in profile.links"
            :key="link.name"
            class="portal-card"
            @click="handleLinkClick(link)"
        >
          <div class="portal-frame">
            <div class="portal-icon">{{ link.icon }}</div>
            <div class="portal-glow"></div>
          </div>
          <h3 class="portal-name">{{ link.name }}</h3>
          <p class="portal-description">{{ link.description }}</p>
          <div class="portal-status">{{ link.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  profile: { type: Object, required: true },
  theme: { type: Object, required: true }
})

const emit = defineEmits(['open-email', 'open-madlibs', 'open-tetris', 'open-coming-soon'])

const toRoman = (num) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  return romanNumerals[num - 1] || num.toString()
}

const handleLinkClick = (link) => {
  if (link.url === '#tetris') emit('open-tetris')
  else if (link.url === '#madlibs') emit('open-madlibs')
  else if (link.url.startsWith('#')) emit('open-coming-soon', link.url)
}
</script>

<style scoped>
.fantasy-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  font-family: 'Creepster', cursive;
}

.tome-cover {
  background: linear-gradient(135deg, rgba(147, 0, 211, 0.2), rgba(0, 0, 0, 0.8));
  border: 5px solid;
  border-image: linear-gradient(45deg, #9300d3, #ffd700, #9300d3) 1;
  padding: 60px 40px;
  text-align: center;
  position: relative;
  margin-bottom: 80px;
  box-shadow:
      0 0 40px rgba(147, 0, 211, 0.5),
      inset 0 0 60px rgba(147, 0, 211, 0.1);
}

.cover-ornament {
  font-size: 3em;
  color: #ffd700;
  text-shadow: 0 0 20px #ffd700;
  animation: sparkleRotate 4s linear infinite;
}

.cover-ornament.bottom {
  margin-top: 30px;
  animation-delay: 2s;
}

@keyframes sparkleRotate {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

.wizard-seal {
  font-size: 6em;
  margin: 30px 0;
  filter: drop-shadow(0 0 30px #9300d3);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.wizard-name {
  font-size: 3.5em;
  font-family: 'Creepster', cursive;
  margin-bottom: 20px;
  color: #ffd700;
  text-shadow: 0 0 20px #ffd700, 0 0 40px #9300d3;
}

.wizard-title {
  font-size: 1.3em;
  opacity: 0.95;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.rune-divider {
  font-size: 2em;
  color: #9300d3;
  margin: 30px 0;
  text-shadow: 0 0 15px #9300d3;
}

.summon-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 20px 45px;
  background: linear-gradient(135deg, #9300d3, #4b0082);
  border: 4px solid #ffd700;
  color: #fff;
  font-family: 'Creepster', cursive;
  font-size: 1.3em;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.summon-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
}

.summon-button:hover::before {
  width: 300px;
  height: 300px;
}

.summon-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px #ffd700;
  border-color: #9300d3;
}

.summon-icon {
  font-size: 1.5em;
  z-index: 1;
}

.chapter-title,
.grimoire-title,
.portals-title {
  font-size: 3em;
  text-align: center;
  margin-bottom: 50px;
  color: #ffd700;
  text-shadow: 0 0 20px #ffd700, 0 0 40px #9300d3;
  font-family: 'Creepster', cursive;
  position: relative;
}

.chapter-title::before,
.chapter-title::after {
  content: '✧';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.5em;
  color: #9300d3;
  animation: sparkle 2s ease-in-out infinite;
}

.chapter-title::before {
  left: 20%;
}

.chapter-title::after {
  right: 20%;
  animation-delay: 1s;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
  50% { opacity: 1; transform: translateY(-50%) scale(1.3); }
}

.scroll-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 80px;
}

.scroll-page {
  background:
      linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(147, 0, 211, 0.05)),
      rgba(0, 0, 0, 0.6);
  border: 3px solid;
  border-image: linear-gradient(45deg, #9300d3, #ffd700) 1;
  padding: 40px;
  position: relative;
  animation: scrollUnfurl 1s ease-out backwards;
}

@keyframes scrollUnfurl {
  from {
    opacity: 0;
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  to {
    opacity: 1;
    transform: rotateX(0deg);
  }
}

.scroll-page::before,
.scroll-page::after {
  content: '✦';
  position: absolute;
  font-size: 2em;
  color: #ffd700;
  text-shadow: 0 0 15px #ffd700;
}

.scroll-page::before {
  top: 20px;
  left: 20px;
}

.scroll-page::after {
  bottom: 20px;
  right: 20px;
}

.scroll-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(147, 0, 211, 0.3);
}

.chapter-number {
  font-size: 1.3em;
  color: #9300d3;
  font-weight: 900;
  text-shadow: 0 0 10px #9300d3;
}

.time-period {
  background: rgba(147, 0, 211, 0.2);
  border: 2px solid #9300d3;
  padding: 5px 15px;
  font-size: 0.9em;
  color: #ffd700;
}

.deed-title {
  font-size: 2em;
  margin-bottom: 15px;
  color: #ffd700;
  text-shadow: 0 0 15px #ffd700;
}

.location-rune {
  text-align: center;
  color: #9300d3;
  margin-bottom: 20px;
  font-size: 1.1em;
  text-shadow: 0 0 10px #9300d3;
}

.illuminated-text {
  margin: 20px 0;
  line-height: 1.8;
}

.drop-cap {
  float: left;
  font-size: 4em;
  line-height: 0.8;
  margin: 5px 10px 0 0;
  color: #ffd700;
  text-shadow: 0 0 20px #ffd700;
}

.accomplishments {
  margin-top: 25px;
  padding: 20px;
  background: rgba(147, 0, 211, 0.1);
  border-left: 4px solid #9300d3;
}

.accomplishment-title {
  font-size: 1.2em;
  color: #ffd700;
  margin-bottom: 15px;
  font-weight: 700;
}

.achievement-list {
  list-style: none;
  padding: 0;
}

.achievement-list li {
  margin-bottom: 10px;
  opacity: 0.9;
  padding-left: 25px;
  position: relative;
}

.scroll-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid rgba(147, 0, 211, 0.3);
}

.magical-seal {
  font-size: 2em;
  color: #9300d3;
  text-shadow: 0 0 15px #9300d3;
  animation: sealPulse 3s ease-in-out infinite;
}

@keyframes sealPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.grimoire-section {
  margin-bottom: 80px;
  background: rgba(0, 0, 0, 0.4);
  padding: 60px 40px;
  border: 4px solid;
  border-image: linear-gradient(45deg, #9300d3, #ffd700, #9300d3) 1;
}

.spellbook {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.spell-entry {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(147, 0, 211, 0.1);
  border: 2px solid rgba(147, 0, 211, 0.3);
  padding: 20px;
  transition: all 0.3s;
  animation: spellAppear 0.6s ease-out backwards;
}

@keyframes spellAppear {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.spell-entry:hover {
  background: rgba(147, 0, 211, 0.2);
  border-color: #9300d3;
  transform: translateX(5px);
}

.spell-icon {
  font-size: 2.5em;
  color: #ffd700;
  text-shadow: 0 0 15px #ffd700;
  animation: spellGlow 2s ease-in-out infinite;
}

@keyframes spellGlow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.spell-name {
  flex: 1;
  font-size: 1.2em;
  font-weight: 700;
}

.spell-runes {
  display: flex;
  gap: 5px;
}

.rune {
  color: rgba(147, 0, 211, 0.3);
  font-size: 0.8em;
  transition: all 0.3s;
}

.rune.active {
  color: #ffd700;
  text-shadow: 0 0 10px #ffd700;
}

.mystical-portals {
  background: rgba(0, 0, 0, 0.4);
  padding: 60px 40px;
  border: 4px solid;
  border-image: linear-gradient(45deg, #9300d3, #ffd700, #9300d3) 1;
}

.portals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.portal-card {
  background: rgba(147, 0, 211, 0.1);
  border: 3px solid rgba(147, 0, 211, 0.3);
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.portal-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(147, 0, 211, 0.3), transparent 50%);
  opacity: 0;
  transition: opacity 0.5s;
}

.portal-card:hover::before {
  opacity: 1;
  animation: portalPulse 2s ease-out infinite;
}

@keyframes portalPulse {
  0% { transform: scale(0.8); }
  100% { transform: scale(1.2); opacity: 0; }
}

.portal-card:hover {
  background: rgba(147, 0, 211, 0.2);
  border-color: #9300d3;
  transform: translateY(-5px);
  box-shadow: 0 0 40px rgba(147, 0, 211, 0.5);
}

.portal-frame {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border: 4px solid #9300d3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portal-icon {
  font-size: 3em;
  z-index: 2;
}

.portal-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(147, 0, 211, 0.5), transparent 70%);
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.portal-name {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #ffd700;
  text-shadow: 0 0 10px #ffd700;
}

.portal-description {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 15px;
}

.portal-status {
  display: inline-block;
  background: rgba(147, 0, 211, 0.3);
  border: 2px solid #9300d3;
  padding: 8px 20px;
  font-size: 0.85em;
  font-weight: 700;
  color: #ffd700;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .tome-cover {
    padding: 40px 20px;
  }

  .wizard-name {
    font-size: 2.5em;
  }

  .scroll-page {
    padding: 25px;
  }

  .drop-cap {
    font-size: 3em;
  }

  .spellbook {
    grid-template-columns: 1fr;
  }

  .portals-grid {
    grid-template-columns: 1fr;
  }

  .chapter-title::before,
  .chapter-title::after {
    display: none;
  }
}
</style>