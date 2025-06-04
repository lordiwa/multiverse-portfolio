<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <div class="experience-header">
      <h2>{{ theme.experienceTitle || 'Professional Experience' }}</h2>
      <span class="timeline-subtitle">From newest to oldest</span>
    </div>

    <div class="timeline">
      <div
          v-for="(exp, index) in experiences"
          :key="index"
          :class="['timeline-item', theme.sectionStyle]"
          :data-index="index"
      >
        <div :class="['timeline-dot', theme.dotClass]"></div>
        <div :class="['timeline-content', theme.sectionStyle]">
          <div class="company-info">
            <h3>{{ exp.company }}</h3>
            <h4>{{ exp.position }}</h4>
            <span class="duration">{{ exp.duration }}</span>
            <span class="location" v-if="exp.location">{{ exp.location }}</span>
          </div>

          <div class="job-description" v-if="exp.description">
            <p>{{ exp.description }}</p>
          </div>

          <div class="achievements" v-if="exp.achievements && exp.achievements.length">
            <ul>
              <li v-for="achievement in exp.achievements" :key="achievement">
                {{ achievement }}
              </li>
            </ul>
          </div>

          <div class="tech-stack" v-if="exp.technologies && exp.technologies.length">
            <div class="tech-tags">
              <span
                  v-for="tech in exp.technologies"
                  :key="tech"
                  :class="theme.techBadgeClass"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.experience-card {
  padding: 35px;
  border-radius: 12px;
  margin-bottom: 35px;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.12) 0%,
  rgba(255, 255, 255, 0.06) 50%,
  rgba(255, 255, 255, 0.03) 100%);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2),
  0 0 80px rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255, 255, 255, 0.03) 3px, rgba(255, 255, 255, 0.03) 6px),
  repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 6px);
  pointer-events: none;
  z-index: 1;
}

.experience-header {
  text-align: center;
  margin-bottom: 45px;
  position: relative;
  z-index: 2;
}

.experience-header h2 {
  font-size: 2.5em;
  margin-bottom: 12px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px currentColor;
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timeline-subtitle {
  opacity: 0.8;
  font-size: 1.2em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.timeline {
  position: relative;
  padding: 25px 0;
  z-index: 2;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg,
  transparent,
  currentColor 10%,
  currentColor 90%,
  transparent);
  opacity: 0.4;
  box-shadow: 0 0 20px currentColor;
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 4px solid currentColor;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0.1) 100%);
  z-index: 3;
  transition: all 0.4s ease;
  box-shadow: 0 0 30px currentColor,
  inset 0 0 15px rgba(255, 255, 255, 0.2);
  animation: dotPulse 3s ease-in-out infinite alternate;
}

@keyframes dotPulse {
  0% {
    transform: translateX(-50%) scale(1);
    box-shadow: 0 0 30px currentColor, inset 0 0 15px rgba(255, 255, 255, 0.2);
  }
  100% {
    transform: translateX(-50%) scale(1.2);
    box-shadow: 0 0 50px currentColor, inset 0 0 25px rgba(255, 255, 255, 0.3);
  }
}

.timeline-content {
  width: 45%;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.04) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.timeline-content:hover {
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.15) 0%,
  rgba(255, 255, 255, 0.08) 50%,
  rgba(255, 255, 255, 0.04) 100%);
  transform: translateY(-5px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.3),
  0 0 60px currentColor;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-right: auto;
  margin-left: 0;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: auto;
  margin-right: 0;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 35px;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
}

.timeline-item:nth-child(odd) .timeline-content::before {
  right: -24px;
  border-left-color: rgba(255, 255, 255, 0.15);
}

.timeline-item:nth-child(even) .timeline-content::before {
  left: -24px;
  border-right-color: rgba(255, 255, 255, 0.15);
}

.company-info h3 {
  font-size: 1.6em;
  margin-bottom: 8px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 15px currentColor;
}

.company-info h4 {
  font-size: 1.2em;
  margin-bottom: 12px;
  opacity: 0.9;
  font-weight: 600;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

.duration {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.15) 0%,
  rgba(255, 255, 255, 0.08) 100%);
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.location {
  display: block;
  opacity: 0.8;
  font-size: 0.95em;
  margin-top: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
}

.job-description {
  margin: 18px 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.job-description p {
  line-height: 1.7;
  opacity: 0.9;
  font-size: 1em;
  letter-spacing: 0.3px;
}

.achievements {
  margin: 18px 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.achievements ul {
  list-style: none;
  padding-left: 0;
}

.achievements li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  opacity: 0.9;
  line-height: 1.6;
  font-size: 0.95em;
  letter-spacing: 0.2px;
}

.achievements li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: currentColor;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
  animation: arrowGlow 2s ease-in-out infinite alternate;
}

@keyframes arrowGlow {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.tech-stack {
  margin-top: 18px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-badge {
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: 600;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.12) 0%,
  rgba(255, 255, 255, 0.06) 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.tech-badge:hover {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.3));
  color: black;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px currentColor;
}

/* Theme-specific timeline content styles */
.tattoo-section .timeline-content {
  font-style: italic;
  border-left: 4px solid #ff6b6b;
}

.tattoo-section .timeline-content::before {
  border-left-color: #ff6b6b !important;
  border-right-color: #ff6b6b !important;
}

.vet-section .timeline-content {
  border-radius: 20px;
  border-left: 4px solid #90ee90;
}

.vet-section .timeline-content::before {
  border-left-color: #90ee90 !important;
  border-right-color: #90ee90 !important;
}

.dance-section .timeline-content {
  border-left: 4px solid #ff69b4;
}

