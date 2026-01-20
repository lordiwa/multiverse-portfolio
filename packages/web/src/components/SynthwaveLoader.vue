<template>
  <div class="synthwave-loader" :class="{ 'fade-out': fadeOut }">
    <!-- Scanlines overlay -->
    <div class="scanlines"></div>

    <!-- Animated stars/particles background -->
    <div class="particle-field">
      <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Grid floor -->
    <div class="grid-container">
      <div class="grid-floor"></div>
    </div>

    <!-- Synthwave sun -->
    <div class="sun-container">
      <div class="sun">
        <div class="sun-glow"></div>
        <div class="sun-core"></div>
        <div class="sun-lines">
          <div v-for="n in 8" :key="n" class="sun-line" :style="{ '--line-index': n }"></div>
        </div>
      </div>
      <div class="sun-reflection"></div>
    </div>

    <!-- Mountain silhouettes -->
    <div class="mountains">
      <svg class="mountain-layer" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <polygon class="mountain mountain-1" points="0,200 200,50 400,200" />
        <polygon class="mountain mountain-2" points="300,200 500,30 700,200" />
        <polygon class="mountain mountain-3" points="600,200 850,60 1100,200" />
        <polygon class="mountain mountain-4" points="950,200 1100,80 1200,200" />
      </svg>
    </div>

    <!-- Central loader content -->
    <div class="loader-content">
      <!-- Hexagon spinner -->
      <div class="hexagon-container" :class="{ 'ready-mode': isReady }">
        <div class="hexagon-ring ring-1">
          <div v-for="n in 6" :key="n" class="hex-segment"></div>
        </div>
        <div class="hexagon-ring ring-2">
          <div v-for="n in 6" :key="n" class="hex-segment"></div>
        </div>
        <div class="hexagon-ring ring-3">
          <div v-for="n in 6" :key="n" class="hex-segment"></div>
        </div>

        <!-- Center triangle -->
        <div class="center-triangle">
          <svg viewBox="0 0 100 100">
            <polygon class="triangle-shape" points="50,10 90,80 10,80" />
            <polygon class="triangle-inner" points="50,25 75,70 25,70" />
          </svg>
        </div>
      </div>

      <!-- Loading Phase -->
      <div v-if="!isReady" class="loading-phase">
        <!-- Glitch text -->
        <div class="loader-text">
          <span class="glitch-text" data-text="INITIALIZING">INITIALIZING</span>
          <span class="glitch-text subtitle" data-text="MULTIVERSE">MULTIVERSE</span>
        </div>

        <!-- Progress bar -->
        <div class="progress-container">
          <div class="progress-track">
            <div class="progress-bar" :style="{ width: progress + '%' }">
              <div class="progress-glow"></div>
            </div>
            <div class="progress-segments">
              <div v-for="n in 20" :key="n" class="segment"></div>
            </div>
          </div>
          <div class="progress-text">{{ Math.floor(progress) }}%</div>
        </div>
      </div>

      <!-- Ready Phase - Start Button -->
      <div v-else class="ready-phase">
        <div class="ready-text">
          <span class="glitch-text ready-title" data-text="SYSTEMS ONLINE">SYSTEMS ONLINE</span>
        </div>

        <!-- Start Button -->
        <button class="start-button" @click="startMultiverse">
          <span class="button-bg"></span>
          <span class="button-glitch"></span>
          <span class="button-content">
            <span class="button-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
              </svg>
            </span>
            <span class="button-text">START MULTIVERSE MACHINE</span>
          </span>
          <span class="button-border"></span>
          <span class="button-particles">
            <span v-for="n in 12" :key="n" class="btn-particle" :style="{ '--p-index': n }"></span>
          </span>
        </button>

        <div class="ready-subtext">
          <span class="blink-cursor">_</span> Press to initialize portal sequence
        </div>
      </div>

      <!-- Data stream effects -->
      <div class="data-streams">
        <div class="stream stream-left">
          <span v-for="n in 8" :key="n" class="data-bit" :style="{ '--bit-delay': n * 0.1 + 's' }">
            {{ getRandomBit() }}
          </span>
        </div>
        <div class="stream stream-right">
          <span v-for="n in 8" :key="n" class="data-bit" :style="{ '--bit-delay': n * 0.15 + 's' }">
            {{ getRandomBit() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Corner decorations -->
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <!-- Floating geometric shapes -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['loaded'])

const progress = ref(0)
const fadeOut = ref(false)
const isReady = ref(false)
let progressInterval = null

const getParticleStyle = (_index) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = Math.random() * 3 + 1
  const duration = Math.random() * 3 + 2
  const delay = Math.random() * 2

  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    '--particle-duration': `${duration}s`,
    '--particle-delay': `${delay}s`
  }
}

