<template>
  <div :class="[theme.cardClass, theme.sectionStyle]">
    <!-- Email Contact Button -->
    <div class="email-button-container">
      <button @click="openEmailModal" :class="['email-contact-btn', theme.sectionStyle]">
        <span class="email-icon">📡</span>
        <span class="email-text">Send Neural Message</span>
      </button>
    </div>

    <div class="contact-header">
      <div class="avatar-games">
        <div class="avatar" @click="openMadLibs" title="Click for a fun Mad Libs game!">
          <span class="avatar-icon">{{ contact.avatar }}</span>
          <div class="avatar-overlay">
            <span class="play-icon">🎮</span>
            <span class="play-text">Mad Libs!</span>
          </div>
        </div>

        <!-- NEW: Tetris Game Trigger -->
        <div class="tetris-trigger" @click="openTetris" title="Play Infinite Tetris!">
          <span class="tetris-icon">🎮</span>
          <div class="tetris-overlay">
            <span class="tetris-play-icon">🔥</span>
            <span class="tetris-play-text">Tetris!</span>
          </div>
        </div>
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

    <div :class="['skills-section', theme.sectionStyle]">
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

    <div :class="['languages-section', theme.sectionStyle]">
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

    <div :class="['summary-section', theme.sectionStyle]">
      <h3>Summary</h3>
      <p>{{ contact.summary }}</p>
    </div>

    <!-- Email Contact Modal -->
    <div v-if="showEmailModal" class="email-modal-overlay" @click="closeEmailModal">
      <div :class="['email-modal', theme.containerClass]" @click.stop>
        <div class="modal-header">
          <h2>{{ getModalTitle() }}</h2>
          <button @click="closeEmailModal" class="close-btn" :disabled="isLoading">✕</button>
        </div>

        <form @submit.prevent="sendEmail" class="email-form">
          <div class="form-group">
            <label for="name">Your Name:</label>
            <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                :class="['form-input', theme.sectionStyle]"
                placeholder="Enter your full name"
                :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label for="email">Your Email:</label>
            <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                :class="['form-input', theme.sectionStyle]"
                placeholder="Enter your email address"
                :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label for="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                v-model="formData.subject"
                required
                :class="['form-input', theme.sectionStyle]"
                placeholder="What's this about?"
                :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label for="message">Message:</label>
            <textarea
                id="message"
                v-model="formData.message"
                required
                :class="['form-textarea', theme.sectionStyle]"
                placeholder="Tell me what's on your mind..."
                rows="5"
                :disabled="isLoading"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeEmailModal" class="btn-cancel" :disabled="isLoading">
              Cancel
            </button>
            <button type="submit" :disabled="isLoading" :class="['btn-submit', theme.sectionStyle]">
              <span v-if="!isLoading">Send Message</span>
              <span v-else class="loading-text">
                <span class="loading-spinner"></span>
                Transmitting...
              </span>
            </button>
          </div>
        </form>

        <div v-if="showSuccess" class="success-message">
          <span class="success-icon">✓</span>
          Message transmitted successfully!
        </div>

        <div v-if="showError" class="error-message">
          <span class="error-icon">⚠</span>
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <!-- Mad Libs Game Component -->
    <MadLibsGame
        :showMadLibs="showMadLibs"
        :theme="theme"
        :career="getCurrentCareer()"
        @close="closeMadLibs"
    />
  </div>
 <!-- Tetris Game Component -->
  <TetrisGame
      :showTetris="showTetris"
      :theme="theme"
      :career="getCurrentCareer()"
      @close="closeTetris"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import MadLibsGame from './MadLibsGame.vue'
import TetrisGame from './TetrisGame.vue'


