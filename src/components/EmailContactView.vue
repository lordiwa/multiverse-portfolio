<!-- EmailContactView.vue - Full screen email contact form -->
<template>
  <div :class="['email-view', theme.containerClass]">
    <!-- Header with back button -->
    <div class="email-header">
      <button @click="goBack" class="back-btn" :disabled="isLoading">
        <span class="back-arrow">←</span>
        <span class="back-text">Back</span>
      </button>
      <h1>{{ getModalTitle() }}</h1>
    </div>

    <!-- Email Form -->
    <div class="email-content">
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
              rows="6"
              :disabled="isLoading"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-cancel" :disabled="isLoading">
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

      <!-- Success/Error Messages -->
      <div v-if="showSuccess" class="message success-message">
        <span class="message-icon">✓</span>
        <div class="message-content">
          <h3>Message Sent Successfully!</h3>
          <p>Thanks for reaching out. I'll get back to you soon!</p>
          <button @click="goBack" :class="['btn-return', theme.sectionStyle]">
            Return to Portfolio
          </button>
        </div>
      </div>

      <div v-if="showError" class="message error-message">
        <span class="message-icon">⚠</span>
        <div class="message-content">
          <h3>Failed to Send Message</h3>
          <p>{{ errorMessage }}</p>
          <button @click="resetForm" :class="['btn-retry', theme.sectionStyle]">
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

const props = defineProps({
  theme: {
    type: Object,
    required: true
  },
  career: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['back'])

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
const EMAILJS_SERVICE_ID = 'service_5x9j9fs'
const EMAILJS_TEMPLATE_ID = 'template_dc44l2q'
const EMAILJS_PUBLIC_KEY = 'SWXJ2EX2b2pyGhEOV'

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
  return titles[props.career] || 'NEURAL LINK COMMUNICATION'
}

const goBack = () => {
  if (isLoading.value) return
  emit('back')
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.subject = ''
  formData.message = ''
  showSuccess.value = false
  showError.value = false
  isLoading.value = false
}

const sendEmail = async () => {
  isLoading.value = true
  showError.value = false

  try {
    const templateParams = {
      subject: formData.subject,
      name: formData.name,
      from_email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString()
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

  } catch (error) {
    console.error('Error sending email:', error)
    showError.value = true
    errorMessage.value = 'Failed to send email. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Focus first input when view loads
  const firstInput = document.getElementById('name')
  if (firstInput && window.innerWidth > 768) {
    setTimeout(() => firstInput.focus(), 100)
  }
})
</script>

<style scoped>
.email-view {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.email-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.95) 0%,
  rgba(0, 40, 80, 0.95) 50%,
  rgba(0, 20, 40, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 2px solid currentColor;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.back-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-arrow {
  font-size: 1.2em;
  font-weight: bold;
}

.back-text {
  font-size: 0.85em;
}

.email-header h1 {
  font-size: 1.8em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: currentColor;
  text-shadow: 0 0 20px currentColor;
  font-family: 'Orbitron', monospace;
  flex: 1;
  text-align: center;
}

.email-content {
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px currentColor;
  font-family: 'Orbitron', monospace;
}

.form-input,
.form-textarea {
  padding: 15px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0.4) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-size: 1em;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  width: 100%;
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
  box-shadow: 0 0 25px currentColor;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(0, 0, 0, 0.6) 100%);
  transform: translateY(-2px);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  font-weight: 400;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: 'Orbitron', monospace;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
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
  backdrop-filter: blur(10px);
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
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  border-color: currentColor;
  box-shadow: 0 0 25px currentColor;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px currentColor;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  animation: none;
}

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

.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.95) 0%,
  rgba(0, 40, 80, 0.95) 100%);
  border: 3px solid currentColor;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  z-index: 1000;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 50px currentColor;
  animation: messageAppear 0.5s ease-out;
}