const getRandomBit = () => {
  const chars = '01アイウエオカキクケコ><{}[]'
  return chars[Math.floor(Math.random() * chars.length)]
}

const startMultiverse = () => {
  // Trigger fade out animation
  fadeOut.value = true
  // Emit loaded event after fade animation
  setTimeout(() => {
    emit('loaded')
  }, 800)
}

onMounted(() => {
  // Simulate loading progress
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      // Variable speed for more realistic feel
      const increment = Math.random() * 8 + 2
      progress.value = Math.min(100, progress.value + increment)
    } else {
      clearInterval(progressInterval)
      // Show the start button after a short delay
      setTimeout(() => {
        isReady.value = true
      }, 500)
    }
  }, 100)
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
.synthwave-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg,
    #0d0221 0%,
    #1a0533 30%,
    #2d1b4e 50%,
    #1a0533 70%,
    #0d0221 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  overflow: hidden;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.synthwave-loader.fade-out {
  opacity: 0;
  transform: scale(1.1);
}

/* Scanlines */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  z-index: 100;
  animation: scanlineMove 8s linear infinite;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(6px); }
}

/* Particle field */
.particle-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: #00fff9;
  border-radius: 50%;
  box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9;
  animation: particleFloat var(--particle-duration, 3s) ease-in-out infinite;
  animation-delay: var(--particle-delay, 0s);
  opacity: 0.6;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) scale(1.5);
    opacity: 1;
  }
}

/* Grid floor */
.grid-container {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200%;
  height: 50%;
  perspective: 500px;
  overflow: hidden;
}

.grid-floor {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(transparent 0%, rgba(0, 255, 249, 0.1) 100%),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 49px,
      rgba(0, 255, 249, 0.4) 49px,
      rgba(0, 255, 249, 0.4) 51px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 49px,
      rgba(255, 0, 255, 0.3) 49px,
      rgba(255, 0, 255, 0.3) 51px
    );
  background-size: 100% 100%, 100px 100px, 100px 100px;
  transform: rotateX(60deg);
  transform-origin: center top;
  animation: gridMove 2s linear infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 0 0, 0 100px, 0 100px; }
}

/* Sun */
.sun-container {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.sun {
  position: relative;
  width: 200px;
  height: 200px;
  animation: sunRise 2s ease-out forwards, sunPulse 4s ease-in-out infinite 2s;
}

@keyframes sunRise {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes sunPulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

.sun-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 42, 109, 0.4) 0%,
    rgba(255, 0, 255, 0.2) 30%,
    transparent 70%
  );
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

.sun-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    #ff2a6d 0%,
    #ff00ff 25%,
    #ff6b35 50%,
    #f9f871 100%
  );
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

.sun-lines {
  position: absolute;
  top: 52%;
  left: 0;
  width: 100%;
  height: 48%;
  overflow: hidden;
}

.sun-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background: #0d0221;
  top: calc(var(--line-index) * 12%);
  animation: sunLineExpand 1s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.1s + 1s);
  transform: scaleX(0);
}

@keyframes sunLineExpand {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

.sun-reflection {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 300px;
  height: 100px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(255, 42, 109, 0.3) 0%,
    rgba(255, 0, 255, 0.1) 50%,
    transparent 100%
  );
  filter: blur(10px);
  animation: reflectionPulse 3s ease-in-out infinite;
}

@keyframes reflectionPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Mountains */
.mountains {
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 100%;
  height: 200px;
  z-index: 3;
}

.mountain-layer {
  width: 100%;
  height: 100%;
}