const props = defineProps({
  contact: {
    type: Object,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})
const showTetris = ref(false)

const openTetris = () => {
  showTetris.value = true
}

const closeTetris = () => {
  showTetris.value = false
}
const showEmailModal = ref(false)
const showMadLibs = ref(false)
const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_5x9j9fs'     // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_dc44l2q'   // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'SWXJ2EX2b2pyGhEOV'     // Replace with your Public Key

const getCurrentCareer = () => {
  const containerClass = props.theme.containerClass
  if (containerClass.includes('tech')) return 'current'
  if (containerClass.includes('tattoo')) return 'tattoo'
  if (containerClass.includes('vet')) return 'vet'
  if (containerClass.includes('dance')) return 'dance'
  if (containerClass.includes('chef')) return 'chef'
  if (containerClass.includes('marine')) return 'marine'
  if (containerClass.includes('gamer')) return 'gamer'
  if (containerClass.includes('artist')) return 'artist'
  if (containerClass.includes('astronaut')) return 'astronaut'
  if (containerClass.includes('time')) return 'timeTraveler'
  if (containerClass.includes('dragon')) return 'dragonTamer'
  if (containerClass.includes('hero')) return 'superhero'
  if (containerClass.includes('wizard')) return 'wizard'
  if (containerClass.includes('ai')) return 'aiOverlord'
  return 'current'
}

const getModalTitle = () => {
  const titles = {
    current: 'NEURAL LINK COMMUNICATION',
    tattoo: 'INK THE MESSAGE',
    vet: 'ANIMAL COMMUNICATION PROTOCOL',
    dance: 'RHYTHM CONNECTION',
    chef: 'CULINARY CORRESPONDENCE',
    marine: 'DEEP SEA TRANSMISSION',
    gamer: 'PLAYER COMMUNICATION',
    artist: 'CREATIVE TRANSMISSION',
    astronaut: 'SPACE COMMUNICATION',
    timeTraveler: 'TEMPORAL MESSAGE',
    dragonTamer: 'DRAGON MAIL',
    superhero: 'HERO HOTLINE',
    wizard: 'MAGICAL CORRESPONDENCE',
    aiOverlord: 'AI INTERFACE'
  }
  return titles[getCurrentCareer()] || 'NEURAL LINK COMMUNICATION'
}

const openEmailModal = () => {
  showEmailModal.value = true
  showError.value = false
  showSuccess.value = false
}

const closeEmailModal = () => {
  if (isLoading.value) return // Prevent closing while sending

  // Reset form
  formData.name = ''
  formData.email = ''
  formData.subject = ''
  formData.message = ''
  showSuccess.value = false
  showError.value = false
  isLoading.value = false
  showEmailModal.value = false
}

const openMadLibs = () => {
  showMadLibs.value = true
}

const closeMadLibs = () => {
  showMadLibs.value = false
}

const sendEmail = async () => {
  isLoading.value = true
  showError.value = false

  try {
    // Template parameters that match your EmailJS template variables
    const templateParams = {
      subject: formData.subject,           // → {{subject}}
      name: formData.name,                 // → {{name}}
      from_email: formData.email,          // Used for reply-to
      message: formData.message,           // → {{message}}
      time: new Date().toLocaleString()    // → {{time}}
    }

    console.log('Sending email with params:', templateParams)

    const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
    )

    console.log('Email sent successfully:', result)
    showSuccess.value = true

    setTimeout(() => {
      closeEmailModal()
    }, 3000)

  } catch (error) {
    console.error('Error sending email:', error)
    showError.value = true
    errorMessage.value = 'Failed to send email. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Email Button Styling */
.email-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.email-contact-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 35px;
  border: 4px solid currentColor;
  border-radius: 12px;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 40px currentColor;

  /* Pixelated retro effect */
  background-image:
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
}

.email-contact-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, currentColor, transparent, currentColor);
  border-radius: 12px;
  z-index: -1;
  animation: borderPulse 3s ease-in-out infinite alternate;
}

@keyframes borderPulse {
  0% { opacity: 0.5; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

.email-contact-btn:hover {
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0.1) 50%,
  rgba(255, 255, 255, 0.05) 100%);
  transform: translateY(-5px) scale(1.05);
  box-shadow:
      0 15px 50px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 80px currentColor;
  border-color: rgba(255, 255, 255, 0.8);
}

.email-contact-btn:active {
  transform: translateY(-3px) scale(1.02);
}

.email-icon {
  font-size: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 15px currentColor;
  animation: iconRotate 4s ease-in-out infinite;
}

@keyframes iconRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.1); }
  75% { transform: rotate(5deg) scale(1.1); }
}

.email-text {
  text-shadow: 0 0 15px currentColor;
  font-weight: 900;
}

/* Avatar Styling with Mad Libs Interaction */
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  border: 4px solid currentColor;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  overflow: hidden;
  box-shadow:
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 30px rgba(255, 255, 255, 0.1),
      0 0 60px currentColor;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow:
      0 0 40px rgba(0, 0, 0, 0.6),
      inset 0 0 40px rgba(255, 255, 255, 0.2),
      0 0 80px currentColor;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(0, 0, 0, 0.6) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 0.5em;
  margin-bottom: 2px;
  animation: gameIconBounce 2s ease-in-out infinite;
}

.play-text {
  font-size: 0.25em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 10px currentColor;
}

@keyframes gameIconBounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-3px) scale(1.1); }
}

.avatar::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, currentColor, transparent, currentColor);
  border-radius: 12px;
  z-index: -1;
  animation: borderGlow 3s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  0% { opacity: 0.5; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

.avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: inherit;
  text-shadow: 0 0 20px currentColor;
  animation: iconPulse 2s ease-in-out infinite alternate;
}

