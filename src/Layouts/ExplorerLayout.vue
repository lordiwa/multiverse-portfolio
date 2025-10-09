<template>
  <div class="explorer-layout">
    <!-- Map-style header -->
    <div class="expedition-header">
      <div class="compass">{{ profile.contact.avatar }}</div>
      <div class="explorer-info">
        <h1>{{ profile.contact.name }}</h1>
        <p class="expedition-title">{{ profile.contact.title }}</p>
        <div class="coordinates">
          <span>📍 {{ profile.contact.location }}</span>
          <button @click="$emit('open-email')" class="contact-beacon">Send Signal</button>
        </div>
      </div>
    </div>

    <!-- Expedition cards (experiences as discovered locations) -->
    <div class="expeditions-map">
      <h2>Expeditions</h2>
      <div class="expedition-path">
        <div
            v-for="(exp, idx) in profile.experiences"
            :key="idx"
            class="expedition-marker"
            :class="`marker-${idx % 3}`"
        >
          <div class="marker-pin">{{ idx + 1 }}</div>
          <div class="expedition-card">
            <div class="card-header">
              <span class="expedition-icon">🗺️</span>
              <span class="expedition-date">{{ exp.duration }}</span>
            </div>
            <h3>{{ exp.company }}</h3>
            <h4>{{ exp.position }}</h4>
            <p v-if="exp.description">{{ exp.description }}</p>
            <div v-if="exp.achievements" class="discoveries">
              <strong>Discoveries:</strong>
              <ul>
                <li v-for="achievement in exp.achievements.slice(0, 2)" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Field equipment (skills) -->
    <div class="field-equipment">
      <h2>Field Equipment</h2>
      <div class="equipment-grid">
        <div
            v-for="skill in profile.contact.skills"
            :key="skill"
            class="equipment-item"
        >
          <span class="equipment-icon">🎒</span>
          <span>{{ skill }}</span>
        </div>
      </div>
    </div>

    <!-- Base camps (links) -->
    <div class="base-camps">
      <h2>Base Camps & Resources</h2>
      <div class="camps-grid">
        <div
            v-for="link in profile.links"
            :key="link.name"
            class="camp-card"
            @click="handleLinkClick(link)"
        >
          <div class="camp-flag">{{ link.icon }}</div>
          <h3>{{ link.name }}</h3>
          <p>{{ link.description }}</p>
          <span class="camp-status">{{ link.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
.explorer-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.expedition-header {
  display: flex;
  gap: 40px;
  align-items: center;
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.1), rgba(0, 191, 255, 0.1));
  border: 3px solid rgba(144, 238, 144, 0.4);
  border-radius: 30px;
  padding: 40px;
  margin-bottom: 60px;
}

.compass {
  font-size: 6em;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(144, 238, 144, 0.2), transparent);
  border: 4px solid rgba(144, 238, 144, 0.6);
  border-radius: 50%;
  flex-shrink: 0;
}

.explorer-info h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.expedition-title {
  font-size: 1.1em;
  opacity: 0.9;
  margin-bottom: 20px;
}

.coordinates {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.contact-beacon {
  padding: 12px 30px;
  background: rgba(144, 238, 144, 0.3);
  border: 2px solid #90ee90;
  color: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.contact-beacon:hover {
  background: #90ee90;
  color: #000;
}

.expeditions-map {
  margin-bottom: 80px;
}

.expeditions-map h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
  text-align: center;
}

.expedition-path {
  position: relative;
  padding-left: 80px;
}

.expedition-path::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #90ee90, #00bfff);
  border-radius: 2px;
}

.expedition-marker {
  position: relative;
  margin-bottom: 60px;
}

.marker-pin {
  position: absolute;
  left: -64px;
  top: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #90ee90, #00bfff);
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.2em;
  color: #000;
  z-index: 2;
}

.marker-pin::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: markerPulse 2s ease-out infinite;
}

@keyframes markerPulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.expedition-card {
  background: rgba(144, 238, 144, 0.05);
  border: 2px solid rgba(144, 238, 144, 0.3);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s;
}

.expedition-card:hover {
  background: rgba(144, 238, 144, 0.1);
  border-color: #90ee90;
  transform: translateX(10px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.expedition-icon {
  font-size: 2em;
}

.expedition-date {
  background: rgba(144, 238, 144, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
}

.expedition-card h3 {
  font-size: 1.6em;
  margin-bottom: 8px;
}

.expedition-card h4 {
  font-size: 1.2em;
  opacity: 0.9;
  margin-bottom: 15px;
}

.discoveries {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid rgba(144, 238, 144, 0.2);
}

.discoveries ul {
  margin-top: 10px;
  padding-left: 20px;
}

.discoveries li {
  margin-bottom: 8px;
  opacity: 0.9;
}

.field-equipment {
  margin-bottom: 80px;
  text-align: center;
}

.field-equipment h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.equipment-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(144, 238, 144, 0.05);
  border: 2px solid rgba(144, 238, 144, 0.3);
  border-radius: 15px;
  transition: all 0.3s;
}

.equipment-item:hover {
  background: rgba(144, 238, 144, 0.15);
  transform: translateY(-5px);
}

.equipment-icon {
  font-size: 2em;
}

.base-camps h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
  text-align: center;
}

.camps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.camp-card {
  background: rgba(0, 191, 255, 0.05);
  border: 2px solid rgba(0, 191, 255, 0.3);
  border-radius: 15px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.camp-card:hover {
  background: rgba(0, 191, 255, 0.15);
  border-color: #00bfff;
  transform: translateY(-5px);
}

.camp-flag {
  font-size: 3em;
  margin-bottom: 15px;
}

.camp-card h3 {
  font-size: 1.4em;
  margin-bottom: 10px;
}

.camp-card p {
  opacity: 0.9;
  margin-bottom: 15px;
  line-height: 1.6;
}

.camp-status {
  display: inline-block;
  padding: 5px 15px;
  background: rgba(144, 238, 144, 0.2);
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
}

@media (max-width: 768px) {
  .expedition-header {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .compass {
    font-size: 4em;
    width: 100px;
    height: 100px;
  }

  .expedition-path {
    padding-left: 50px;
  }

  .marker-pin {
    left: -44px;
    width: 35px;
    height: 35px;
    font-size: 0.9em;
  }

  .equipment-grid {
    grid-template-columns: 1fr;
  }

  .camps-grid {
    grid-template-columns: 1fr;
  }
}
</style>