.mountain {
  fill: #0d0221;
  stroke: #ff00ff;
  stroke-width: 2;
  filter: drop-shadow(0 0 10px #ff00ff);
  animation: mountainGlow 3s ease-in-out infinite;
}

.mountain-2 { animation-delay: 0.5s; }
.mountain-3 { animation-delay: 1s; }
.mountain-4 { animation-delay: 1.5s; }

@keyframes mountainGlow {
  0%, 100% { stroke: #ff00ff; filter: drop-shadow(0 0 10px #ff00ff); }
  50% { stroke: #00fff9; filter: drop-shadow(0 0 20px #00fff9); }
}

/* Loader content */
.loader-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* Hexagon spinner */
.hexagon-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.hexagon-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring-1 {
  width: 150px;
  height: 150px;
  animation: hexRotate 8s linear infinite;
}

.ring-2 {
  width: 110px;
  height: 110px;
  animation: hexRotate 6s linear infinite reverse;
}

.ring-3 {
  width: 70px;
  height: 70px;
  animation: hexRotate 4s linear infinite;
}

@keyframes hexRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.hex-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top-color: #00fff9;
  border-radius: 50%;
  animation: hexPulse 2s ease-in-out infinite;
}

.hex-segment:nth-child(1) { transform: rotate(0deg); }
.hex-segment:nth-child(2) { transform: rotate(60deg); border-top-color: #ff00ff; animation-delay: 0.2s; }
.hex-segment:nth-child(3) { transform: rotate(120deg); animation-delay: 0.4s; }
.hex-segment:nth-child(4) { transform: rotate(180deg); border-top-color: #ff00ff; animation-delay: 0.6s; }
.hex-segment:nth-child(5) { transform: rotate(240deg); animation-delay: 0.8s; }
.hex-segment:nth-child(6) { transform: rotate(300deg); border-top-color: #ff00ff; animation-delay: 1s; }

@keyframes hexPulse {
  0%, 100% {
    filter: drop-shadow(0 0 5px #00fff9);
    opacity: 0.5;
  }
  50% {
    filter: drop-shadow(0 0 20px #00fff9);
    opacity: 1;
  }
}

.center-triangle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  animation: trianglePulse 2s ease-in-out infinite;
}

.triangle-shape {
  fill: none;
  stroke: #00fff9;
  stroke-width: 2;
  filter: drop-shadow(0 0 10px #00fff9);
}

.triangle-inner {
  fill: rgba(0, 255, 249, 0.1);
  stroke: #ff00ff;
  stroke-width: 1;
  filter: drop-shadow(0 0 5px #ff00ff);
}

@keyframes trianglePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
  50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); }
}

/* Glitch text */
.loader-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.glitch-text {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 8px;
  color: #00fff9;
  text-shadow:
    0 0 10px #00fff9,
    0 0 20px #00fff9,
    0 0 40px #00fff9;
  position: relative;
  animation: textFlicker 3s ease-in-out infinite;
}

.glitch-text.subtitle {
  font-size: 2.5rem;
  letter-spacing: 12px;
  background: linear-gradient(90deg, #00fff9, #ff00ff, #00fff9);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textFlicker 3s ease-in-out infinite, gradientShift 3s linear infinite;
  filter: drop-shadow(0 0 20px #ff00ff);
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #ff00ff;
  animation: glitch1 0.3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-text-fill-color: #ff00ff;
}

.glitch-text::after {
  color: #00fff9;
  animation: glitch2 0.3s infinite;
  clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%);
  -webkit-text-fill-color: #00fff9;
}

@keyframes glitch1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(3px, -3px); }
  60% { transform: translate(-3px, -3px); }
  80% { transform: translate(3px, 3px); }
}

@keyframes glitch2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(3px, -3px); }
  40% { transform: translate(-3px, 3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(-3px, -3px); }
}

@keyframes textFlicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  95% { opacity: 0.4; }
  96% { opacity: 1; }
}

/* Progress bar */
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 300px;
}

.progress-track {
  position: relative;
  width: 100%;
  height: 8px;
  background: rgba(13, 2, 33, 0.8);
  border: 1px solid rgba(0, 255, 249, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #00fff9, #ff00ff, #00fff9);
  background-size: 200% 100%;
  border-radius: 4px;
  transition: width 0.1s ease;
  animation: progressGradient 2s linear infinite;
}

@keyframes progressGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.progress-glow {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
  height: 18px;
  background: radial-gradient(circle, #00fff9 0%, transparent 70%);
  filter: blur(3px);
  animation: glowPulse 0.5s ease-in-out infinite;
}

.progress-segments {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2px;
}

.segment {
  flex: 1;
  border-right: 1px solid rgba(13, 2, 33, 0.5);
}

.progress-text {
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  color: #00fff9;
  text-shadow: 0 0 10px #00fff9;
  letter-spacing: 2px;
}

/* Loading and Ready phases */
.loading-phase,
.ready-phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Ready mode hexagon */
.hexagon-container.ready-mode {
  animation: readyPulse 2s ease-in-out infinite;
}

@keyframes readyPulse {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.05); filter: brightness(1.3); }
}

/* Ready phase text */
.ready-text {
  text-align: center;
}

.glitch-text.ready-title {
  font-size: 1.8rem;
  color: #00fff9;
  animation: readyTextPulse 1.5s ease-in-out infinite;
}

@keyframes readyTextPulse {
  0%, 100% {
    text-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 40px #00fff9;
  }
  50% {
    text-shadow: 0 0 20px #00fff9, 0 0 40px #00fff9, 0 0 60px #00fff9, 0 0 80px #ff00ff;
  }
}

/* Start Button - Complex synthwave style */
.start-button {
  position: relative;
  padding: 20px 50px;
  font-family: 'Orbitron', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #00fff9;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: visible;
  transition: all 0.3s ease;
}

.start-button:hover {
  transform: scale(1.05);
}

.start-button:active {
  transform: scale(0.98);
}

.button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(13, 2, 33, 0.9) 0%,
    rgba(45, 27, 78, 0.8) 50%,
    rgba(123, 44, 191, 0.6) 100%
  );
  border-radius: 8px;
  z-index: 1;
}

