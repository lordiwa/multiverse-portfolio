<!-- ComingSoonModal.vue -->
<template>
  <div v-if="show" class="coming-soon-overlay" @click="close">
    <div :class="['coming-soon-modal', theme.containerClass]" @click.stop>
      <div class="modal-header">
        <h2>{{ getTitle() }}</h2>
        <button class="close-btn" @click="close">✕</button>
      </div>

      <div class="modal-content">
        <div class="icon-container">
          <span class="feature-icon">{{ getIcon() }}</span>
        </div>

        <h3>Coming Soon!</h3>
        <p class="description">{{ getDescription() }}</p>

        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: getProgress() + '%' }"></div>
          </div>
          <span class="progress-text">{{ getProgress() }}% Complete</span>
        </div>

        <div class="features-list">
          <h4>Planned Features:</h4>
          <ul>
            <li v-for="feature in getFeatures()" :key="feature">{{ feature }}</li>
          </ul>
        </div>

        <div class="action-buttons">
          <button :class="['btn-notify', theme.sectionStyle]" @click="notifyMe">
            {{ notified ? '✓ You\'ll be notified!' : '🔔 Notify me when ready' }}
          </button>
          <button :class="['btn-close', theme.sectionStyle]" @click="close">
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  linkUrl: {
    type: String,
    default: ''
  },
  theme: {
    type: Object,
    required: true
  },
  career: {
    type: String,
    default: 'current'
  }
})

const emit = defineEmits(['close'])

const notified = ref(false)

const featureMap = {
  '#generative-art': {
    title: 'Generative Art Gallery',
    icon: '🎨',
    description: 'Interactive gallery showcasing AI-generated and blockchain-based digital art experiments.',
    progress: 75,
    features: [
      'Real-time generative art creation',
      'Blockchain NFT integration',
      'Interactive art customization',
      'AR art viewing experience',
      'Community art collaborations'
    ]
  },
  '#ai-integration': {
    title: 'AI Integration Playground',
    icon: '🤖',
    description: 'Hands-on demos of AI integration in interactive applications and games.',
    progress: 60,
    features: [
      'AI-powered game mechanics',
      'Machine learning visualizations',
      'Interactive AI training demos',
      'Real-time AI performance metrics',
      'Custom AI model playground'
    ]
  },
  '#analytics': {
    title: 'Gaming Analytics Dashboard',
    icon: '📊',
    description: 'Advanced performance analytics platform for professional gaming.',
    progress: 45,
    features: [
      'Real-time performance tracking',
      'AI-powered improvement suggestions',
      'Team collaboration tools',
      'Historical performance analysis',
      'Competitive ranking system'
    ]
  },
  '#research': {
    title: 'Research Documentation',
    icon: '📜',
    description: 'Interactive research papers and documentation viewer.',
    progress: 30,
    features: [
      'Interactive research papers',
      'Searchable knowledge base',
      'Collaborative annotations',
      'Research timeline visualization',
      'Citation network mapping'
    ]
  }
}

const getTitle = () => {
  return featureMap[props.linkUrl]?.title || 'Feature Coming Soon'
}

const getIcon = () => {
  return featureMap[props.linkUrl]?.icon || '🚀'
}

const getDescription = () => {
  return featureMap[props.linkUrl]?.description || 'This feature is currently in development and will be available soon!'
}

const getProgress = () => {
  return featureMap[props.linkUrl]?.progress || Math.floor(Math.random() * 40) + 30
}

const getFeatures = () => {
  return featureMap[props.linkUrl]?.features || [
    'Interactive user interface',
    'Mobile-responsive design',
    'Real-time data updates',
    'Advanced customization options',
    'Seamless integration'
  ]
}

const notifyMe = () => {
  notified.value = true
  // Here you could actually store the notification preference
  console.log('User wants to be notified about:', props.linkUrl)

  // Reset after 3 seconds
  setTimeout(() => {
    notified.value = false
  }, 3000)
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.coming-soon-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.coming-soon-modal {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
  font-family: 'Orbitron', monospace;

  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.95) 0%,
  rgba(0, 40, 80, 0.95) 50%,
  rgba(0, 20, 40, 0.95) 100%);
  border: 4px solid currentColor;
  box-shadow:
      0 0 40px currentColor,
      inset 0 0 40px rgba(255, 255, 255, 0.1),
      0 0 120px rgba(0, 255, 255, 0.4);

  animation: modalSlideIn 0.5s ease-out;
}

@keyframes modalSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(90deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.1) 100%);
}

.modal-header h2 {
  font-size: 1.8em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: currentColor;
  text-shadow: 0 0 20px currentColor;
}

