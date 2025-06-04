<template>
  <div v-if="isVisible" class="email-modal-overlay" @click="closeModal">
    <div :class="['email-modal', theme.containerClass]" @click.stop>
      <div class="modal-header">
        <h2>{{ getModalTitle() }}</h2>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <form @submit.prevent="sendEmail" class="email-form">
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              :class="['form-input', theme.sectionStyle]"
              placeholder="Enter your email address"
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
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="closeModal" class="btn-cancel">
            Cancel
          </button>
          <button type="submit" :disabled="isLoading" :class="['btn-submit', theme.sectionStyle]">
            <span v-if="!isLoading">Send Message</span>
            <span v-else>Transmitting...</span>
          </button>
        </div>
      </form>

      <div v-if="showSuccess" class="success-message">
        <span class="success-icon">✓</span>
        Message transmitted successfully!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  theme: {
    type: Object,
    required: true
  },
  currentCareer: {
    type: String,
    default: 'current'
  }
})

const emit = defineEmits(['close'])

const isLoading = ref(false)
const showSuccess = ref(false)

const formData = reactive({
  email: '',
  subject: '',
  message: ''
})

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
  return titles[props.currentCareer] || 'NEURAL LINK COMMUNICATION'
}

const sendEmail = async () => {
  isLoading.value = true

  try {
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`From: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoLink = `mailto:srparca@gmail.com?subject=${subject}&body=${body}`

    // Open default email client
    window.location.href = mailtoLink

    // Show success message
    showSuccess.value = true
    setTimeout(() => {
      closeModal()
    }, 2000)

  } catch (error) {
    console.error('Error sending email:', error)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  // Reset form
  formData.email = ''
  formData.subject = ''
  formData.message = ''
  showSuccess.value = false
  isLoading.value = false

  emit('close')
}
</script>

<style scoped>
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

.close-btn:hover {
  background: currentColor;
  color: black;
  transform: scale(1.1);
  box-shadow: 0 0 20px currentColor;
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

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: currentColor;
  border-color: currentColor;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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
  opacity: 0.6;
  cursor: not-allowed;
  animation: transmitting 1.5s ease-in-out infinite;
}

@keyframes transmitting {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
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

@keyframes successPulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.success-icon {
  font-size: 1.5em;
  margin-right: 10px;
  text-shadow: 0 0 10px white;
}

/* Theme-specific styling */
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

/* Mobile responsive */
@media (max-width: 768px) {
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

  .success-message {
    padding: 25px 30px;
    font-size: 0.9em;
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
}
</style>