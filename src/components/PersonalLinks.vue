<template>
  <div :class="theme.cardClass">
    <div class="links-header">
      <h2>{{ theme.linksTitle || 'Personal Links & Current Projects' }}</h2>
      <p class="links-subtitle">{{ theme.linksSubtitle || 'Connect with me and check out my active projects' }}</p>
    </div>

    <div class="links-grid">
      <a
          v-for="link in links"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          :class="['link-card', theme.linkCardClass]"
      >
        <div class="link-icon">
          {{ link.icon }}
        </div>
        <div class="link-content">
          <h3>{{ link.name }}</h3>
          <p>{{ link.description }}</p>
          <span class="link-status" :class="getStatusClass(link.status)">
            {{ link.status }}
          </span>
        </div>
        <div class="link-arrow">
          →
        </div>
      </a>
    </div>

    <div class="current-projects" v-if="theme.showProjects">
      <h3>Current Active Projects</h3>
      <div class="projects-list">
        <div
            v-for="project in links.filter(l => l.type === 'project')"
            :key="project.name"
            class="project-item"
        >
          <div class="project-status-dot" :class="getStatusClass(project.status)"></div>
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
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.links-header {
  text-align: center;
  margin-bottom: 35px;
}

.links-header h2 {
  font-size: 2.2em;
  margin-bottom: 10px;
  font-weight: 700;
}

.links-subtitle {
  opacity: 0.8;
  font-size: 1.1em;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.link-icon {
  font-size: 2.5em;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.link-content {
  flex: 1;
}

.link-content h3 {
  font-size: 1.3em;
  margin-bottom: 5px;
  font-weight: 600;
}

.link-content p {
  opacity: 0.8;
  font-size: 0.95em;
  line-height: 1.4;
  margin-bottom: 8px;
}

.link-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.link-arrow {
  font-size: 1.5em;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(5px);
}

.status-active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-progress {
  background: rgba(249, 115, 22, 0.2);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.status-completed {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.status-planning {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.status-maintenance {
  background: rgba(234, 179, 8, 0.2);
  color: #eab308;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.status-beta {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.status-default {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.current-projects {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
}

.current-projects h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
  font-weight: 600;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.project-status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-info h4 {
  font-size: 1.1em;
  margin-bottom: 3px;
  font-weight: 500;
}

.project-info p {
  opacity: 0.8;
  font-size: 0.9em;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }

  .link-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .link-arrow {
    transform: rotate(90deg);
  }

  .link-card:hover .link-arrow {
    transform: rotate(90deg) translateX(5px);
  }
}
</style>