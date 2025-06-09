<!-- Complete ContactInfo.vue - With View Navigation Events -->
<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <!-- Email Contact Button -->
    <div class="email-button-container">
      <button @click="$emit('open-email')" :class="['email-contact-btn', theme.sectionStyle]">
        <span class="email-icon">📡</span>
        <span class="email-text">Send Neural Message</span>
      </button>
    </div>

    <div class="contact-header">
      <div class="avatar-games">
        <div class="avatar" @click="$emit('open-madlibs')" title="Click for a fun Mad Libs game!">
          <span class="avatar-icon">{{ contact.avatar }}</span>
          <div class="avatar-overlay">
            <span class="play-icon">🎮</span>
            <span class="play-text">Mad Libs!</span>
          </div>
        </div>

        <!-- Tetris Game Trigger -->
        <div class="tetris-trigger" @click="$emit('open-tetris')" title="Play Infinite Tetris!">
          <span class="tetris-icon">🎮</span>
          <div class="tetris-overlay">
            <span class="tetris-play-icon">🔥</span>
            <span class="tetris-play-text">Tetris!</span>
          </div>
        </div>
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
        <a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
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

defineEmits(['open-email', 'open-madlibs', 'open-tetris'])
</script>

<style scoped>
/* Email Button Styling */
.email-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.email-contact-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 35px;
  border: 4px solid currentColor;
  border-radius: 12px;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 40px currentColor;

  background-image:
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
}

.email-contact-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, currentColor, transparent, currentColor);
  border-radius: 12px;
  z-index: -1;
  animation: borderPulse 3s ease-in-out infinite alternate;
}

@keyframes borderPulse {
  0% { opacity: 0.5; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

.email-contact-btn:hover {
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0.1) 50%,
  rgba(255, 255, 255, 0.05) 100%);
  transform: translateY(-5px) scale(1.05);
  box-shadow:
      0 15px 50px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 80px currentColor;
  border-color: rgba(255, 255, 255, 0.8);
}

.email-contact-btn:active {
  transform: translateY(-3px) scale(1.02);
}

.email-icon {
  font-size: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 15px currentColor;
  animation: iconRotate 4s ease-in-out infinite;
}

@keyframes iconRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.1); }
  75% { transform: rotate(5deg) scale(1.1); }
}

.email-text {
  text-shadow: 0 0 15px currentColor;
  font-weight: 900;
}

/* Contact Header */
.contact-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.avatar-games {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow:
      0 0 40px rgba(0, 0, 0, 0.6),
      inset 0 0 40px rgba(255, 255, 255, 0.2),
      0 0 80px currentColor;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(0, 0, 0, 0.6) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 0.5em;
  margin-bottom: 2px;
  animation: gameIconBounce 2s ease-in-out infinite;
}

.play-text {
  font-size: 0.25em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 10px currentColor;
}

@keyframes gameIconBounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-3px) scale(1.1); }
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

.tetris-trigger {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  border: 4px solid currentColor;
  background: linear-gradient(45deg,
  rgba(157, 78, 221, 0.2) 0%,
  rgba(157, 78, 221, 0.1) 100%);
  overflow: hidden;
  box-shadow:
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 30px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(157, 78, 221, 0.5);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tetris-trigger:hover {
  transform: scale(1.05);
  box-shadow:
      0 0 40px rgba(0, 0, 0, 0.6),
      inset 0 0 40px rgba(255, 255, 255, 0.2),
      0 0 80px rgba(157, 78, 221, 0.8);
}

.tetris-trigger::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #9d4edd, transparent, #9d4edd);
  border-radius: 12px;
  z-index: -1;
  animation: tetrisGlow 3s ease-in-out infinite alternate;
}

@keyframes tetrisGlow {
  0% { opacity: 0.5; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

.tetris-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(157, 78, 221, 0.6) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.tetris-trigger:hover .tetris-overlay {
  opacity: 1;
}

.tetris-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: inherit;
  text-shadow: 0 0 20px currentColor;
  animation: tetrisPulse 2s ease-in-out infinite alternate;
}

@keyframes tetrisPulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.tetris-play-icon {
  font-size: 0.4em;
  margin-bottom: 2px;
  animation: tetrisIconBounce 2s ease-in-out infinite;
}

.tetris-play-text {
  font-size: 0.2em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 10px currentColor;
}

@keyframes tetrisIconBounce {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
}

.contact-title {
  text-align: center;
  position: relative;
  z-index: 2;
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

.contact-title h3 {
  font-size: 1.3em;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 1.4;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.location {
  opacity: 0.8;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.8);
}

/* Contact Details */
.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  justify-content: center;
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

/* Sections */
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
  justify-content: center;
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

/* Contact Card Base */
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

/* Mobile responsive */
@media (max-width: 768px) {
  .email-contact-btn {
    padding: 15px 25px;
    font-size: 1em;
    letter-spacing: 1px;
  }

  .email-icon {
    font-size: 1.5em;
  }

  .email-text {
    font-size: 0.9em;
  }

  .contact-header {
    gap: 20px;
  }

  .avatar-games {
    gap: 15px;
    justify-content: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    font-size: 2.5em;
  }

  .tetris-trigger {
    width: 80px;
    height: 80px;
    font-size: 2.5em;
  }

  .contact-title h1 {
    font-size: 2.2em;
  }

  .contact-title h3 {
    font-size: 1.1em;
  }

  .contact-details {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .skills-list {
    justify-content: center;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .email-contact-btn {
    padding: 12px 20px;
    font-size: 0.9em;
  }

  .contact-title h1 {
    font-size: 1.8em;
  }

  .contact-title h3 {
    font-size: 1em;
  }

  .avatar {
    width: 70px;
    height: 70px;
    font-size: 2em;
  }

  .tetris-trigger {
    width: 70px;
    height: 70px;
    font-size: 2em;
  }

  .avatar-games {
    gap: 12px;
  }

  .skills-section,
  .languages-section,
  .summary-section {
    padding: 15px;
  }
}

/* Vertical layout for smaller screens */
@media (max-width: 640px) {
  .contact-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar-games {
    order: -1;
    margin-bottom: 0;
  }
}
</style>