.dance-section .timeline-content::before {
  border-left-color: #ff69b4 !important;
  border-right-color: #ff69b4 !important;
}

.chef-section .timeline-content {
  border-radius: 15px 0 15px 0;
  border-left: 4px solid #ffa500;
}

.chef-section .timeline-content::before {
  border-left-color: #ffa500 !important;
  border-right-color: #ffa500 !important;
}

.marine-section .timeline-content {
  border-radius: 0 20px 0 20px;
  border-left: 4px solid #00bfff;
}

.marine-section .timeline-content::before {
  border-left-color: #00bfff !important;
  border-right-color: #00bfff !important;
}

.gamer-section .timeline-content {
  border-left: 4px solid #9d4edd;
}

.gamer-section .timeline-content::before {
  border-left-color: #9d4edd !important;
  border-right-color: #9d4edd !important;
}

.artist-section .timeline-content {
  border-radius: 25px 5px 25px 5px;
  border-left: 4px solid #dda0dd;
}

.artist-section .timeline-content::before {
  border-left-color: #dda0dd !important;
  border-right-color: #dda0dd !important;
}

.astronaut-section .timeline-content {
  border: 2px solid rgba(192,192,192,0.3);
  border-left: 4px solid #c0c0c0;
  border-radius: 10px;
}

.astronaut-section .timeline-content::before {
  border-left-color: #c0c0c0 !important;
  border-right-color: #c0c0c0 !important;
}

.time-section .timeline-content {
  border-left: 4px solid #ffd700;
}

.time-section .timeline-content::before {
  border-left-color: #ffd700 !important;
  border-right-color: #ffd700 !important;
}

.dragon-section .timeline-content {
  border-radius: 0 30px 0 30px;
  border-left: 4px solid #ff4500;
  position: relative;
}

.dragon-section .timeline-content::after {
  content: '🔥';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2em;
  opacity: 0.3;
}

.dragon-section .timeline-content::before {
  border-left-color: #ff4500 !important;
  border-right-color: #ff4500 !important;
}

.hero-section .timeline-content {
  border-radius: 15px;
  border-left: 4px solid #1e90ff;
  box-shadow: 0 0 20px rgba(30,144,255,0.3);
}

.hero-section .timeline-content::before {
  border-left-color: #1e90ff !important;
  border-right-color: #1e90ff !important;
}

.wizard-section .timeline-content {
  border-radius: 50px 0 50px 0;
  border-left: 4px solid #9300d3;
  position: relative;
}

.wizard-section .timeline-content::after {
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

.wizard-section .timeline-content::before {
  border-left-color: #9300d3 !important;
  border-right-color: #9300d3 !important;
}

.ai-section .timeline-content {
  border: 1px solid rgba(0,255,0,0.3);
  border-left: 4px solid #00ff00;
  position: relative;
}

.ai-section .timeline-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 11px);
  pointer-events: none;
  animation: matrix 10s linear infinite;
  border-radius: inherit;
}

@keyframes matrix {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

.ai-section .timeline-content::before {
  border-left-color: #00ff00 !important;
  border-right-color: #00ff00 !important;
}

/* Special timeline item animations per theme */
.tattoo-section .timeline-item:nth-child(even) {
  animation: tattooFloat 4s ease-in-out infinite alternate;
}

@keyframes tattooFloat {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-5px); }
}

.dance-section .timeline-item {
  animation: danceRhythm 3s ease-in-out infinite;
}

@keyframes danceRhythm {
  0%, 100% { transform: translateX(0px); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}

.gamer-section .timeline-item {
  transition: all 0.3s ease;
}

.gamer-section .timeline-item:hover {
  filter: brightness(1.2) saturate(1.3);
}

.astronaut-section .timeline-item {
  animation: spaceFloat 6s ease-in-out infinite alternate;
}

@keyframes spaceFloat {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-3px) translateX(2px); }
  100% { transform: translateY(0px) translateX(0px); }
}

.wizard-section .timeline-item {
  animation: magicalShimmer 4s ease-in-out infinite alternate;
}

@keyframes magicalShimmer {
  0% { filter: brightness(1) hue-rotate(0deg); }
  100% { filter: brightness(1.1) hue-rotate(10deg); }
}

.ai-section .timeline-item {
  animation: digitalGlitch 5s linear infinite;
}

@keyframes digitalGlitch {
  0%, 90%, 100% { transform: translateX(0); }
  95% { transform: translateX(2px); }
  97% { transform: translateX(-2px); }
}

@media (max-width: 768px) {
  .timeline::before {
    left: 35px;
  }

  .timeline-dot {
    left: 35px;
  }

  .timeline-content {
    width: calc(100% - 90px);
    margin-left: 70px !important;
    margin-right: 0 !important;
  }

  .timeline-content::before {
    left: -24px !important;
    right: auto !important;
    border-right-color: rgba(255, 255, 255, 0.15) !important;
    border-left-color: transparent !important;
  }

  .experience-header h2 {
    font-size: 2em;
  }

  .company-info h3 {
    font-size: 1.4em;
  }

  /* Reset animations for mobile */
  .dance-section .timeline-item,
  .tattoo-section .timeline-item,
  .astronaut-section .timeline-item,
  .wizard-section .timeline-item,
  .ai-section .timeline-item {
    animation: none;
  }

  /* Mobile-specific theme overrides */
  .tattoo-section .timeline-content,
  .dance-section .timeline-content,
  .gamer-section .timeline-content {
    transform: none;
  }

  .time-section .timeline-content {
    transform: none;
  }
}
</style>