@keyframes messageAppear {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.success-message {
  border-color: #22c55e;
  color: #22c55e;
  box-shadow: 0 0 50px #22c55e;
}

.error-message {
  border-color: #ef4444;
  color: #ef4444;
  box-shadow: 0 0 50px #ef4444;
}

.message-icon {
  font-size: 3em;
  margin-bottom: 15px;
  display: block;
  text-shadow: 0 0 20px currentColor;
}

.message-content h3 {
  font-size: 1.3em;
  margin-bottom: 10px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.message-content p {
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
}

.btn-return,
.btn-retry {
  padding: 12px 25px;
  border: 2px solid currentColor;
  border-radius: 8px;
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.btn-return:hover,
.btn-retry:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .email-header {
    padding: 10px 15px;
    flex-direction: row;
    text-align: left;
  }

  .email-header h1 {
    font-size: 1.3em;
    letter-spacing: 1px;
    text-align: left;
  }

  .back-btn {
    padding: 8px 12px;
    font-size: 0.8em;
    gap: 6px;
  }

  .back-text {
    display: none;
  }

  .email-content {
    padding: 15px;
  }

  .form-group {
    gap: 6px;
  }

  .form-group label {
    font-size: 0.8em;
  }

  .form-input,
  .form-textarea {
    padding: 12px;
    font-size: 0.9em;
    border-width: 2px;
  }

  .form-textarea {
    min-height: 100px;
  }

  .form-actions {
    flex-direction: column;
    gap: 12px;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
    padding: 15px;
    font-size: 0.9em;
    letter-spacing: 1px;
  }

  .message {
    padding: 25px 20px;
    max-width: 350px;
  }

  .message-icon {
    font-size: 2.5em;
    margin-bottom: 12px;
  }

  .message-content h3 {
    font-size: 1.1em;
  }

  .message-content p {
    font-size: 0.9em;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .email-header h1 {
    font-size: 1.1em;
  }

  .form-input,
  .form-textarea {
    padding: 10px;
    font-size: 0.85em;
  }

  .btn-cancel,
  .btn-submit {
    padding: 12px;
    font-size: 0.8em;
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .email-view {
    min-height: 100vh;
  }

  .email-header {
    position: relative;
    padding: 8px 15px;
  }

  .email-content {
    padding: 10px 15px;
  }

  .form-group {
    gap: 4px;
  }

  .form-textarea {
    min-height: 80px;
  }
}

/* Theme-specific styling */
.tech-container .email-view {
  color: #00f5ff;
}

.tattoo-container .email-view {
  color: #ff6b6b;
  font-family: 'Metal Mania', cursive;
}

.tattoo-container .email-header h1,
.tattoo-container .form-group label {
  font-family: 'Metal Mania', cursive;
}

.vet-container .email-view {
  color: #90ee90;
  font-family: 'Fredoka One', cursive;
}

.vet-container .email-header h1,
.vet-container .form-group label {
  font-family: 'Fredoka One', cursive;
}

.dance-container .email-view {
  color: #ff69b4;
  font-family: 'Pacifico', cursive;
}

.dance-container .email-header h1,
.dance-container .form-group label {
  font-family: 'Pacifico', cursive;
}

.chef-container .email-view {
  color: #ffa500;
  font-family: 'Fredoka One', cursive;
}

.chef-container .email-header h1,
.chef-container .form-group label {
  font-family: 'Fredoka One', cursive;
}

.marine-container .email-view {
  color: #00bfff;
}

.gamer-container .email-view {
  color: #9d4edd;
  font-family: 'Russo One', monospace;
}

.gamer-container .email-header h1,
.gamer-container .form-group label {
  font-family: 'Russo One', monospace;
}

.artist-container .email-view {
  color: #dda0dd;
  font-family: 'Pacifico', cursive;
}

.artist-container .email-header h1,
.artist-container .form-group label {
  font-family: 'Pacifico', cursive;
}

.astronaut-container .email-view {
  color: #c0c0c0;
}

.time-container .email-view {
  color: #ffd700;
  font-family: 'Bungee', cursive;
}

.time-container .email-header h1,
.time-container .form-group label {
  font-family: 'Bungee', cursive;
}

.dragon-container .email-view {
  color: #ff4500;
  font-family: 'Metal Mania', cursive;
}

.dragon-container .email-header h1,
.dragon-container .form-group label {
  font-family: 'Metal Mania', cursive;
}

.hero-container .email-view {
  color: #1e90ff;
  font-family: 'Russo One', sans-serif;
}

.hero-container .email-header h1,
.hero-container .form-group label {
  font-family: 'Russo One', sans-serif;
}

.wizard-container .email-view {
  color: #9300d3;
  font-family: 'Creepster', cursive;
}

.wizard-container .email-header h1,
.wizard-container .form-group label {
  font-family: 'Creepster', cursive;
}

.ai-container .email-view {
  color: #00ff00;
}
</style>