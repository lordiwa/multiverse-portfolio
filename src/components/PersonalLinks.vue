<!-- Updated PersonalLinks.vue - Emits events for view navigation -->
<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <div class="links-header">
      <h2>{{ theme.linksTitle || 'Personal Links & Current Projects' }}</h2>
      <p class="links-subtitle">{{ theme.linksSubtitle || 'Connect with me and check out my active projects' }}</p>
    </div>

    <div :class="['links-grid', theme.sectionStyle]">
      <component
          v-for="link in links"
          :key="link.name"
          :is="link.url.startsWith('#') ? 'button' : 'a'"
          :href="link.url.startsWith('#') ? undefined : link.url"
          :target="link.url.startsWith('#') ? undefined : '_blank'"
          :rel="link.url.startsWith('#') ? undefined : 'noopener noreferrer'"
          @click="link.url.startsWith('#') ? handleInteractiveLink(link.url) : null"
          :class="['link-card', theme.linkCardClass, theme.sectionStyle, { 'interactive-link': link.url.startsWith('#') }]"
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
          {{ link.url.startsWith('#') ? '▶' : '→' }}
        </div>
      </component>
    </div>

    <div :class="['current-projects', theme.sectionStyle]" v-if="theme.showProjects">
      <h3>Current Active Projects</h3>
      <div class="projects-list">
        <component
            v-for="project in links.filter(l => l.type === 'project')"
            :key="project.name"
            :is="project.url.startsWith('#') ? 'button' : 'div'"
            @click="project.url.startsWith('#') ? handleInteractiveLink(project.url) : null"
            :class="['project-item', theme.sectionStyle, { 'interactive-project': project.url.startsWith('#') }]"
        >
          <div :class="['project-status-dot', getStatusClass(project.status)]"></div>
          <div class="project-info">
            <h4>{{ project.name }}</h4>
            <p>{{ project.description }}</p>
          </div>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-tetris', 'open-madlibs', 'open-coming-soon'])

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

const handleInteractiveLink = (url) => {
  // Handle different interactive links
  switch (url) {
    case '#tetris':
    case '#neural-tetris':
    case '#infinite-tetris':
      emit('open-tetris')
      break
    case '#madlibs':
    case '#mad-libs':
      emit('open-madlibs')
      break
    case '#generative-art':
    case '#ai-integration':
    case '#analytics':
    case '#research':
    case '#academy':
    case '#ethics':
    case '#innovation':
    case '#training':
    case '#defense':
    case '#hardware':
      // Show coming soon modal for these features
      emit('open-coming-soon', url)
      break
    default:
      console.log('Unknown interactive link:', url)
      // Show generic coming soon
      emit('open-coming-soon', url)
  }
}
</script>

<style scoped>
/* Keep all existing PersonalLinks styles */

.links-card {
  padding: 35px;
  border-radius: var(--radius-lg, 24px);
  margin-bottom: 35px;
  backdrop-filter: blur(var(--glass-blur, 20px));
  -webkit-backdrop-filter: blur(var(--glass-blur, 20px));
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  font-family: inherit;
  transition: all var(--transition-smooth, 0.4s cubic-bezier(0.4, 0, 0.2, 1));
}

.links-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(60deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 8px),
    repeating-linear-gradient(-60deg, transparent, transparent 4px, rgba(255,255,255,0.015) 4px, rgba(255,255,255,0.015) 8px);
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
  padding: 25px;
  border-radius: var(--radius-md, 20px);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: inherit;
  text-decoration: none;
  transition: all var(--transition-smooth, 0.4s cubic-bezier(0.4, 0, 0.2, 1));
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px);
  pointer-events: none;
  z-index: 1;
}

.link-card:hover {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.06) 100%);
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.3),
    0 0 40px var(--theme-glow, rgba(255, 255, 255, 0.15));
}

.link-icon {
  font-size: 2.5em;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md, 20px);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.05);
  filter: drop-shadow(0 0 10px currentColor);
  transition: all 0.3s ease;
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  padding: 25px;
  border-radius: var(--radius-md, 20px);
  margin-top: 25px;
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
  padding: 18px;
  border-radius: var(--radius-sm, 12px);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-smooth, 0.4s cubic-bezier(0.4, 0, 0.2, 1));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.project-item:hover {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px) translateX(6px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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

/* INTERACTIVE LINK STYLES */
.interactive-link,
.interactive-project {
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.interactive-link::before,
.interactive-project::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
  transparent,
  rgba(255, 255, 255, 0.1),
  transparent
  );
  transition: left 0.5s ease;
  z-index: 1;
}

.interactive-link:hover::before,
.interactive-project:hover::before {
  left: 100%;
}

.interactive-link:hover .link-arrow,
.interactive-project:hover .link-arrow {
  animation: interactiveArrowPulse 0.6s ease-in-out infinite;
}

@keyframes interactiveArrowPulse {
  0%, 100% { transform: translateX(0px) scale(1); }
  50% { transform: translateX(8px) scale(1.2); }
}

/* Mobile responsive */
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

  .interactive-link,
  .interactive-project {
    padding: 20px;
    touch-action: manipulation;
  }

  .interactive-link:hover {
    transform: none;
  }

  .interactive-link:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.15);
  }
}
</style>