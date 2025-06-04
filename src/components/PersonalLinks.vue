<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <div class="links-header">
      <h2>{{ theme.linksTitle || 'Personal Links & Current Projects' }}</h2>
      <p class="links-subtitle">{{ theme.linksSubtitle || 'Connect with me and check out my active projects' }}</p>
    </div>

    <div :class="['links-grid', theme.sectionStyle]">
      <a
          v-for="link in links"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          :class="['link-card', theme.linkCardClass, theme.sectionStyle]"
      >
        <div :class="['link-icon', theme.sectionStyle]">
          {{ link.icon }}
        </div>
        <div class="link-content">
          <h3>{{ link.name }}</h3>
          <p>{{ link.description }}</p>
          <span :class="['link-status', getStatusClass(link.status)]">
            {{ link.status }}
          </span>
        </div>
        <div :class="['link-arrow', theme.sectionStyle]">
          →
        </div>
      </a>
    </div>

    <div :class="['current-projects', theme.sectionStyle]" v-if="theme.showProjects">
      <h3>Current Active Projects</h3>
      <div class="projects-list">
        <div
            v-for="project in links.filter(l => l.type === 'project')"
            :key="project.name"
            :class="['project-item', theme.sectionStyle]"
        >
          <div :class="['project-status-dot', getStatusClass(project.status)]"></div>
          <div class="project-info">
            <h4>{{ project.name }}</h4>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})

const getStatusClass = (status) => {
  const statusMap = {
    'Active': 'status-active',
    'In Progress': 'status-progress',
    'Completed': 'status-completed',
    'Planning': 'status-planning',
    'Live': 'status-active',
    'Maintenance': 'status-maintenance',
    'Beta': 'status-beta'
  }
  return statusMap[status] || 'status-default'
}
</script>

<style scoped>
.links-card {
  padding: 35px;
  border-radius: 12px;
  margin-bottom: 35px;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.12) 0%,
  rgba(255, 255, 255, 0.06) 50%,
  rgba(255, 255, 255, 0.03) 100%);
  box-shadow:
      0 12px 45px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 90px rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.links-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
      repeating-linear-gradient(60deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px),
      repeating-linear-gradient(-60deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 8px);
  pointer-events: none;
  z-index: 1;
}

.links-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}

.links-header h2 {
  font-size: 2.5em;
  margin-bottom: 15px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px currentColor;
  background: linear-gradient(45deg, currentColor, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links-subtitle {
  opacity: 0.9;
  font-size: 1.2em;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 600;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 0 15px rgba(255,255,255,0.3);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 45px;
  position: relative;
  z-index: 2;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  border: 2px solid rgba(255, 255, 255, 0.15);
  color: inherit;
  text-decoration: none;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
  pointer-events: none;
  z-index: 1;
}

.link-card:hover {
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0.1) 50%,
  rgba(255, 255, 255, 0.05) 100%);
  transform: translateY(-8px) scale(1.03);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 80px currentColor;
}

.link-icon {
  font-size: 3em;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.15) 0%,
  rgba(255, 255, 255, 0.08) 100%);
  border: 3px solid rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 2;
  box-shadow:
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.1),
      0 0 40px currentColor;
  filter: drop-shadow(0 0 15px currentColor);
  animation: iconFloat 4s ease-in-out infinite alternate;
}

@keyframes iconFloat {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.link-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.link-content h3 {
  font-size: 1.4em;
  margin-bottom: 8px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 15px currentColor;
}

.link-content p {
  opacity: 0.9;
  font-size: 1em;
  line-height: 1.5;
  margin-bottom: 12px;
  letter-spacing: 0.3px;
  color: rgba(255,255,255,0.9);
}

.link-status {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  animation: statusGlow 3s ease-in-out infinite alternate;
}

@keyframes statusGlow {
  0% { filter: brightness(1); }
  100% { filter: brightness(1.2); }
}

.link-arrow {
  font-size: 2em;
  opacity: 0.7;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 15px currentColor;
  animation: arrowPulse 2s ease-in-out infinite alternate;
}

@keyframes arrowPulse {
  0% { transform: translateX(0px) scale(1); }
  100% { transform: translateX(5px) scale(1.1); }
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(10px) scale(1.2);
  filter: drop-shadow(0 0 20px currentColor);
}

.status-active {
  background: linear-gradient(45deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.15));
  color: #22c55e;
  border: 2px solid rgba(34, 197, 94, 0.4);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.status-progress {
  background: linear-gradient(45deg, rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0.15));
  color: #f97316;
  border: 2px solid rgba(249, 115, 22, 0.4);
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
}

.status-completed {
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.15));
  color: #3b82f6;
  border: 2px solid rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.status-planning {
  background: linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.15));
  color: #a855f7;
  border: 2px solid rgba(168, 85, 247, 0.4);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.status-maintenance {
  background: linear-gradient(45deg, rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0.15));
  color: #eab308;
  border: 2px solid rgba(234, 179, 8, 0.4);
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
}

.status-beta {
  background: linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(236, 72, 153, 0.15));
  color: #ec4899;
  border: 2px solid rgba(236, 72, 153, 0.4);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
}

.status-default {
  background: linear-gradient(45deg, rgba(156, 163, 175, 0.3), rgba(156, 163, 175, 0.15));
  color: #9ca3af;
  border: 2px solid rgba(156, 163, 175, 0.4);
  box-shadow: 0 0 20px rgba(156, 163, 175, 0.3);
}