.close-btn {
  background: transparent;
  border: 3px solid currentColor;
  color: currentColor;
  width: 45px;
  height: 45px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.8em;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: currentColor;
  color: black;
  transform: scale(1.1);
  box-shadow: 0 0 25px currentColor;
}

.modal-content {
  padding: 30px;
  text-align: center;
}

.icon-container {
  margin-bottom: 20px;
}

.feature-icon {
  font-size: 4em;
  display: inline-block;
  animation: iconFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px currentColor);
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.modal-content h3 {
  font-size: 2em;
  margin-bottom: 15px;
  color: currentColor;
  text-shadow: 0 0 15px currentColor;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

.progress-container {
  margin-bottom: 30px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, currentColor, rgba(255, 255, 255, 0.8));
  transition: width 1s ease-out;
  animation: progressGlow 2s ease-in-out infinite alternate;
}

@keyframes progressGlow {
  0% { box-shadow: 0 0 10px currentColor; }
  100% { box-shadow: 0 0 20px currentColor; }
}

.progress-text {
  font-size: 0.9em;
  font-weight: 600;
  color: currentColor;
}

.features-list {
  text-align: left;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.features-list h4 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: currentColor;
  text-shadow: 0 0 10px currentColor;
}

.features-list ul {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
  opacity: 0.9;
  line-height: 1.4;
}

.features-list li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: currentColor;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-notify,
.btn-close {
  padding: 15px 25px;
  border: 3px solid currentColor;
  border-radius: 10px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.btn-notify {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  box-shadow: 0 0 20px currentColor;
}

.btn-notify:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px currentColor;
}

.btn-close {
  background: transparent;
  color: currentColor;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: currentColor;
  transform: translateY(-2px);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .coming-soon-overlay {
    padding: 10px;
  }

  .coming-soon-modal {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-header {
    padding: 20px;
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .modal-header h2 {
    font-size: 1.4em;
    letter-spacing: 1px;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    font-size: 1.4em;
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .modal-content {
    padding: 20px;
  }

  .feature-icon {
    font-size: 3em;
  }

  .modal-content h3 {
    font-size: 1.5em;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn-notify,
  .btn-close {
    width: 100%;
    padding: 12px 20px;
    font-size: 0.8em;
  }
}

@media (max-width: 480px) {
  .modal-header h2 {
    font-size: 1.2em;
  }

  .close-btn {
    width: 35px;
    height: 35px;
    font-size: 1.2em;
    top: 10px;
    right: 15px;
  }

  .feature-icon {
    font-size: 2.5em;
  }

  .features-list {
    padding: 15px;
  }
}

/* Theme-specific styling */
.tech-container .coming-soon-modal {
  color: #00f5ff;
  border-color: #00f5ff;
}

.tattoo-container .coming-soon-modal {
  color: #ff6b6b;
  border-color: #ff6b6b;
  font-family: 'Metal Mania', cursive;
}

.vet-container .coming-soon-modal {
  color: #90ee90;
  border-color: #90ee90;
  font-family: 'Fredoka One', cursive;
}

.dance-container .coming-soon-modal {
  color: #ff69b4;
  border-color: #ff69b4;
  font-family: 'Pacifico', cursive;
}

.chef-container .coming-soon-modal {
  color: #ffa500;
  border-color: #ffa500;
  font-family: 'Fredoka One', cursive;
}

.marine-container .coming-soon-modal {
  color: #00bfff;
  border-color: #00bfff;
}

.gamer-container .coming-soon-modal {
  color: #9d4edd;
  border-color: #9d4edd;
  font-family: 'Russo One', monospace;
}

.artist-container .coming-soon-modal {
  color: #dda0dd;
  border-color: #dda0dd;
  font-family: 'Pacifico', cursive;
}

.astronaut-container .coming-soon-modal {
  color: #c0c0c0;
  border-color: #c0c0c0;
}

.time-container .coming-soon-modal {
  color: #ffd700;
  border-color: #ffd700;
  font-family: 'Bungee', cursive;
}

.dragon-container .coming-soon-modal {
  color: #ff4500;
  border-color: #ff4500;
  font-family: 'Metal Mania', cursive;
}

.hero-container .coming-soon-modal {
  color: #1e90ff;
  border-color: #1e90ff;
  font-family: 'Russo One', sans-serif;
}

.wizard-container .coming-soon-modal {
  color: #9300d3;
  border-color: #9300d3;
  font-family: 'Creepster', cursive;
}

.ai-container .coming-soon-modal {
  color: #00ff00;
  border-color: #00ff00;
}
</style>