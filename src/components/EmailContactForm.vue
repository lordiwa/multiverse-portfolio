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
      <div class="avatar">
        <span class="avatar-icon">{{ contact.avatar }}</span>
      </div>
      <div class="contact-title">
        <h1>{{ contact.name }}</h1>
        <h3>{{ contact.title }}</h3>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

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

const showEmailModal = ref(false)
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
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'     // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'   // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'     // Replace with your Public Key

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

/* Theme-specific button text */
.tattoo-section .email-text::after {
  content: " (Ink Message)";
  font-size: 0.8em;
  opacity: 0.8;
}

.vet-section .email-text::after {
  content: " (Animal Signal)";
  font-size: 0.8em;
  opacity: 0.8;
}

.dance-section .email-text::after {
  content: " (Rhythm Note)";
  font-size: 0.8em;
  opacity: 0.8;
}

.chef-section .email-text::after {
  content: " (Recipe Request)";
  font-size: 0.8em;
  opacity: 0.8;
}

.marine-section .email-text::after {
  content: " (Ocean Wave)";
  font-size: 0.8em;
  opacity: 0.8;
}

.gamer-section .email-text::after {
  content: " (Player Chat)";
  font-size: 0.8em;
  opacity: 0.8;
}

.artist-section .email-text::after {
  content: " (Art Request)";
  font-size: 0.8em;
  opacity: 0.8;
}

.astronaut-section .email-text::after {
  content: " (Space Signal)";
  font-size: 0.8em;
  opacity: 0.8;
}

.time-section .email-text::after {
  content: " (Time Portal)";
  font-size: 0.8em;
  opacity: 0.8;
}

.dragon-section .email-text::after {
  content: " (Dragon Call)";
  font-size: 0.8em;
  opacity: 0.8;
}

.hero-section .email-text::after {
  content: " (Hero Signal)";
  font-size: 0.8em;
  opacity: 0.8;
}

.wizard-section .email-text::after {
  content: " (Magic Scroll)";
  font-size: 0.8em;
  opacity: 0.8;
}

.ai-section .email-text::after {
  content: " (AI Protocol)";
  font-size: 0.8em;
  opacity: 0.8;
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
  align-items: flex-start;
  justify-content: center;
  z-index: 9999;
  padding: 10px;
  backdrop-filter: blur(10px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

.email-modal {
  width: 100%;
  max-width: 600px;
  /* CRITICAL: Force specific height constraints */
  height: auto !important;
  max-height: 80vh !important;
  min-height: auto !important;
  overflow: hidden;
  border-radius: 12px;
  margin: 20px auto;
  position: relative;
  font-family: 'Orbitron', monospace;
  display: flex;
  flex-direction: column;
  /* Force the browser to respect our sizing */
  flex-shrink: 0;
  flex-grow: 0;

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
  padding: 20px 25px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(90deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.1) 100%);
  /* Prevent header from expanding */
  flex-shrink: 0;
  min-height: auto;
}

.modal-header h2 {
  font-size: 1.6em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: currentColor;
  text-shadow: 0 0 20px currentColor;
  font-family: 'Orbitron', monospace;
  line-height: 1.2;
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
  /* CRITICAL: Explicitly limit form height */
  max-height: calc(80vh - 100px) !important;
  height: auto !important;
  overflow-y: auto;
  padding: 16px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 12px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px currentColor;
  box-sizing: border-box;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.5) 0%,
  rgba(0, 0, 0, 0.3) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  -webkit-appearance: none;
  resize: none;
  /* Force height constraints */
  max-height: none;

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
  resize: none !important;
  /* CRITICAL: Force exact height */
  height: 60px !important;
  min-height: 60px !important;
  max-height: 60px !important;
  font-family: 'Orbitron', monospace;
  overflow-y: auto;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 12px;
  flex-shrink: 0;
  box-sizing: border-box;
  /* Prevent actions from expanding */
  height: auto;
}