.button-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(90deg, #00fff9, #ff00ff, #ff2a6d, #00fff9);
  background-size: 300% 100%;
  border-radius: 10px;
  z-index: 0;
  animation: borderFlow 3s linear infinite;
}

@keyframes borderFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

.button-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    rgba(255, 0, 255, 0.1) 100%
  );
  border-radius: 8px;
  z-index: 2;
  opacity: 0;
  animation: buttonGlitch 4s ease-in-out infinite;
}

@keyframes buttonGlitch {
  0%, 100% { opacity: 0; transform: translateX(0); }
  48% { opacity: 0; }
  49% { opacity: 0.5; transform: translateX(-5px); }
  50% { opacity: 0.3; transform: translateX(5px); }
  51% { opacity: 0.5; transform: translateX(-3px); }
  52% { opacity: 0; transform: translateX(0); }
}

.button-content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 15px;
}

.button-icon {
  width: 24px;
  height: 24px;
  color: #00fff9;
  filter: drop-shadow(0 0 5px #00fff9);
  animation: iconPulse 1s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.button-text {
  text-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9;
}

.start-button:hover .button-text {
  text-shadow: 0 0 15px #00fff9, 0 0 30px #00fff9, 0 0 45px #ff00ff;
}

.start-button:hover .button-border {
  animation-duration: 1s;
  box-shadow: 0 0 30px rgba(0, 255, 249, 0.5), 0 0 60px rgba(255, 0, 255, 0.3);
}

/* Button particles */
.button-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

.btn-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00fff9;
  border-radius: 50%;
  opacity: 0;
}

.start-button:hover .btn-particle {
  animation: particleExplode 1s ease-out infinite;
  animation-delay: calc(var(--p-index) * 0.08s);
}

@keyframes particleExplode {
  0% {
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    top: calc(50% + (var(--p-index) - 6) * 30px);
    left: calc(50% + sin(var(--p-index) * 30deg) * 80px);
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}

.btn-particle:nth-child(1) { --angle: 0deg; }
.btn-particle:nth-child(2) { --angle: 30deg; }
.btn-particle:nth-child(3) { --angle: 60deg; }
.btn-particle:nth-child(4) { --angle: 90deg; }
.btn-particle:nth-child(5) { --angle: 120deg; }
.btn-particle:nth-child(6) { --angle: 150deg; }
.btn-particle:nth-child(7) { --angle: 180deg; }
.btn-particle:nth-child(8) { --angle: 210deg; }
.btn-particle:nth-child(9) { --angle: 240deg; }
.btn-particle:nth-child(10) { --angle: 270deg; }
.btn-particle:nth-child(11) { --angle: 300deg; }
.btn-particle:nth-child(12) { --angle: 330deg; }

.start-button:hover .btn-particle:nth-child(1) { animation-name: p1; }
.start-button:hover .btn-particle:nth-child(2) { animation-name: p2; }
.start-button:hover .btn-particle:nth-child(3) { animation-name: p3; }
.start-button:hover .btn-particle:nth-child(4) { animation-name: p4; }
.start-button:hover .btn-particle:nth-child(5) { animation-name: p5; }
.start-button:hover .btn-particle:nth-child(6) { animation-name: p6; }
.start-button:hover .btn-particle:nth-child(7) { animation-name: p7; }
.start-button:hover .btn-particle:nth-child(8) { animation-name: p8; }
.start-button:hover .btn-particle:nth-child(9) { animation-name: p9; }
.start-button:hover .btn-particle:nth-child(10) { animation-name: p10; }
.start-button:hover .btn-particle:nth-child(11) { animation-name: p11; }
.start-button:hover .btn-particle:nth-child(12) { animation-name: p12; }

@keyframes p1 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 0%; left: 50%; opacity: 0; } }
@keyframes p2 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 10%; left: 75%; opacity: 0; } }
@keyframes p3 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 30%; left: 95%; opacity: 0; } }
@keyframes p4 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 50%; left: 100%; opacity: 0; } }
@keyframes p5 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 70%; left: 95%; opacity: 0; } }
@keyframes p6 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 90%; left: 75%; opacity: 0; } }
@keyframes p7 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 100%; left: 50%; opacity: 0; } }
@keyframes p8 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 90%; left: 25%; opacity: 0; } }
@keyframes p9 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 70%; left: 5%; opacity: 0; } }
@keyframes p10 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 50%; left: 0%; opacity: 0; } }
@keyframes p11 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 30%; left: 5%; opacity: 0; } }
@keyframes p12 { 0% { top: 50%; left: 50%; opacity: 1; } 100% { top: 10%; left: 25%; opacity: 0; } }

