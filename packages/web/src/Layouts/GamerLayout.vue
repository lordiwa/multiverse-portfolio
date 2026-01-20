<template>
  <div class="gamer-layout">
    <!-- HUD Header -->
    <div class="hud-header">
      <div class="player-card">
        <div class="player-avatar">{{ profile.contact.avatar }}</div>
        <div class="player-info">
          <div class="player-tag">{{ profile.contact.name }}</div>
          <div class="player-role">{{ profile.contact.title }}</div>
          <div class="player-stats">
            <span class="stat">LVL 99</span>
            <span class="stat">⭐ {{ profile.experiences.length }} XP</span>
            <span class="stat">🏆 {{ profile.links.length }} Achievements</span>
          </div>
        </div>
      </div>
      <button class="hud-button" @click="$emit('open-email')">Send Message</button>
    </div>

    <!-- Mission Log (Experiences) -->
    <div class="mission-log">
      <div class="log-header">
        <h2>MISSION LOG</h2>
        <div class="log-stats">
          <span>{{ profile.experiences.length }} Missions Completed</span>
        </div>
      </div>
      <div class="missions-container">
        <div
          v-for="(exp, idx) in profile.experiences"
          :key="idx"
          class="mission-entry"
          :class="`mission-tier-${idx % 3}`"
        >
          <div class="mission-header">
            <span class="mission-id">#{{ String(idx + 1).padStart(3, '0') }}</span>
            <span class="mission-status">COMPLETED</span>
          </div>
          <h3 class="mission-title">{{ exp.position }}</h3>
          <div class="mission-location">📍 {{ exp.company }}</div>
          <div class="mission-duration">⏱️ {{ exp.duration }}</div>
          <p v-if="exp.description" class="mission-brief">{{ exp.description }}</p>
          <div v-if="exp.achievements" class="mission-objectives">
            <strong>OBJECTIVES:</strong>
            <ul>
              <li v-for="achievement in exp.achievements.slice(0, 3)" :key="achievement">
                ✓ {{ achievement }}
              </li>
            </ul>
          </div>
          <div v-if="exp.technologies" class="mission-loadout">
            <strong>LOADOUT:</strong>
            <div class="loadout-items">
              <span
                v-for="tech in exp.technologies.slice(0, 4)"
                :key="tech"
                class="loadout-item"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Loadout -->
    <div class="skills-loadout">
      <h2 class="loadout-title">CURRENT LOADOUT</h2>
      <div class="skills-grid">
        <div
          v-for="(skill, idx) in profile.contact.skills"
          :key="skill"
          class="skill-slot"
          :style="{ animationDelay: `${idx * 0.05}s` }"
        >
          <div class="skill-icon">⚡</div>
          <div class="skill-name">{{ skill }}</div>
          <div class="skill-level">
            <div class="level-bar" :style="{ width: `${Math.random() * 30 + 70}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Access Links -->
    <div class="quick-access">
      <h2 class="access-title">QUICK ACCESS</h2>
      <div class="access-grid">
        <div
          v-for="link in profile.links"
          :key="link.name"
          class="access-button"
          @click="handleLinkClick(link)"
        >
          <div class="button-icon">{{ link.icon }}</div>
          <div class="button-content">
            <div class="button-title">{{ link.name }}</div>
            <div class="button-desc">{{ link.description }}</div>
          </div>
          <div class="button-status">{{ link.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: { type: Object, required: true },
  theme: { type: Object, required: true }
})

const emit = defineEmits(['open-email', 'open-madlibs', 'open-tetris', 'open-coming-soon'])

const handleLinkClick = (link) => {
  if (link.url === '#tetris') emit('open-tetris')
  else if (link.url === '#madlibs') emit('open-madlibs')
  else if (link.url.startsWith('#')) emit('open-coming-soon', link.url)
}
</script>

<style scoped>
.gamer-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  font-family: 'Russo One', monospace;
}

.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  background: rgba(157, 78, 221, 0.1);
  border: 3px solid #9d4edd;
  padding: 30px;
  margin-bottom: 40px;
  position: relative;
  clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
}

.hud-header::before,
.hud-header::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #9d4edd;
}

.hud-header::before {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.hud-header::after {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

.player-card {
  display: flex;
  gap: 25px;
  align-items: center;
  flex: 1;
}

.player-avatar {
  font-size: 5em;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.3), rgba(0, 0, 0, 0.5));
  border: 3px solid #9d4edd;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%);
}

.player-tag {
  font-size: 2em;
  font-weight: 900;
  color: #9d4edd;
  text-shadow: 0 0 20px #9d4edd;
  margin-bottom: 5px;
}

.player-role {
  font-size: 0.9em;
  opacity: 0.9;
  margin-bottom: 10px;
}

.player-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat {
  background: rgba(157, 78, 221, 0.2);
  padding: 5px 12px;
  border: 2px solid #9d4edd;
  font-size: 0.85em;
  font-weight: 700;
}

