<template>
  <div class="artist-layout">
    <!-- Hero section with large avatar -->
    <div class="artist-hero">
      <div class="hero-avatar">{{ profile.contact.avatar }}</div>
      <h1>{{ profile.contact.name }}</h1>
      <p class="artist-tagline">{{ profile.contact.title }}</p>
      <button class="contact-cta" @click="$emit('open-email')">Commission Work</button>
    </div>

    <!-- Portfolio grid - experiences as gallery items -->
    <div class="portfolio-grid">
      <div
        v-for="(exp, idx) in profile.experiences"
        :key="idx"
        class="portfolio-item"
        :style="{ animationDelay: `${idx * 0.1}s` }"
      >
        <div class="item-overlay">
          <span class="item-icon">🎨</span>
        </div>
        <div class="item-content">
          <h3>{{ exp.company }}</h3>
          <span class="item-role">{{ exp.position }}</span>
          <span class="item-year">{{ exp.duration.split('-')[0].trim() }}</span>
        </div>
      </div>
    </div>

    <!-- Skills as tag cloud -->
    <div class="skills-cloud">
      <h2>Expertise</h2>
      <div class="cloud-tags">
        <span
          v-for="skill in profile.contact.skills"
          :key="skill"
          class="cloud-tag"
          :style="{ fontSize: `${Math.random() * 0.5 + 0.9}em` }"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Links as simple list -->
    <div class="artist-links">
      <h2>Connect</h2>
      <div class="link-list">
        <!-- Interactive links (start with #) -->
        <button
          v-for="link in profile.links.filter(l => l.url.startsWith('#'))"
          :key="link.name"
          class="artist-link"
          @click="handleLinkClick(link)"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span>{{ link.name }}</span>
        </button>

        <!-- External links (don't start with #) -->
        <a
          v-for="link in profile.links.filter(l => !l.url.startsWith('#'))"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="artist-link"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span>{{ link.name }}</span>
        </a>
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
.artist-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
}

.artist-hero {
  text-align: center;
  padding: 80px 20px;
  background: rgba(0, 0, 0, 0.6);
  border-left: 5px solid #ff6b6b;
  border-right: 5px solid #ff6b6b;
  margin-bottom: 60px;
}

.hero-avatar {
  font-size: 8em;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 30px #ff6b6b);
}

.artist-hero h1 {
  font-size: 3.5em;
  margin-bottom: 15px;
  font-family: 'Metal Mania', cursive;
}

.artist-tagline {
  font-size: 1.2em;
  opacity: 0.9;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.contact-cta {
  padding: 20px 50px;
  background: #ff6b6b;
  border: none;
  color: #000;
  font-size: 1.2em;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Metal Mania', cursive;
}

.contact-cta:hover {
  transform: scale(1.1);
  box-shadow: 0 0 40px #ff6b6b;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.portfolio-item {
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(0, 0, 0, 0.8));
  border: 3px solid #ff6b6b;
  cursor: pointer;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 107, 107, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.portfolio-item:hover .item-overlay {
  opacity: 1;
}

.item-icon {
  font-size: 4em;
}

.item-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
}

.item-content h3 {
  font-size: 1.3em;
  margin-bottom: 5px;
}

.item-role {
  display: block;
  opacity: 0.8;
  font-size: 0.9em;
}

.item-year {
  display: block;
  color: #ff6b6b;
  font-weight: 700;
  margin-top: 5px;
}

.skills-cloud {
  background: rgba(0, 0, 0, 0.6);
  padding: 60px;
  margin-bottom: 60px;
  text-align: center;
}

.skills-cloud h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
  font-family: 'Metal Mania', cursive;
}

.cloud-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.cloud-tag {
  padding: 10px 25px;
  background: rgba(255, 107, 107, 0.2);
  border: 2px solid #ff6b6b;
  border-radius: 50px;
  transition: all 0.3s;
  cursor: default;
}

.cloud-tag:hover {
  background: #ff6b6b;
  color: #000;
  transform: scale(1.1);
}

.artist-links {
  text-align: center;
}

.artist-links h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
  font-family: 'Metal Mania', cursive;
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.artist-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: rgba(255, 107, 107, 0.1);
  border: 2px solid #ff6b6b;
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1.1em;
}

.artist-link:hover {
  background: rgba(255, 107, 107, 0.3);
  transform: translateY(-3px);
}

.link-icon {
  font-size: 1.5em;
}

@media (max-width: 768px) {
  .artist-hero {
    padding: 60px 20px;
  }

  .hero-avatar {
    font-size: 5em;
  }

  .artist-hero h1 {
    font-size: 2em;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .skills-cloud {
    padding: 40px 20px;
  }
}
</style>