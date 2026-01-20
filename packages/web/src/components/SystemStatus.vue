<template>
  <div :class="['system-status', theme.sectionStyle]">
    <div class="status-header" @click="toggleExpanded">
      <div class="status-indicator" :class="{ 'online': isOnline, 'offline': !isOnline }">
        <span class="pulse-ring"></span>
        <span class="status-dot"></span>
      </div>
      <h3>Multiverse Systems</h3>
      <span class="toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
    </div>

    <transition name="slide">
      <div v-if="isExpanded" class="status-content">
        <div class="status-grid">
          <!-- Health Status -->
          <div class="status-card" :class="{ 'online': healthData.status === 'healthy' }">
            <div class="card-icon">⚡</div>
            <div class="card-info">
              <span class="card-label">Core Systems</span>
              <span class="card-value">{{ healthData.status || 'Checking...' }}</span>
            </div>
            <div class="card-indicator"></div>
          </div>

          <!-- Uptime -->
          <div class="status-card online">
            <div class="card-icon">⏱️</div>
            <div class="card-info">
              <span class="card-label">Uptime</span>
              <span class="card-value">{{ formatUptime(healthData.uptime) }}</span>
            </div>
          </div>

          <!-- Leaderboard -->
          <button class="status-card interactive" @click="openLeaderboard">
            <div class="card-icon">🏆</div>
            <div class="card-info">
              <span class="card-label">Neural Leaderboard</span>
              <span class="card-value">{{ leaderboardCount }} Players</span>
            </div>
            <div class="card-arrow">→</div>
          </button>

          <!-- Stats -->
          <button class="status-card interactive" @click="openStats">
            <div class="card-icon">📊</div>
            <div class="card-info">
              <span class="card-label">System Analytics</span>
              <span class="card-value">{{ statsData.requestCount || 0 }} Requests</span>
            </div>
            <div class="card-arrow">→</div>
          </button>
        </div>

        <!-- API Status Link -->
        <a href="/api-status" target="_blank" class="api-status-link">
          <span class="link-icon">🔗</span>
          <span>View Full System Status</span>
          <span class="external-icon">↗</span>
        </a>
      </div>
    </transition>

    <!-- Leaderboard Modal -->
    <div v-if="showLeaderboard" class="modal-overlay" @click.self="showLeaderboard = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>🏆 Neural Tetris Leaderboard</h2>
          <button class="close-btn" @click="showLeaderboard = false">✕</button>
        </div>
        <div class="leaderboard-list">
          <div
            v-for="(entry, index) in leaderboardData"
            :key="entry.id"
            class="leaderboard-entry"
            :class="{ 'top-three': index < 3 }"
          >
            <span class="rank">{{ getRankEmoji(index) }}</span>
            <span class="name">{{ entry.name }}</span>
            <span class="score">{{ entry.score.toLocaleString() }}</span>
            <span class="level">Lvl {{ entry.level }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Modal -->
    <div v-if="showStats" class="modal-overlay" @click.self="showStats = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>📊 System Analytics</h2>
          <button class="close-btn" @click="showStats = false">✕</button>
        </div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-value">{{ statsData.game?.totalGamesPlayed || 0 }}</span>
            <span class="stat-label">Games Played</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ statsData.game?.totalLinesCleared || 0 }}</span>
            <span class="stat-label">Lines Cleared</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ statsData.game?.activePlayersToday || 0 }}</span>
            <span class="stat-label">Active Today</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ statsData.server?.requestCount || 0 }}</span>
            <span class="stat-label">API Requests</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  theme: {
    type: Object,
    required: true
  }
})

const isExpanded = ref(false)
const isOnline = ref(false)
const showLeaderboard = ref(false)
const showStats = ref(false)

const healthData = ref({})
const leaderboardData = ref([])
const leaderboardCount = ref(0)
const statsData = ref({})

let healthInterval = null

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value) {
    fetchAllData()
  }
}

const fetchHealth = async () => {
  try {
    const res = await fetch('/api/health')
    if (res.ok) {
      healthData.value = await res.json()
      isOnline.value = true
    } else {
      isOnline.value = false
    }
  } catch {
    isOnline.value = false
    healthData.value = { status: 'offline' }
  }
}