@keyframes iconPulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* Loading spinner */
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Email Modal Styling */
.email-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.email-modal {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  padding: 0;
  position: relative;
  font-family: 'Orbitron', monospace;

  /* Pixelated retro space UI styling */
  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.95) 0%,
  rgba(0, 40, 80, 0.95) 50%,
  rgba(0, 20, 40, 0.95) 100%);
  border: 4px solid currentColor;
  box-shadow:
      0 0 30px currentColor,
      inset 0 0 30px rgba(255, 255, 255, 0.1),
      0 0 100px rgba(0, 255, 255, 0.3);

  /* Pixelated border effect */
  background-image:
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px);

  animation: modalGlow 3s ease-in-out infinite alternate;
}

@keyframes modalGlow {
  0% {
    box-shadow:
        0 0 30px currentColor,
        inset 0 0 30px rgba(255, 255, 255, 0.1),
        0 0 100px rgba(0, 255, 255, 0.3);
  }
  100% {
    box-shadow:
        0 0 50px currentColor,
        inset 0 0 50px rgba(255, 255, 255, 0.2),
        0 0 150px rgba(0, 255, 255, 0.5);
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
  letter-spacing: 3px;
  margin: 0;
  color: currentColor;
  text-shadow: 0 0 20px currentColor;
  font-family: 'Orbitron', monospace;
}

.close-btn {
  background: transparent;
  border: 3px solid currentColor;
  color: currentColor;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: bold;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover:not(:disabled) {
  background: currentColor;
  color: black;
  transform: scale(1.1);
  box-shadow: 0 0 20px currentColor;
}

.close-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.email-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px currentColor;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 15px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.5) 0%,
  rgba(0, 0, 0, 0.3) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-size: 1em;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  /* Retro computer terminal styling */
  background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px);
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: currentColor;
  box-shadow:
      0 0 20px currentColor,
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.7) 0%,
  rgba(0, 0, 0, 0.5) 100%);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: 'Orbitron', monospace;
}

.form-actions {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-cancel,
.btn-submit {
  padding: 15px 30px;
  border: 3px solid currentColor;
  border-radius: 8px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1em;
  position: relative;
  overflow: hidden;
}

.btn-cancel {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-cancel:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: currentColor;
  border-color: currentColor;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.btn-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  border-color: currentColor;
  box-shadow: 0 0 20px currentColor;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 40px currentColor;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  animation: none;
}

.success-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(45deg, #22c55e, #16a34a);
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  border: 3px solid #22c55e;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow:
      0 0 30px #22c55e,
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  animation: successPulse 0.5s ease-out;
  z-index: 10;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  border: 3px solid #ef4444;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow:
      0 0 30px #ef4444,
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  animation: errorPulse 0.5s ease-out;
  z-index: 10;
  text-align: center;
  max-width: 80%;
}

@keyframes successPulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes errorPulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.success-icon,
.error-icon {
  font-size: 1.5em;
  margin-right: 10px;
  text-shadow: 0 0 10px white;
}

/* Theme-specific modal styling */
.tech-container .email-modal {
  color: #00f5ff;
  border-color: #00f5ff;
}

.tattoo-container .email-modal {
  color: #ff6b6b;
  border-color: #ff6b6b;
  font-family: 'Metal Mania', cursive;
}

.vet-container .email-modal {
  color: #90ee90;
  border-color: #90ee90;
  font-family: 'Fredoka One', cursive;
}

.dance-container .email-modal {
  color: #ff69b4;
  border-color: #ff69b4;
  font-family: 'Pacifico', cursive;
}

.chef-container .email-modal {
  color: #ffa500;
  border-color: #ffa500;
  font-family: 'Fredoka One', cursive;
}

.marine-container .email-modal {
  color: #00bfff;
  border-color: #00bfff;
}

.gamer-container .email-modal {
  color: #9d4edd;
  border-color: #9d4edd;
  font-family: 'Russo One', monospace;
}

.artist-container .email-modal {
  color: #dda0dd;
  border-color: #dda0dd;
  font-family: 'Pacifico', cursive;
}

.astronaut-container .email-modal {
  color: #c0c0c0;
  border-color: #c0c0c0;
}

.time-container .email-modal {
  color: #ffd700;
  border-color: #ffd700;
  font-family: 'Bungee', cursive;
}

.dragon-container .email-modal {
  color: #ff4500;
  border-color: #ff4500;
  font-family: 'Metal Mania', cursive;
}

.hero-container .email-modal {
  color: #1e90ff;
  border-color: #1e90ff;
  font-family: 'Russo One', sans-serif;
}

.wizard-container .email-modal {
  color: #9300d3;
  border-color: #9300d3;
  font-family: 'Creepster', cursive;
}

.ai-container .email-modal {
  color: #00ff00;
  border-color: #00ff00;
}

/* Original ContactInfo styles */
.contact-card {
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.02) 100%);
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 60px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
  pointer-events: none;
  z-index: 1;
}

