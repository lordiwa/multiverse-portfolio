<template>
  <div :class="theme.cardClass">
    <div class="experience-header">
      <h2>{{ theme.experienceTitle || 'Professional Experience' }}</h2>
      <span class="timeline-subtitle">From oldest to newest</span>
    </div>

    <div class="timeline">
      <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="timeline-item"
          :class="{ 'timeline-item-reverse': index % 2 === 1 }"
      >
        <div class="timeline-dot" :class="theme.dotClass"></div>
        <div class="timeline-content">
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
  font-family: 'Space Mono', monospace;
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
}
</style>