const fetchLeaderboard = async () => {
  try {
    const res = await fetch('/api/leaderboard')
    if (res.ok) {
      const data = await res.json()
      leaderboardData.value = data.data || []
      leaderboardCount.value = data.meta?.total || 0
    }
  } catch {
    leaderboardData.value = []
  }
}

const fetchStats = async () => {
  try {
    const res = await fetch('/api/stats')
    if (res.ok) {
      const data = await res.json()
      statsData.value = data.data || {}
    }
  } catch {
    statsData.value = {}
  }
}

const fetchAllData = () => {
  fetchHealth()
  fetchLeaderboard()
  fetchStats()
}

const openLeaderboard = () => {
  fetchLeaderboard()
  showLeaderboard.value = true
}

const openStats = () => {
  fetchStats()
  showStats.value = true
}

const formatUptime = (seconds) => {
  if (!seconds) return '--'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

const getRankEmoji = (index) => {
  const emojis = ['🥇', '🥈', '🥉']
  return emojis[index] || `#${index + 1}`
}

onMounted(() => {
  fetchHealth()
  healthInterval = setInterval(fetchHealth, 30000) // Check every 30s
})

onUnmounted(() => {
  if (healthInterval) clearInterval(healthInterval)
})
</script>

<style scoped>
/* ========================================
   SYNTHWAVE SYSTEM STATUS STYLES
   ======================================== */

.system-status {
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg,
    rgba(13, 2, 33, 0.9) 0%,
    rgba(45, 27, 78, 0.7) 50%,
    rgba(123, 44, 191, 0.5) 100%);
  border: 1px solid rgba(0, 255, 249, 0.3);
  border-radius: var(--radius-md, 20px);
  overflow: hidden;
  margin-top: 20px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(0, 255, 249, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 255, 249, 0.1);
}

.status-header:hover {
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    rgba(255, 0, 255, 0.05) 100%);
}