.contact-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 80px currentColor;
  border-color: rgba(255, 255, 255, 0.4);
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
}

.contact-title {
  flex: 1;
  min-width: 0;
}

.contact-title h1 {
  font-size: 2.8em;
  margin-bottom: 8px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 20px currentColor;
  background: linear-gradient(45deg, currentColor, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-title h3 {
  max-width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 1.3em;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 1.4;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.location {
  opacity: 0.8;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.8);
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.contact-icon {
  font-size: 1.5em;
  filter: drop-shadow(0 0 10px currentColor);
}

.contact-item a {
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  transition: all 0.3s ease;
  font-weight: 600;
}

.contact-item a:hover {
  opacity: 0.8;
  text-shadow: 0 0 10px currentColor;
}

.skills-section,
.languages-section,
.summary-section {
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.02) 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.skills-section h3,
.languages-section h3,
.summary-section h3 {
  font-size: 1.5em;
  margin-bottom: 18px;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 15px currentColor;
  color: rgba(255,255,255,0.9);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-badge {
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
  border: 2px solid currentColor;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.skill-badge:hover {
  background: linear-gradient(45deg, currentColor, rgba(255,255,255,0.2));
  color: black;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px currentColor;
  text-shadow: none;
}

.languages-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.language-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.lang-name {
  font-weight: 600;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.lang-level {
  opacity: 0.8;
  font-size: 0.95em;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.summary-section p {
  line-height: 1.8;
  opacity: 0.9;
  font-size: 1.05em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .email-contact-btn {
    padding: 15px 25px;
    font-size: 1em;
    letter-spacing: 1px;
  }

  .email-icon {
    font-size: 1.5em;
  }

  .email-text {
    font-size: 0.9em;
  }

  .email-modal-overlay {
    padding: 10px;
  }

  .email-modal {
    max-height: 95vh;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-header h2 {
    font-size: 1.4em;
    letter-spacing: 2px;
  }

  .close-btn {
    width: 35px;
    height: 35px;
    font-size: 1.2em;
  }

  .email-form {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
    padding: 18px;
    font-size: 1.1em;
  }

  .success-message,
  .error-message {
    padding: 25px 30px;
    font-size: 0.9em;
  }

  .contact-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .contact-details {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .contact-title h1 {
    font-size: 2.2em;
  }

  .contact-title h3 {
    font-size: 1.1em;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .skills-list {
    justify-content: center;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .modal-header h2 {
    font-size: 1.2em;
    letter-spacing: 1px;
  }

  .form-input,
  .form-textarea {
    padding: 12px;
    font-size: 0.9em;
  }

  .btn-cancel,
  .btn-submit {
    padding: 15px;
    font-size: 1em;
    letter-spacing: 1px;
  }
  .avatar-games {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .tetris-trigger {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    border: 4px solid currentColor;
    background: linear-gradient(45deg,
    rgba(157, 78, 221, 0.2) 0%,
    rgba(157, 78, 221, 0.1) 100%);
    overflow: hidden;
    box-shadow:
        0 0 30px rgba(0, 0, 0, 0.5),
        inset 0 0 30px rgba(255, 255, 255, 0.1),
        0 0 60px rgba(157, 78, 221, 0.5);
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tetris-trigger:hover {
    transform: scale(1.05);
    box-shadow:
        0 0 40px rgba(0, 0, 0, 0.6),
        inset 0 0 40px rgba(255, 255, 255, 0.2),
        0 0 80px rgba(157, 78, 221, 0.8);
  }

  .tetris-trigger::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #9d4edd, transparent, #9d4edd);
    border-radius: 12px;
    z-index: -1;
    animation: tetrisGlow 3s ease-in-out infinite alternate;
  }

  @keyframes tetrisGlow {
    0% { opacity: 0.5; filter: brightness(1); }
    100% { opacity: 1; filter: brightness(1.5); }
  }

  .tetris-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(157, 78, 221, 0.6) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .tetris-trigger:hover .tetris-overlay {
    opacity: 1;
  }

  .tetris-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: inherit;
    text-shadow: 0 0 20px currentColor;
    animation: tetrisPulse 2s ease-in-out infinite alternate;
  }

  @keyframes tetrisPulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  .tetris-play-icon {
    font-size: 0.4em;
    margin-bottom: 2px;
    animation: tetrisIconBounce 2s ease-in-out infinite;
  }

  .tetris-play-text {
    font-size: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Orbitron', monospace;
    text-shadow: 0 0 10px currentColor;
  }

  @keyframes tetrisIconBounce {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-3px) rotate(5deg); }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .avatar-games {
      flex-direction: column;
      gap: 15px;
    }

    .tetris-trigger {
      width: 80px;
      height: 80px;
      font-size: 2.5em;
    }

    .avatar {
      width: 80px;
      height: 80px;
    }
  }
}
</style>