.current-projects {
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  padding-top: 35px;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.06) 0%,
  rgba(255, 255, 255, 0.02) 100%);
  padding: 25px;
  border-radius: 12px;
  margin-top: 20px;
}

.current-projects h3 {
  font-size: 1.8em;
  margin-bottom: 25px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px currentColor;
  text-align: center;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.04) 100%);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.project-item:hover {
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.15) 0%,
  rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px) translateX(8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.project-status-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  box-shadow: 0 0 15px currentColor;
  animation: dotBlink 2s ease-in-out infinite alternate;
}

@keyframes dotBlink {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.2); }
}

.project-info h4 {
  font-size: 1.2em;
  margin-bottom: 5px;
  font-weight: 600;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-info p {
  opacity: 0.9;
  font-size: 0.95em;
  line-height: 1.5;
  letter-spacing: 0.3px;
}

/* Theme-specific link card styles */
.tattoo-section .link-card {
  border-left: 4px solid #ff6b6b;
  font-style: italic;
}

.tattoo-section .link-icon {
  transform: rotate(-5deg);
}

.vet-section .link-card {
  border-left: 4px solid #90ee90;
  border-radius: 20px;
}

.vet-section .link-icon {
  border-radius: 50%;
}

.dance-section .link-card {
  border-left: 4px solid #ff69b4;
  animation: danceCardSway 3s ease-in-out infinite;
}

@keyframes danceCardSway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
}

.chef-section .link-card {
  border-left: 4px solid #ffa500;
  border-radius: 15px 0 15px 0;
}

.chef-section .link-icon {
  border-radius: 15px 0 15px 0;
}

.marine-section .link-card {
  border-left: 4px solid #00bfff;
  border-radius: 0 20px 0 20px;
}

.marine-section .link-icon {
  border-radius: 0 20px 0 20px;
  animation: waveFloat 4s ease-in-out infinite;
}

@keyframes waveFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.gamer-section .link-card {
  border-left: 4px solid #9d4edd;
  position: relative;
}

.gamer-section .link-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 40%, rgba(157,78,221,0.1) 50%, transparent 60%);
  animation: scanLine 3s linear infinite;
  pointer-events: none;
}

@keyframes scanLine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.artist-section .link-card {
  border-left: 4px solid #dda0dd;
  border-radius: 25px 5px 25px 5px;
}

.artist-section .link-icon {
  border-radius: 25px 5px 25px 5px;
  animation: artistPulse 2s ease-in-out infinite alternate;
}

@keyframes artistPulse {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(20deg); }
}

.astronaut-section .link-card {
  border: 2px solid rgba(192,192,192,0.3);
  border-left: 4px solid #c0c0c0;
  border-radius: 10px;
}

.astronaut-section .link-icon {
  animation: orbitFloat 6s ease-in-out infinite;
}

@keyframes orbitFloat {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-3px) translateX(3px); }
  75% { transform: translateY(3px) translateX(-3px); }
}

.time-section .link-card {
  border-left: 4px solid #ffd700;
  position: relative;
}

.time-section .link-card::before {
  animation: timeWarp 5s ease-in-out infinite;
}

@keyframes timeWarp {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.dragon-section .link-card {
  border-left: 4px solid #ff4500;
  border-radius: 0 30px 0 30px;
  position: relative;
}

.dragon-section .link-card::after {
  content: '🔥';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2em;
  opacity: 0.3;
  animation: fireFlicker 2s ease-in-out infinite alternate;
}

@keyframes fireFlicker {
  0% { opacity: 0.2; transform: scale(0.9); }
  100% { opacity: 0.5; transform: scale(1.1); }
}

.hero-section .link-card {
  border-left: 4px solid #1e90ff;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(30,144,255,0.3);
}

.hero-section .link-icon {
  animation: heroGlow 3s ease-in-out infinite alternate;
}

@keyframes heroGlow {
  0% { box-shadow: 0 0 30px rgba(30,144,255,0.5); }
  100% { box-shadow: 0 0 50px rgba(30,144,255,0.8); }
}

.wizard-section .link-card {
  border-left: 4px solid #9300d3;
  border-radius: 50px 0 50px 0;
  position: relative;
}

.wizard-section .link-card::after {
  content: '✨';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5em;
  opacity: 0.4;
  animation: sparkle 2s ease-in-out infinite alternate;
}

@keyframes sparkle {
  0% { opacity: 0.2; transform: scale(1) rotate(0deg); }
  100% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
}

.ai-section .link-card {
  border: 1px solid rgba(0,255,0,0.3);
  border-left: 4px solid #00ff00;
  position: relative;
}

.ai-section .link-card::before {
  background: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 11px);
  animation: matrix 10s linear infinite;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .link-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 25px;
  }

  .link-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5em;
  }

  .link-arrow {
    transform: rotate(90deg);
    font-size: 1.5em;
  }

  .link-card:hover .link-arrow {
    transform: rotate(90deg) translateX(5px) scale(1.1);
  }

  .links-header h2 {
    font-size: 2em;
  }

  .project-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  /* Reset animations for mobile */
  .dance-section .link-card,
  .marine-section .link-icon,
  .gamer-section .link-card::after,
  .artist-section .link-icon,
  .astronaut-section .link-icon,
  .time-section .link-card::before,
  .dragon-section .link-card::after,
  .hero-section .link-icon,
  .wizard-section .link-card::after,
  .ai-section .link-card::before {
    animation: none;
  }

  .tattoo-section .link-icon,
  .dance-section .link-card,
  .time-section .link-card {
    transform: none;
  }
}
</style>