/* Ready subtext */
.ready-subtext {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: rgba(255, 0, 255, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.blink-cursor {
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Data streams */
.data-streams {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 200px;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}

.stream {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: rgba(0, 255, 249, 0.4);
}

.data-bit {
  animation: dataBitFall 2s linear infinite;
  animation-delay: var(--bit-delay);
  opacity: 0;
}

@keyframes dataBitFall {
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}

/* Corner decorations */
.corner {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid #00fff9;
  animation: cornerPulse 2s ease-in-out infinite;
}

.corner-tl {
  top: 30px;
  left: 30px;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: 30px;
  right: 30px;
  border-left: none;
  border-bottom: none;
  animation-delay: 0.5s;
}

.corner-bl {
  bottom: 30px;
  left: 30px;
  border-right: none;
  border-top: none;
  animation-delay: 1s;
}

.corner-br {
  bottom: 30px;
  right: 30px;
  border-left: none;
  border-top: none;
  animation-delay: 1.5s;
}

@keyframes cornerPulse {
  0%, 100% {
    border-color: #00fff9;
    box-shadow: 0 0 10px #00fff9;
  }
  50% {
    border-color: #ff00ff;
    box-shadow: 0 0 20px #ff00ff;
  }
}

/* Floating shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  opacity: 0.3;
  animation: shapeFloat 10s ease-in-out infinite;
}

.shape-1 {
  top: 20%;
  left: 10%;
  width: 60px;
  height: 60px;
  border: 2px solid #00fff9;
  transform: rotate(45deg);
  animation-delay: 0s;
}

.shape-2 {
  top: 60%;
  right: 15%;
  width: 40px;
  height: 40px;
  border: 2px solid #ff00ff;
  border-radius: 50%;
  animation-delay: 2s;
}

.shape-3 {
  top: 30%;
  right: 20%;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 43px solid #ff2a6d;
  animation-delay: 4s;
}

.shape-4 {
  bottom: 30%;
  left: 15%;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, transparent 50%, #7b2cbf 50%);
  animation-delay: 6s;
}

@keyframes shapeFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(0) rotate(180deg);
    opacity: 0.3;
  }
  75% {
    transform: translateY(30px) rotate(270deg);
    opacity: 0.6;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .glitch-text {
    font-size: 1rem;
    letter-spacing: 4px;
  }

  .glitch-text.subtitle {
    font-size: 1.5rem;
    letter-spacing: 6px;
  }

  .glitch-text.ready-title {
    font-size: 1.3rem;
  }

  .progress-container {
    width: 250px;
  }

  .hexagon-container {
    width: 120px;
    height: 120px;
  }

  .ring-1 { width: 120px; height: 120px; }
  .ring-2 { width: 90px; height: 90px; }
  .ring-3 { width: 60px; height: 60px; }

  .corner {
    width: 50px;
    height: 50px;
  }

  .data-streams {
    display: none;
  }

  .sun {
    width: 150px;
    height: 150px;
  }

  .start-button {
    padding: 16px 30px;
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  .button-icon {
    width: 20px;
    height: 20px;
  }

  .button-particles {
    display: none;
  }

  .ready-subtext {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
}

@media (max-width: 480px) {
  .glitch-text {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .glitch-text.subtitle {
    font-size: 1.2rem;
    letter-spacing: 4px;
  }

  .glitch-text.ready-title {
    font-size: 1rem;
    letter-spacing: 3px;
  }

  .floating-shapes {
    display: none;
  }

  .start-button {
    padding: 14px 24px;
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  .button-text {
    font-size: 0.7rem;
  }

  .ready-subtext {
    font-size: 0.65rem;
    text-align: center;
    padding: 0 20px;
  }

  .corner {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }

  .corner-tl, .corner-tr, .corner-bl, .corner-br {
    top: 15px;
    left: 15px;
  }

  .corner-tr { left: auto; right: 15px; }
  .corner-bl { top: auto; bottom: 15px; }
  .corner-br { top: auto; bottom: 15px; left: auto; right: 15px; }
}
</style>
