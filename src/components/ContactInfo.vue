<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <div class="contact-header">
      <div class="avatar">
        <span class="avatar-icon">{{ contact.avatar }}</span>
      </div>
      <div class="contact-title">
        <h1>{{ contact.name }}</h1>
        <h3>{{ contact.title }}</h3>
        <p class="location">{{ contact.location }}</p>
      </div>
    </div>

    <div class="contact-details">
      <div class="contact-item">
        <span class="contact-icon">📱</span>
        <span>{{ contact.phone }}</span>
      </div>
      <div class="contact-item">
        <span class="contact-icon">✉️</span>
        <span>{{ contact.email }}</span>
      </div>
      <div class="contact-item">
        <span class="contact-icon">🔗</span>
        <a :href="contact.linkedin" target="_blank">LinkedIn Profile</a>
      </div>
    </div>

    <div :class="['skills-section', theme.sectionStyle]">
      <h3>Main Skills</h3>
      <div class="skills-list">
        <span
            v-for="skill in contact.skills"
            :key="skill"
            :class="theme.skillBadgeClass"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <div :class="['languages-section', theme.sectionStyle]">
      <h3>Languages</h3>
      <div class="languages-list">
        <div
            v-for="lang in contact.languages"
            :key="lang.name"
            class="language-item"
        >
          <span class="lang-name">{{ lang.name }}</span>
          <span class="lang-level">{{ lang.level }}</span>
        </div>
      </div>
    </div>

    <div :class="['summary-section', theme.sectionStyle]">
      <h3>Summary</h3>
      <p>{{ contact.summary }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contact: {
    type: Object,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.contact-card {
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 60px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
  pointer-events: none;
  z-index: 1;
}

.contact-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 80px currentColor;
  border-color: rgba(255, 255, 255, 0.4);
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  border: 4px solid currentColor;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  overflow: hidden;
  box-shadow:
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 30px rgba(255, 255, 255, 0.1),
      0 0 60px currentColor;
  position: relative;
}

.avatar::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, currentColor, transparent, currentColor);
  border-radius: 12px;
  z-index: -1;
  animation: borderGlow 3s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  0% { opacity: 0.5; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

.avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: inherit;
  text-shadow: 0 0 20px currentColor;
  animation: iconPulse 2s ease-in-out infinite alternate;
}

@keyframes iconPulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.contact-title {
  flex: 1;
  min-width: 0;
}

.contact-title h1 {
  font-size: 2.8em;
  margin-bottom: 8px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 20px currentColor;
  background: linear-gradient(45deg, currentColor, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-title h2 {
  font-size: 1.3em;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 1.4;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.contact-title h3 {
  max-width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 1.3em;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 1.4;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.location {
  opacity: 0.8;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.8);
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.contact-icon {
  font-size: 1.5em;
  filter: drop-shadow(0 0 10px currentColor);
}

.contact-item a {
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  transition: all 0.3s ease;
  font-weight: 600;
}

.contact-item a:hover {
  opacity: 0.8;
  text-shadow: 0 0 10px currentColor;
}

.skills-section,
.languages-section,
.summary-section {
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.02) 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.skills-section h3,
.languages-section h3,
.summary-section h3 {
  font-size: 1.5em;
  margin-bottom: 18px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 15px currentColor;
  color: rgba(255,255,255,0.9);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-badge {
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
  border: 2px solid currentColor;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.skill-badge:hover {
  background: linear-gradient(45deg, currentColor, rgba(255,255,255,0.2));
  color: black;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px currentColor;
  text-shadow: none;
}

.languages-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.language-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.lang-name {
  font-weight: 600;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.lang-level {
  opacity: 0.8;
  font-size: 0.95em;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.summary-section p {
  line-height: 1.8;
  opacity: 0.9;
  font-size: 1.05em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
}

/* Theme-specific section enhancements */
.tattoo-section .skills-section,
.tattoo-section .languages-section,
.tattoo-section .summary-section {
  background: linear-gradient(135deg, rgba(255,107,107,0.08) 0%, rgba(255,107,107,0.02) 100%);
  border-left: 4px solid #ff6b6b;
  font-style: italic;
}

.vet-section .skills-section,
.vet-section .languages-section,
.vet-section .summary-section {
  background: linear-gradient(135deg, rgba(144,238,144,0.08) 0%, rgba(144,238,144,0.02) 100%);
  border-left: 4px solid #90ee90;
  border-radius: 20px;
}

.dance-section .skills-section,
.dance-section .languages-section,
.dance-section .summary-section {
  background: linear-gradient(135deg, rgba(255,105,180,0.08) 0%, rgba(255,105,180,0.02) 100%);
  border-left: 4px solid #ff69b4;
}

.chef-section .skills-section,
.chef-section .languages-section,
.chef-section .summary-section {
  background: linear-gradient(135deg, rgba(255,165,0,0.08) 0%, rgba(255,165,0,0.02) 100%);
  border-left: 4px solid #ffa500;
  border-radius: 15px 0 15px 0;
}

.marine-section .skills-section,
.marine-section .languages-section,
.marine-section .summary-section {
  background: linear-gradient(135deg, rgba(0,191,255,0.08) 0%, rgba(0,191,255,0.02) 100%);
  border-left: 4px solid #00bfff;
  border-radius: 0 20px 0 20px;
}

.gamer-section .skills-section,
.gamer-section .languages-section,
.gamer-section .summary-section {
  background: linear-gradient(135deg, rgba(157,78,221,0.08) 0%, rgba(157,78,221,0.02) 100%);
  border-left: 4px solid #9d4edd;
}

.artist-section .skills-section,
.artist-section .languages-section,
.artist-section .summary-section {
  background: linear-gradient(135deg, rgba(221,160,221,0.08) 0%, rgba(221,160,221,0.02) 100%);
  border-left: 4px solid #dda0dd;
  border-radius: 25px 5px 25px 5px;
}

.astronaut-section .skills-section,
.astronaut-section .languages-section,
.astronaut-section .summary-section {
  background: linear-gradient(135deg, rgba(192,192,192,0.08) 0%, rgba(192,192,192,0.02) 100%);
  border-left: 4px solid #c0c0c0;
  border: 2px solid rgba(192,192,192,0.3);
  border-radius: 10px;
}

.time-section .skills-section,
.time-section .languages-section,
.time-section .summary-section {
  background: linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.02) 100%);
  border-left: 4px solid #ffd700;
}

.dragon-section .skills-section,
.dragon-section .languages-section,
.dragon-section .summary-section {
  background: linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(255,69,0,0.02) 100%);
  border-left: 4px solid #ff4500;
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
  background: linear-gradient(135deg, rgba(30,144,255,0.08) 0%, rgba(30,144,255,0.02) 100%);
  border-left: 4px solid #1e90ff;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(30,144,255,0.3);
}

.wizard-section .skills-section,
.wizard-section .languages-section,
.wizard-section .summary-section {
  background: linear-gradient(135deg, rgba(147,0,211,0.08) 0%, rgba(147,0,211,0.02) 100%);
  border-left: 4px solid #9300d3;
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
  background: linear-gradient(135deg, rgba(0,255,0,0.08) 0%, rgba(0,255,0,0.02) 100%);
  border-left: 4px solid #00ff00;
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
  .contact-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .contact-details {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .contact-title h1 {
    font-size: 2.2em;
  }

  .contact-title h3 {
    font-size: 1.1em;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .skills-list {
    justify-content: center;
  }

  /* Reset special transforms for mobile */
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