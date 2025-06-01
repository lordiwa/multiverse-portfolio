<template>
  <div :class="theme.cardClass">
    <div class="contact-header">
      <div class="avatar">
        <span class="avatar-icon">{{ contact.avatar }}</span>
      </div>
      <div class="contact-title">
        <h1>{{ contact.name }}</h1>
        <h2>{{ contact.title }}</h2>
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

    <div class="skills-section">
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

    <div class="languages-section">
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

    <div class="summary-section">
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
  border-radius: 20px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  border: 3px solid currentColor;
  background: rgba(255, 255, 255, 0.1);
}

.contact-title h1 {
  font-size: 2.5em;
  margin-bottom: 5px;
  font-weight: 700;
}

.contact-title h2 {
  font-size: 1.2em;
  opacity: 0.9;
  margin-bottom: 5px;
  font-weight: 500;
}

.location {
  opacity: 0.7;
  font-size: 0.9em;
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95em;
}

.contact-icon {
  font-size: 1.2em;
}

.contact-item a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.3s ease;
}

.contact-item a:hover {
  opacity: 0.7;
}

.skills-section,
.languages-section,
.summary-section {
  margin-bottom: 25px;
}

.skills-section h3,
.languages-section h3,
.summary-section h3 {
  font-size: 1.3em;
  margin-bottom: 15px;
  font-weight: 600;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-badge {
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.85em;
  font-weight: 500;
  border: 1px solid currentColor;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.skill-badge:hover {
  background: currentColor;
  color: black;
}

.languages-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-name {
  font-weight: 500;
}

.lang-level {
  opacity: 0.7;
  font-size: 0.9em;
}

.summary-section p {
  line-height: 1.7;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .contact-header {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-details {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-title h1 {
    font-size: 2em;
  }
}
</style>