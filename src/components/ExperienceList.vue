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
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-header {
  text-align: center;
  margin-bottom: 40px;
}

.experience-header h2 {
  font-size: 2.2em;
  margin-bottom: 8px;
  font-weight: 700;
}

.timeline-subtitle {
  opacity: 0.7;
  font-size: 1.1em;
  font-weight: 500;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, transparent, currentColor 10%, currentColor 90%, transparent);
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  width: 100%;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid currentColor;
  background: rgba(255, 255, 255, 0.1);
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-content {
  width: 45%;
  padding: 25px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(5px);
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
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
  top: 30px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
}

.timeline-item:nth-child(odd) .timeline-content::before {
  right: -20px;
  border-left-color: rgba(255, 255, 255, 0.1);
}

.timeline-item:nth-child(even) .timeline-content::before {
  left: -20px;
  border-right-color: rgba(255, 255, 255, 0.1);
}

.company-info h3 {
  font-size: 1.4em;
  margin-bottom: 5px;
  font-weight: 600;
}

.company-info h4 {
  font-size: 1.1em;
  margin-bottom: 8px;
  opacity: 0.9;
  font-weight: 500;
}

.duration {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: 500;
  margin-bottom: 8px;
}

.location {
  display: block;
  opacity: 0.7;
  font-size: 0.9em;
  margin-top: 5px;
}

.job-description {
  margin: 15px 0;
}

.job-description p {
  line-height: 1.6;
  opacity: 0.9;
}

.achievements {
  margin: 15px 0;
}

.achievements ul {
  list-style: none;
  padding-left: 0;
}

.achievements li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  opacity: 0.9;
  line-height: 1.5;
}

.achievements li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: currentColor;
  font-weight: bold;
}

.tech-stack {
  margin-top: 15px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-dot {
    left: 30px;
  }
  
  .timeline-content {
    width: calc(100% - 80px);
    margin-left: 60px !important;
    margin-right: 0 !important;
  }
  
  .timeline-content::before {
    left: -20px !important;
    right: auto !important;
    border-right-color: rgba(255, 255, 255, 0.1) !important;
    border-left-color: transparent !important;
  }
}
</style>