.btn-cancel,
.btn-submit {
  padding: 8px 16px;
  border: 2px solid currentColor;
  border-radius: 4px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.75em;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  box-sizing: border-box;
  /* Force button dimensions */
  height: auto;
  min-height: 32px;
  max-height: 40px;
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

/* Original ContactInfo styles continue below */
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

  /* Hide the theme-specific text on mobile */
  .tattoo-section .email-text::after,
  .vet-section .email-text::after,
  .dance-section .email-text::after,
  .chef-section .email-text::after,
  .marine-section .email-text::after,
  .gamer-section .email-text::after,
  .artist-section .email-text::after,
  .astronaut-section .email-text::after,
  .time-section .email-text::after,
  .dragon-section .email-text::after,
  .hero-section .email-text::after,
  .wizard-section .email-text::after,
  .ai-section .email-text::after {
    display: none;
  }

  .email-modal-overlay {
    padding: 5px;
    align-items: flex-start;
    padding-top: 10px;
  }

  .email-modal {
    /* CRITICAL: Force mobile sizing */
    max-height: 70vh !important;
    height: auto !important;
    max-width: 95vw;
    margin: 10px auto;
    border-width: 2px;
  }

  .modal-header {
    padding: 10px 12px;
    min-height: auto;
    flex-shrink: 0;
  }

  .modal-header h2 {
    font-size: 0.9em;
    letter-spacing: 1px;
    line-height: 1.1;
  }

  .close-btn {
    width: 28px;
    height: 28px;
    font-size: 0.9em;
    flex-shrink: 0;
    border-width: 2px;
  }

  .email-form {
    padding: 10px;
    /* CRITICAL: Mobile form height constraint */
    max-height: calc(70vh - 80px) !important;
  }

  .form-group {
    margin-bottom: 8px;
  }

  .form-group label {
    font-size: 0.7em;
    margin-bottom: 3px;
    letter-spacing: 0.5px;
  }

  .form-input,
  .form-textarea {
    padding: 6px;
    font-size: 0.75em;
    border-width: 1px;
  }

  .form-textarea {
    /* CRITICAL: Mobile textarea height */
    height: 45px !important;
    min-height: 45px !important;
    max-height: 45px !important;
  }

  .form-actions {
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
    padding: 8px;
    font-size: 0.7em;
    letter-spacing: 0.5px;
    border-width: 1px;
    min-height: 28px;
    max-height: 32px;
  }

  .success-message,
  .error-message {
    padding: 12px 16px;
    font-size: 0.75em;
    max-width: 85%;
    text-align: center;
    border-width: 1px;
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
  .email-modal-overlay {
    padding: 3px;
    align-items: flex-start;
    padding-top: 5px;
  }

  .email-modal {
    /* CRITICAL: Ultra-compact mobile sizing */
    max-height: 65vh !important;
    height: auto !important;
    max-width: 98vw;
    margin: 5px auto;
    border-width: 1px;
  }

  .modal-header {
    padding: 8px 10px;
    flex-shrink: 0;
  }

  .modal-header h2 {
    font-size: 0.8em;
    letter-spacing: 0.5px;
  }

  .close-btn {
    width: 24px;
    height: 24px;
    font-size: 0.8em;
    border-width: 1px;
  }

  .email-form {
    padding: 8px;
    /* CRITICAL: Ultra-compact form height */
    max-height: calc(65vh - 60px) !important;
  }

  .form-group {
    margin-bottom: 6px;
  }

  .form-input,
  .form-textarea {
    padding: 4px;
    font-size: 0.7em;
    border-width: 1px;
  }

  .form-textarea {
    /* CRITICAL: Tiny textarea for small screens */
    height: 35px !important;
    min-height: 35px !important;
    max-height: 35px !important;
  }

  .btn-cancel,
  .btn-submit {
    padding: 6px;
    font-size: 0.65em;
    letter-spacing: 0.3px;
    border-width: 1px;
    min-height: 24px;
    max-height: 28px;
  }

  .success-message,
  .error-message {
    padding: 10px 12px;
    font-size: 0.7em;
    border-width: 1px;
  }
}

/* Landscape phones fix */
@media (max-height: 500px) and (orientation: landscape) {
  .email-modal-overlay {
    align-items: flex-start;
    padding-top: 3px;
  }

  .email-modal {
    max-height: 85vh !important;
    margin: 3px auto;
  }

  .email-form {
    padding: 6px;
    max-height: calc(85vh - 50px) !important;
  }

  .modal-header {
    padding: 6px 8px;
  }

  .modal-header h2 {
    font-size: 0.75em;
  }

  .form-group {
    margin-bottom: 4px;
  }

  .form-textarea {
    height: 30px !important;
    min-height: 30px !important;
    max-height: 30px !important;
  }
}

/* Very short screens */
@media (max-height: 600px) {
  .email-modal {
    max-height: 60vh !important;
  }

  .email-form {
    padding: 6px;
    max-height: calc(60vh - 60px) !important;
  }

  .form-group {
    margin-bottom: 5px;
  }

  .form-textarea {
    height: 30px !important;
    min-height: 30px !important;
    max-height: 30px !important;
  }
}

/* Force override any Vue computed styles */
.email-modal[data-v-e9704bea] {
  height: auto !important;
  max-height: 80vh !important;
}

@media (max-width: 768px) {
  .email-modal[data-v-e9704bea] {
    max-height: 70vh !important;
  }
}

@media (max-width: 480px) {
  .email-modal[data-v-e9704bea] {
    max-height: 65vh !important;
  }
}
</style>