.hud-button {
  padding: 15px 35px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border: 3px solid #fff;
  color: #fff;
  font-family: 'Russo One', monospace;
  font-size: 1.1em;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.hud-button:hover {
  background: linear-gradient(135deg, #7b2cbf, #9d4edd);
  transform: scale(1.05);
  box-shadow: 0 0 30px #9d4edd;
}

.mission-log {
  margin-bottom: 60px;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(157, 78, 221, 0.1);
  border: 3px solid #9d4edd;
  border-bottom: none;
  margin-bottom: 0;
}

.log-header h2 {
  font-size: 2em;
  color: #9d4edd;
  text-shadow: 0 0 15px #9d4edd;
}

.log-stats {
  font-size: 0.9em;
  opacity: 0.9;
  font-weight: 700;
}

.missions-container {
  border: 3px solid #9d4edd;
  border-top: none;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.mission-entry {
  background: rgba(157, 78, 221, 0.05);
  border: 2px solid rgba(157, 78, 221, 0.3);
  padding: 25px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.3s;
}

.mission-entry:hover {
  background: rgba(157, 78, 221, 0.1);
  border-color: #9d4edd;
  transform: translateX(5px);
}

.mission-entry::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: #9d4edd;
}

.mission-tier-0::before { background: #ffd700; }
.mission-tier-1::before { background: #c0c0c0; }
.mission-tier-2::before { background: #cd7f32; }

.mission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.mission-id {
  font-size: 1.2em;
  font-weight: 900;
  color: #9d4edd;
}

.mission-status {
  background: rgba(34, 197, 94, 0.3);
  border: 2px solid #22c55e;
  padding: 5px 15px;
  font-size: 0.75em;
  font-weight: 900;
  color: #22c55e;
}

.mission-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.mission-location,
.mission-duration {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  opacity: 0.9;
  font-size: 0.9em;
}

.mission-brief {
  margin: 15px 0;
  line-height: 1.7;
  opacity: 0.9;
}

.mission-objectives {
  margin: 20px 0;
  padding: 15px;
  background: rgba(157, 78, 221, 0.05);
  border-left: 3px solid #9d4edd;
}

.mission-objectives ul {
  margin-top: 10px;
  padding-left: 20px;
  list-style: none;
}

.mission-objectives li {
  margin-bottom: 8px;
  opacity: 0.9;
}

.mission-loadout {
  margin-top: 15px;
}

.loadout-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.loadout-item {
  background: rgba(157, 78, 221, 0.2);
  border: 2px solid #9d4edd;
  padding: 5px 15px;
  font-size: 0.85em;
  font-weight: 700;
}

.skills-loadout {
  margin-bottom: 60px;
  background: rgba(0, 0, 0, 0.3);
  border: 3px solid #9d4edd;
  padding: 40px;
}

.loadout-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 40px;
  color: #9d4edd;
  text-shadow: 0 0 15px #9d4edd;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.skill-slot {
  background: rgba(157, 78, 221, 0.1);
  border: 2px solid rgba(157, 78, 221, 0.3);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s;
  animation: skillFadeIn 0.5s ease-out backwards;
}

@keyframes skillFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-slot:hover {
  background: rgba(157, 78, 221, 0.2);
  border-color: #9d4edd;
  transform: translateX(5px);
}

.skill-icon {
  font-size: 2em;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 78, 221, 0.2);
  border: 2px solid #9d4edd;
  flex-shrink: 0;
}

.skill-name {
  flex: 1;
  font-size: 1.1em;
  font-weight: 700;
}

.skill-level {
  width: 100%;
  height: 8px;
  background: rgba(157, 78, 221, 0.2);
  border: 1px solid #9d4edd;
  margin-top: 5px;
}

.level-bar {
  height: 100%;
  background: linear-gradient(90deg, #9d4edd, #7b2cbf);
  transition: width 1s ease-out;
}

.quick-access {
  background: rgba(0, 0, 0, 0.3);
  border: 3px solid #9d4edd;
  padding: 40px;
}

.access-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 40px;
  color: #9d4edd;
  text-shadow: 0 0 15px #9d4edd;
}

.access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.access-button {
  display: flex;
  gap: 20px;
  align-items: center;
  background: rgba(157, 78, 221, 0.1);
  border: 2px solid rgba(157, 78, 221, 0.3);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.access-button::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  border-top: 2px solid #9d4edd;
  border-left: 2px solid #9d4edd;
  opacity: 0;
  transition: opacity 0.3s;
}

.access-button:hover {
  background: rgba(157, 78, 221, 0.2);
  border-color: #9d4edd;
  transform: translateY(-3px);
}

.access-button:hover::before {
  opacity: 1;
}

.button-icon {
  font-size: 3em;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 78, 221, 0.2);
  border: 2px solid #9d4edd;
  flex-shrink: 0;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
}

.button-content {
  flex: 1;
}

.button-title {
  font-size: 1.2em;
  font-weight: 900;
  margin-bottom: 5px;
}

.button-desc {
  font-size: 0.85em;
  opacity: 0.8;
}

.button-status {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(157, 78, 221, 0.3);
  border: 2px solid #9d4edd;
  padding: 5px 10px;
  font-size: 0.7em;
  font-weight: 900;
}

@media (max-width: 768px) {
  .hud-header {
    flex-direction: column;
    padding: 20px;
  }

  .player-card {
    flex-direction: column;
    text-align: center;
  }

  .player-stats {
    justify-content: center;
  }

  .hud-button {
    width: 100%;
  }

  .log-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .access-grid {
    grid-template-columns: 1fr;
  }
}
</style>