.status-header h3 {
  flex: 1;
  font-family: 'Orbitron', monospace;
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: var(--synth-cyan, #00fff9);
  text-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 20px var(--synth-cyan, #00fff9);
}

.toggle-icon {
  font-size: 0.8em;
  opacity: 0.6;
  color: var(--synth-magenta, #ff00ff);
}

.status-indicator {
  position: relative;
  width: 16px;
  height: 16px;
}

.status-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--synth-pink, #ff2a6d);
  box-shadow: 0 0 10px var(--synth-pink, #ff2a6d);
}

.status-indicator.online .status-dot {
  background: var(--synth-cyan, #00fff9);
  box-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 20px var(--synth-cyan, #00fff9);
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--synth-cyan, #00fff9);
  opacity: 0;
}

.status-indicator.online .pulse-ring {
  animation: synthPulseRing 2s infinite;
}

@keyframes synthPulseRing {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
    box-shadow: 0 0 10px var(--synth-cyan, #00fff9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
    box-shadow: 0 0 20px var(--synth-cyan, #00fff9);
  }
}

.status-content {
  padding: 0 20px 20px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

/* Synthwave Status Cards */
.status-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: linear-gradient(135deg,
    rgba(13, 2, 33, 0.8) 0%,
    rgba(45, 27, 78, 0.6) 100%);
  border: 1px solid rgba(0, 255, 249, 0.2);
  border-radius: var(--radius-sm, 12px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.status-card.interactive {
  cursor: pointer;
  font-family: inherit;
  color: var(--synth-cyan, #00fff9);
  text-align: left;
  width: 100%;
}

.status-card.interactive:hover {
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.15) 0%,
    rgba(255, 0, 255, 0.1) 100%);
  border-color: var(--synth-magenta, #ff00ff);
  transform: translateY(-2px);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(255, 0, 255, 0.2);
}

.status-card.online {
  border-color: rgba(0, 255, 249, 0.4);
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 0 15px rgba(0, 255, 249, 0.15);
}

.card-icon {
  font-size: 1.5em;
  filter: drop-shadow(0 0 5px currentColor);
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-label {
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
  color: var(--synth-magenta, #ff00ff);
}

.card-value {
  font-family: 'Orbitron', monospace;
  font-size: 0.9em;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--synth-cyan, #00fff9);
  text-shadow: 0 0 5px rgba(0, 255, 249, 0.5);
}

.card-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--synth-cyan, #00fff9);
  box-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 20px var(--synth-cyan, #00fff9);
}

.card-arrow {
  font-size: 1.2em;
  opacity: 0.5;
  transition: all 0.3s ease;
  color: var(--synth-magenta, #ff00ff);
}

.status-card.interactive:hover .card-arrow {
  transform: translateX(4px);
  opacity: 1;
  text-shadow: 0 0 10px var(--synth-magenta, #ff00ff);
}

.api-status-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    rgba(255, 0, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 249, 0.3);
  border-radius: var(--radius-sm, 12px);
  color: var(--synth-cyan, #00fff9);
  text-decoration: none;
  font-size: 0.9em;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(0, 255, 249, 0.5);
}

.api-status-link:hover {
  background: linear-gradient(135deg,
    rgba(255, 0, 255, 0.2) 0%,
    rgba(0, 255, 249, 0.1) 100%);
  border-color: var(--synth-magenta, #ff00ff);
  color: var(--synth-magenta, #ff00ff);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  text-shadow: 0 0 10px var(--synth-magenta, #ff00ff);
}

.external-icon {
  font-size: 0.8em;
  opacity: 0.8;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Synthwave Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 2, 33, 0.9);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg,
    #0d0221 0%,
    #1a0533 50%,
    #2d1b4e 100%);
  border: 2px solid rgba(0, 255, 249, 0.4);
  border-radius: var(--radius-md, 20px);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(0, 255, 249, 0.2),
    0 0 80px rgba(255, 0, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 249, 0.2);
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    transparent 100%);
}

.modal-header h2 {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  margin: 0;
  color: var(--synth-cyan, #00fff9);
  text-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 20px var(--synth-cyan, #00fff9);
}

.close-btn {
  background: none;
  border: none;
  color: var(--synth-magenta, #ff00ff);
  font-size: 1.5em;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s;
}

.close-btn:hover {
  opacity: 1;
  text-shadow: 0 0 15px var(--synth-magenta, #ff00ff);
  transform: scale(1.1);
}

/* Leaderboard styles */
.leaderboard-list {
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.leaderboard-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg,
    rgba(13, 2, 33, 0.8) 0%,
    rgba(45, 27, 78, 0.6) 100%);
  border-radius: var(--radius-sm, 12px);
  border: 1px solid rgba(0, 255, 249, 0.2);
  transition: all 0.3s ease;
}

.leaderboard-entry:hover {
  border-color: rgba(255, 0, 255, 0.4);
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    rgba(255, 0, 255, 0.05) 100%);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);
}

.leaderboard-entry.top-three {
  background: linear-gradient(135deg,
    rgba(255, 0, 255, 0.15) 0%,
    rgba(123, 44, 191, 0.2) 100%);
  border-color: rgba(255, 0, 255, 0.4);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.15);
}

.rank {
  font-size: 1.2em;
  min-width: 40px;
  text-align: center;
  filter: drop-shadow(0 0 5px currentColor);
}

.name {
  flex: 1;
  font-weight: 600;
  font-family: 'Orbitron', monospace;
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.score {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  color: var(--synth-cyan, #00fff9);
  text-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 20px var(--synth-cyan, #00fff9);
}

.level {
  font-size: 0.8em;
  min-width: 50px;
  text-align: right;
  color: var(--synth-magenta, #ff00ff);
  opacity: 0.8;
}

/* Synthwave Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
}

.stat-box {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg,
    rgba(13, 2, 33, 0.8) 0%,
    rgba(45, 27, 78, 0.6) 100%);
  border-radius: var(--radius-sm, 12px);
  border: 1px solid rgba(0, 255, 249, 0.2);
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: rgba(255, 0, 255, 0.4);
  background: linear-gradient(135deg,
    rgba(0, 255, 249, 0.1) 0%,
    rgba(255, 0, 255, 0.05) 100%);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
  transform: translateY(-2px);
}

.stat-value {
  display: block;
  font-family: 'Orbitron', monospace;
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--synth-cyan, #00fff9);
  text-shadow:
    0 0 10px var(--synth-cyan, #00fff9),
    0 0 30px var(--synth-cyan, #00fff9);
}

.stat-label {
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--synth-magenta, #ff00ff);
  opacity: 0.8;
}

/* Mobile responsive */
@media (max-width: 600px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .modal-header h2 {
    font-size: 1em;
  }
}
</style>
