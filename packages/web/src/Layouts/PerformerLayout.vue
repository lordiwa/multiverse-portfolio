<template>
  <div class="performer-layout">
    <!-- Stage spotlight header -->
    <div class="stage-header">
      <div class="spotlight"></div>
      <div class="performer-intro">
        <div class="performer-avatar">{{ profile.contact.avatar }}</div>
        <h1 class="performer-name">{{ profile.contact.name }}</h1>
        <p class="performer-title">{{ profile.contact.title }}</p>
        <button class="book-performance" @click="$emit('open-email')">Book Performance</button>
      </div>
    </div>

    <!-- Performance sections (experiences as acts) -->
    <div class="performances">
      <h2 class="section-title">Performance History</h2>
      <div class="acts-container">
        <div
          v-for="(exp, idx) in profile.experiences"
          :key="idx"
          class="act-card"
          :style="{
            transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
            animationDelay: `${idx * 0.15}s`
          }"
        >
          <div class="act-number">ACT {{ idx + 1 }}</div>
          <div class="venue-name">{{ exp.company }}</div>
          <h3 class="act-title">{{ exp.position }}</h3>
          <div class="act-duration">{{ exp.duration }}</div>
          <p v-if="exp.description" class="act-description">{{ exp.description }}</p>
          <div v-if="exp.achievements" class="highlights">
            <strong>Highlights:</strong>
            <ul>
              <li v-for="achievement in exp.achievements.slice(0, 3)" :key="achievement">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills as rhythm bars -->
    <div class="skills-rhythm">
      <h2 class="section-title">Core Skills</h2>
      <div class="rhythm-bars">
        <div
          v-for="(skill, idx) in profile.contact.skills"
          :key="skill"
          class="rhythm-bar"
          :style="{
            animationDelay: `${idx * 0.1}s`,
            height: `${Math.random() * 40 + 60}px`
          }"
        >
          <span class="skill-label">{{ skill }}</span>
        </div>
      </div>
    </div>

    <!-- Links as venue posters -->
    <div class="venue-posters">
      <h2 class="section-title">Connect & Explore</h2>
      <div class="posters-grid">
        <div
          v-for="link in profile.links"
          :key="link.name"
          class="poster"
          :style="{ transform: `rotate(${Math.random() * 6 - 3}deg)` }"
          @click="handleLinkClick(link)"
        >
          <div class="poster-icon">{{ link.icon }}</div>
          <h3 class="poster-title">{{ link.name }}</h3>
          <p class="poster-desc">{{ link.description }}</p>
          <div class="poster-status">{{ link.status }}</div>
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
.performer-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.stage-header {
  position: relative;
  text-align: center;
  padding: 100px 40px;
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 165, 0, 0.2));
  border: 5px solid;
  border-image: linear-gradient(45deg, #ff69b4, #ffa500) 1;
  margin-bottom: 80px;
  overflow: hidden;
}

.spotlight {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  animation: spotlightMove 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes spotlightMove {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-30%) scale(1.2); }
}

.performer-avatar {
  font-size: 7em;
  margin-bottom: 20px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.performer-name {
  font-size: 3.5em;
  font-family: 'Pacifico', cursive;
  margin-bottom: 15px;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
}

.performer-title {
  font-size: 1.3em;
  opacity: 0.95;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.book-performance {
  padding: 20px 50px;
  background: linear-gradient(45deg, #ff69b4, #ffa500);
  border: 4px solid #fff;
  color: #fff;
  font-size: 1.3em;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.book-performance:hover {
  transform: scale(1.1) rotate(-2deg);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
}

.section-title {
  font-size: 3em;
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Pacifico', cursive;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
}

.acts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
}

.act-card {
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.15), rgba(255, 165, 0, 0.15));
  border: 4px solid rgba(255, 105, 180, 0.5);
  padding: 30px;
  position: relative;
  transition: all 0.3s;
  box-shadow: 10px 10px 0 rgba(255, 105, 180, 0.2);
  animation: cardFadeIn 0.6s ease-out backwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) rotate(0deg);
  }
  to {
    opacity: 1;
  }
}

.act-card:hover {
  transform: rotate(0deg) !important;
  box-shadow: 15px 15px 0 rgba(255, 105, 180, 0.3);
  border-color: #ff69b4;
}

.act-number {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #ff69b4, #ffa500);
  color: #fff;
  padding: 8px 15px;
  font-weight: 900;
  border-radius: 5px;
  font-size: 0.9em;
}

.venue-name {
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.act-title {
  font-size: 1.8em;
  margin-bottom: 10px;
  font-family: 'Pacifico', cursive;
}

.act-duration {
  display: inline-block;
  background: rgba(255, 105, 180, 0.3);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 700;
  margin-bottom: 15px;
}

.act-description {
  margin: 15px 0;
  line-height: 1.7;
  opacity: 0.9;
}

.highlights {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 105, 180, 0.3);
}

.highlights ul {
  margin-top: 10px;
  padding-left: 20px;
}

.highlights li {
  margin-bottom: 8px;
  opacity: 0.9;
}

.skills-rhythm {
  margin-bottom: 80px;
  background: rgba(0, 0, 0, 0.3);
  padding: 60px 40px;
  border-left: 5px solid #ff69b4;
  border-right: 5px solid #ffa500;
}

.rhythm-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 15px;
  height: 150px;
  flex-wrap: wrap;
}

.rhythm-bar {
  flex: 1;
  min-width: 60px;
  max-width: 120px;
  background: linear-gradient(to top, #ff69b4, #ffa500);
  position: relative;
  animation: barPulse 2s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s;
}

@keyframes barPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.rhythm-bar:hover {
  background: linear-gradient(to top, #ffa500, #ff69b4);
  transform: scaleY(1.2);
}

.skill-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(-45deg);
  font-size: 0.75em;
  font-weight: 700;
  white-space: nowrap;
  text-transform: uppercase;
}

.posters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  padding: 20px;
}

.poster {
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 165, 0, 0.2));
  border: 5px solid rgba(255, 105, 180, 0.5);
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;
}

.poster::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 10px;
  background: rgba(255, 105, 180, 0.5);
  border-radius: 5px;
}

.poster:hover {
  transform: rotate(0deg) scale(1.05) !important;
  border-color: #ff69b4;
  box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.3);
}

.poster-icon {
  font-size: 3.5em;
  text-align: center;
  margin-bottom: 15px;
}

.poster-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-family: 'Pacifico', cursive;
  text-align: center;
}

.poster-desc {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: center;
}

.poster-status {
  text-align: center;
  background: rgba(255, 105, 180, 0.4);
  padding: 8px;
  border-radius: 5px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85em;
}

@media (max-width: 768px) {
  .stage-header {
    padding: 80px 20px;
  }

  .performer-name {
    font-size: 2.5em;
  }

  .acts-container {
    grid-template-columns: 1fr;
  }

  .act-card {
    transform: rotate(0deg) !important;
  }

  .rhythm-bars {
    height: 120px;
  }

  .rhythm-bar {
    min-width: 40px;
  }

  .posters-grid {
    grid-template-columns: 1fr;
  }

  .poster {
    transform: rotate(0deg) !important;
  }
}
</style>