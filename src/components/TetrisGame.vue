<template>
  <div v-if="showTetris" class="tetris-overlay" @click="closeTetris">
    <div :class="['tetris-modal', theme.containerClass]" @click.stop>
      <div class="tetris-header">
        <h2>{{ getTetrisTitle() }}</h2>
        <button @click="closeTetris" class="close-btn" :disabled="gameRunning">✕</button>
      </div>

      <div class="tetris-content">
        <!-- Game Area -->
        <div class="game-container">
          <!-- Game Board -->
          <div class="game-board-container">
            <canvas
                ref="gameCanvas"
                :width="boardWidth * cellSize"
                :height="boardHeight * cellSize"
                :class="['game-canvas', theme.sectionStyle]"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            ></canvas>

            <!-- Game Over Overlay -->
            <div v-if="!gameRunning" class="game-overlay">
              <div class="overlay-content">
                <h3>{{ score > 0 ? 'Game Over!' : 'Ready to Play?' }}</h3>
                <p v-if="score > 0" class="final-score">
                  Final Score: {{ score.toLocaleString() }}<br>
                  Level Reached: {{ level }}
                </p>
                <button @click="startGame" :class="['btn-start', theme.sectionStyle]">
                  {{ score > 0 ? 'Play Again' : 'Start Game' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Game Stats -->
          <div class="game-stats">
            <div :class="['stat-card', theme.sectionStyle]">
              <h4>Stats</h4>
              <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value">{{ score.toLocaleString() }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value">{{ level }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Lines:</span>
                <span class="stat-value">{{ linesCleared }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Speed:</span>
                <span class="stat-value">{{ Math.round(1000/dropTime) }}x</span>
              </div>
            </div>

            <!-- Next Piece Preview -->
            <div :class="['next-piece-card', theme.sectionStyle]" v-if="nextPiece">
              <h4>Next</h4>
              <canvas
                  ref="nextCanvas"
                  width="120"
                  height="80"
                  class="next-canvas"
              ></canvas>
            </div>

            <!-- Pause Button -->
            <button
                v-if="gameRunning"
                @click="pauseGame"
                :class="['btn-pause', theme.sectionStyle]"
            >
              {{ paused ? 'Resume' : 'Pause' }}
            </button>
          </div>
        </div>

        <!-- Mobile Controls -->
        <div class="mobile-controls">
          <div class="control-row">
            <button @click="rotatePieceHandler" :class="['control-btn', theme.sectionStyle]">
              ↻
            </button>
            <button @click="hardDrop" :class="['control-btn', theme.sectionStyle]">
              ⬇
            </button>
          </div>
          <div class="control-row">
            <button @click="() => movePiece(-1, 0)" :class="['control-btn', theme.sectionStyle]">
              ←
            </button>
            <button @click="() => movePiece(0, 1)" :class="['control-btn', theme.sectionStyle]">
              ↓
            </button>
            <button @click="() => movePiece(1, 0)" :class="['control-btn', theme.sectionStyle]">
              →
            </button>
          </div>
        </div>

        <!-- Desktop Instructions -->
        <div class="desktop-controls">
          <div :class="['controls-card', theme.sectionStyle]">
            <h4>Controls</h4>
            <div class="control-instruction">
              <span>← → Move</span>
            </div>
            <div class="control-instruction">
              <span>↓ Soft Drop</span>
            </div>
            <div class="control-instruction">
              <span>↑ Rotate</span>
            </div>
            <div class="control-instruction">
              <span>SPACE Hard Drop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  showTetris: {
    type: Boolean,
    default: false
  },
  theme: {
    type: Object,
    required: true
  },
  career: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

// Game constants
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const PIECES = {
  I: { shape: [[1,1,1,1]], color: '#00f5ff' },
  O: { shape: [[1,1],[1,1]], color: '#ffd700' },
  T: { shape: [[0,1,0],[1,1,1]], color: '#9d4edd' },
  S: { shape: [[0,1,1],[1,1,0]], color: '#22c55e' },
  Z: { shape: [[1,1,0],[0,1,1]], color: '#ef4444' },
  J: { shape: [[1,0,0],[1,1,1]], color: '#3b82f6' },
  L: { shape: [[0,0,1],[1,1,1]], color: '#f97316' }
}

// Responsive cell size
const cellSize = ref(25)
const boardWidth = computed(() => BOARD_WIDTH)
const boardHeight = computed(() => BOARD_HEIGHT)

// Game state
const gameCanvas = ref(null)
const nextCanvas = ref(null)
const board = ref(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)))
const currentPiece = ref(null)
const nextPiece = ref(null)
const score = ref(0)
const level = ref(1)
const linesCleared = ref(0)
const gameRunning = ref(false)
const paused = ref(false)
const dropTime = ref(1000)
const lastDrop = ref(0)
const gameLoopId = ref(null)

// Touch controls
const touchStart = reactive({ x: 0, y: 0 })
const touchThreshold = 30

// Responsive sizing
const updateCellSize = () => {
  const isMobile = window.innerWidth < 768
  cellSize.value = isMobile ? 20 : 25
}

onMounted(() => {
  updateCellSize()
  window.addEventListener('resize', updateCellSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCellSize)
  if (gameLoopId.value) {
    cancelAnimationFrame(gameLoopId.value)
  }
})

// Game title based on career
const getTetrisTitle = () => {
  const titles = {
    current: 'NEURAL TETRIS PROTOCOL',
    tattoo: 'INK BLOCK MASTER',
    vet: 'WILDLIFE BLOCK PUZZLE',
    dance: 'RHYTHM BLOCK DANCE',
    chef: 'CULINARY BLOCK TOWER',
    marine: 'DEEP SEA BLOCK DIVE',
    gamer: 'INFINITE TETRIS CHALLENGE',
    artist: 'CREATIVE BLOCK CANVAS',
    astronaut: 'ZERO-G BLOCK ASSEMBLY',
    timeTraveler: 'TEMPORAL BLOCK MATRIX',
    dragonTamer: 'DRAGON SCALE BLOCKS',
    superhero: 'HEROIC BLOCK DEFENSE',
    wizard: 'MAGICAL BLOCK RITUAL',
    aiOverlord: 'QUANTUM BLOCK ALGORITHM'
  }
  return titles[props.career] || 'INFINITE TETRIS'
}

// Create random piece
const createRandomPiece = () => {
  const pieceTypes = Object.keys(PIECES)
  const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
  const piece = PIECES[randomType]

  return {
    shape: piece.shape,
    color: piece.color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
    y: 0,
    rotation: 0
  }
}

// Check collision
const checkCollision = (piece, boardState, dx = 0, dy = 0) => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.x + x + dx
        const newY = piece.y + y + dy

        if (newX < 0 || newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && boardState[newY][newX])) {
          return true
        }
      }
    }
  }
  return false
}

// Rotate piece
const rotatePiece = (piece) => {
  const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
  )
  return { ...piece, shape: rotated }
}

// Clear completed lines
const clearLines = (boardState) => {
  const newBoard = boardState.filter(row => row.some(cell => !cell))
  const clearedCount = BOARD_HEIGHT - newBoard.length

  // Add empty rows at top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0))
  }

  return { newBoard, clearedCount }
}

// Place piece on board
const placePiece = (piece, boardState) => {
  const newBoard = boardState.map(row => [...row])

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] && piece.y + y >= 0) {
        newBoard[piece.y + y][piece.x + x] = piece.color
      }
    }
  }

  return newBoard
}

// Move piece
const movePiece = (dx, dy) => {
  if (!currentPiece.value || !gameRunning.value || paused.value) return

  if (!checkCollision(currentPiece.value, board.value, dx, dy)) {
    currentPiece.value = {
      ...currentPiece.value,
      x: currentPiece.value.x + dx,
      y: currentPiece.value.y + dy
    }
  } else if (dy > 0) {
    // Piece hit bottom, place it
    const newBoard = placePiece(currentPiece.value, board.value)
    const { newBoard: clearedBoard, clearedCount } = clearLines(newBoard)

    board.value = clearedBoard
    currentPiece.value = nextPiece.value
    nextPiece.value = createRandomPiece()
    linesCleared.value += clearedCount
    score.value += clearedCount * 100 * level.value

    // Check game over
    if (checkCollision(currentPiece.value, board.value)) {
      gameRunning.value = false
      paused.value = false
    }
  }
}

// Rotate piece handler
const rotatePieceHandler = () => {
  if (!currentPiece.value || !gameRunning.value || paused.value) return

  const rotated = rotatePiece(currentPiece.value)
  if (!checkCollision(rotated, board.value)) {
    currentPiece.value = rotated
  }
}

// Hard drop
const hardDrop = () => {
  if (!currentPiece.value || !gameRunning.value || paused.value) return

  let dropY = 0
  while (!checkCollision(currentPiece.value, board.value, 0, dropY + 1)) {
    dropY++
  }
  movePiece(0, dropY)
}

// Touch handlers
const handleTouchStart = (e) => {
  e.preventDefault()
  const touch = e.touches[0]
  touchStart.x = touch.clientX
  touchStart.y = touch.clientY
}

const handleTouchMove = (e) => {
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  e.preventDefault()
  if (!gameRunning.value || paused.value) return

  const touch = e.changedTouches[0]
  const deltaX = touch.clientX - touchStart.x
  const deltaY = touch.clientY - touchStart.y

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > touchThreshold) {
      movePiece(deltaX > 0 ? 1 : -1, 0)
    }
  } else {
    // Vertical swipe
    if (deltaY > touchThreshold) {
      movePiece(0, 1)
    } else if (deltaY < -touchThreshold) {
      rotatePieceHandler()
    }
  }
}

// Keyboard controls
const handleKeyPress = (e) => {
  if (!gameRunning.value || paused.value) return

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      movePiece(-1, 0)
      break
    case 'ArrowRight':
      e.preventDefault()
      movePiece(1, 0)
      break
    case 'ArrowDown':
      e.preventDefault()
      movePiece(0, 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      rotatePieceHandler()
      break
    case ' ':
      e.preventDefault()
      hardDrop()
      break
    case 'p':
    case 'P':
      e.preventDefault()
      pauseGame()
      break
  }
}

// Progressive difficulty
watch(linesCleared, (newLines) => {
  const newLevel = Math.floor(newLines / 10) + 1
  level.value = newLevel
  dropTime.value = Math.max(50, 1000 - (newLevel - 1) * 50)
})

// Game loop
const gameLoop = (timestamp) => {
  if (!gameRunning.value || paused.value) return

  if (timestamp - lastDrop.value > dropTime.value) {
    movePiece(0, 1)
    lastDrop.value = timestamp
  }

  gameLoopId.value = requestAnimationFrame(gameLoop)
}

// Draw functions
const drawBoard = () => {
  const canvas = gameCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = BOARD_WIDTH * cellSize.value
  const height = BOARD_HEIGHT * cellSize.value

  // Clear canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
  ctx.fillRect(0, 0, width, height)

  // Draw board pieces
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (board.value[y][x]) {
        ctx.fillStyle = board.value[y][x]
        ctx.fillRect(
            x * cellSize.value,
            y * cellSize.value,
            cellSize.value - 1,
            cellSize.value - 1
        )
      }
    }
  }

  // Draw current piece
  if (currentPiece.value) {
    ctx.fillStyle = currentPiece.value.color
    for (let y = 0; y < currentPiece.value.shape.length; y++) {
      for (let x = 0; x < currentPiece.value.shape[y].length; x++) {
        if (currentPiece.value.shape[y][x]) {
          ctx.fillRect(
              (currentPiece.value.x + x) * cellSize.value,
              (currentPiece.value.y + y) * cellSize.value,
              cellSize.value - 1,
              cellSize.value - 1
          )
        }
      }
    }
  }

  // Draw grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  for (let x = 0; x <= BOARD_WIDTH; x++) {
    ctx.beginPath()
    ctx.moveTo(x * cellSize.value, 0)
    ctx.lineTo(x * cellSize.value, height)
    ctx.stroke()
  }
  for (let y = 0; y <= BOARD_HEIGHT; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * cellSize.value)
    ctx.lineTo(width, y * cellSize.value)
    ctx.stroke()
  }
}

const drawNextPiece = () => {
  const canvas = nextCanvas.value
  if (!canvas || !nextPiece.value) return

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
  ctx.fillRect(0, 0, 120, 80)

  const pieceSize = 15
  const offsetX = (120 - nextPiece.value.shape[0].length * pieceSize) / 2
  const offsetY = (80 - nextPiece.value.shape.length * pieceSize) / 2

  ctx.fillStyle = nextPiece.value.color
  for (let y = 0; y < nextPiece.value.shape.length; y++) {
    for (let x = 0; x < nextPiece.value.shape[y].length; x++) {
      if (nextPiece.value.shape[y][x]) {
        ctx.fillRect(
            offsetX + x * pieceSize,
            offsetY + y * pieceSize,
            pieceSize - 1,
            pieceSize - 1
        )
      }
    }
  }
}

// Game controls
const startGame = () => {
  board.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0))
  currentPiece.value = createRandomPiece()
  nextPiece.value = createRandomPiece()
  score.value = 0
  level.value = 1
  linesCleared.value = 0
  gameRunning.value = true
  paused.value = false
  lastDrop.value = 0

  nextTick(() => {
    gameLoopId.value = requestAnimationFrame(gameLoop)
  })
}

const pauseGame = () => {
  paused.value = !paused.value
  if (!paused.value) {
    gameLoopId.value = requestAnimationFrame(gameLoop)
  }
}

const closeTetris = () => {
  gameRunning.value = false
  paused.value = false
  if (gameLoopId.value) {
    cancelAnimationFrame(gameLoopId.value)
  }
  emit('close')
}

// Watch for updates to redraw
watch([board, currentPiece, cellSize], drawBoard, { deep: true })
watch(nextPiece, drawNextPiece, { deep: true })

// Event listeners
watch(() => props.showTetris, (show) => {
  if (show) {
    nextTick(() => {
      updateCellSize()
      drawBoard()
      drawNextPiece()
    })
    window.addEventListener('keydown', handleKeyPress)
  } else {
    window.removeEventListener('keydown', handleKeyPress)
    if (gameLoopId.value) {
      cancelAnimationFrame(gameLoopId.value)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.tetris-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 10px;
  backdrop-filter: blur(15px);
  box-sizing: border-box;
}

.tetris-modal {
  width: 100%;
  max-width: 900px;
  max-height: 95vh;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
  font-family: 'Orbitron', monospace;

  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.98) 0%,
  rgba(0, 40, 80, 0.98) 50%,
  rgba(0, 20, 40, 0.98) 100%);
  border: 4px solid currentColor;
  box-shadow:
      0 0 40px currentColor,
      inset 0 0 40px rgba(255, 255, 255, 0.1),
      0 0 120px rgba(0, 255, 255, 0.4);

  background-image:
      repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 6px),
      repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px);

  animation: modalPulse 4s ease-in-out infinite alternate;
}

@keyframes modalPulse {
  0% {
    box-shadow:
        0 0 40px currentColor,
        inset 0 0 40px rgba(255, 255, 255, 0.1),
        0 0 120px rgba(0, 255, 255, 0.4);
  }
  100% {
    box-shadow:
        0 0 60px currentColor,
        inset 0 0 60px rgba(255, 255, 255, 0.2),
        0 0 180px rgba(0, 255, 255, 0.6);
  }
}

.tetris-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(90deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 50%,
  rgba(255, 255, 255, 0.1) 100%);
}

.tetris-header h2 {
  font-size: 1.8em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  color: currentColor;
  text-shadow: 0 0 25px currentColor;
  font-family: 'Orbitron', monospace;
  line-height: 1.2;
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
  font-family: 'Orbitron', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover:not(:disabled) {
  background: currentColor;
  color: black;
  transform: scale(1.1);
  box-shadow: 0 0 25px currentColor;
}

.close-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tetris-content {
  padding: 20px;
}

.game-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
}

.game-board-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-canvas {
  border: 3px solid currentColor;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 30px currentColor;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: currentColor;
  text-shadow: 0 0 15px currentColor;
}

.final-score {
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
}

.btn-start {
  padding: 15px 30px;
  border: 3px solid currentColor;
  border-radius: 10px;
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1em;
}

.btn-start:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 30px currentColor;
}

.game-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 200px;
}

.stat-card,
.next-piece-card,
.controls-card {
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  backdrop-filter: blur(10px);
}

.stat-card h4,
.next-piece-card h4,
.controls-card h4 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: currentColor;
  text-shadow: 0 0 15px currentColor;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9em;
}

.stat-label {
  opacity: 0.8;
}

.stat-value {
  font-weight: bold;
  color: currentColor;
}

.next-canvas {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 60px;
}

.btn-pause {
  padding: 12px 20px;
  border: 2px solid currentColor;
  border-radius: 8px;
  background: linear-gradient(45deg, rgba(255, 165, 0, 0.8), rgba(255, 140, 0, 0.6));
  color: white;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.btn-pause:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.control-instruction {
  font-size: 0.85em;
  margin-bottom: 5px;
  opacity: 0.9;
}

/* Mobile Controls */
.mobile-controls {
  display: none;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}

.control-row {
  display: flex;
  gap: 15px;
}

.control-btn {
  width: 60px;
  height: 60px;
  border: 3px solid currentColor;
  border-radius: 10px;
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.control-btn:hover,
.control-btn:active {
  background: linear-gradient(45deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0.1) 100%);
  transform: scale(0.95);
  box-shadow: 0 0 20px currentColor;
}

.desktop-controls {
  display: block;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .tetris-overlay {
    padding: 5px;
  }

  .tetris-modal {
    max-width: 95vw;
    max-height: 98vh;
    border-width: 2px;
  }

  .tetris-header {
    padding: 15px 20px;
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .tetris-header h2 {
    font-size: 1.3em;
    letter-spacing: 2px;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    font-size: 1.4em;
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .tetris-content {
    padding: 15px;
  }

  .game-container {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .game-stats {
    min-width: unset;
    width: 100%;
    max-width: 300px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .stat-card,
  .next-piece-card {
    flex: 1;
    min-width: 120px;
    padding: 10px;
  }

  .stat-card h4,
  .next-piece-card h4 {
    font-size: 1em;
    margin-bottom: 8px;
  }

  .stat-item {
    font-size: 0.8em;
    margin-bottom: 4px;
  }

  .next-canvas {
    height: 50px;
  }

  .btn-pause {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    font-size: 0.8em;
  }

  .mobile-controls {
    display: flex;
  }

  .desktop-controls {
    display: none;
  }

  .control-btn {
    width: 55px;
    height: 55px;
    font-size: 1.1em;
    border-width: 2px;
  }
}

@media (max-width: 480px) {
  .tetris-header h2 {
    font-size: 1.1em;
    letter-spacing: 1px;
  }

  .close-btn {
    width: 35px;
    height: 35px;
    font-size: 1.2em;
    top: 10px;
    right: 15px;
  }

  .tetris-content {
    padding: 10px;
  }

  .game-stats {
    flex-direction: column;
    gap: 10px;
  }

  .stat-card,
  .next-piece-card {
    padding: 8px;
  }

  .control-btn {
    width: 50px;
    height: 50px;
    font-size: 1em;
  }

  .control-row {
    gap: 10px;
  }

  .overlay-content h3 {
    font-size: 1.2em;
  }

  .btn-start {
    padding: 12px 24px;
    font-size: 0.9em;
    letter-spacing: 1px;
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .tetris-modal {
    max-height: 95vh;
  }

  .tetris-header {
    padding: 10px 20px;
  }

  .tetris-header h2 {
    font-size: 1.1em;
  }

  .tetris-content {
    padding: 10px;
  }

  .game-container {
    flex-direction: row;
    gap: 15px;
  }

  .game-stats {
    flex-direction: column;
    min-width: 150px;
    max-width: 150px;
  }

  .mobile-controls {
    margin-top: 10px;
  }

  .control-btn {
    width: 45px;
    height: 45px;
    font-size: 0.9em;
  }
}

/* Touch improvements */
.control-btn {
  touch-action: manipulation;
}

.game-canvas {
  touch-action: none;
}

/* Theme-specific styling */
.tech-container .tetris-modal {
  color: #00f5ff;
  border-color: #00f5ff;
}

.tattoo-container .tetris-modal {
  color: #ff6b6b;
  border-color: #ff6b6b;
  font-family: 'Metal Mania', cursive;
}

.tattoo-container .tetris-header h2,
.tattoo-container .stat-card h4,
.tattoo-container .next-piece-card h4,
.tattoo-container .controls-card h4 {
  font-family: 'Metal Mania', cursive;
}

.vet-container .tetris-modal {
  color: #90ee90;
  border-color: #90ee90;
  font-family: 'Fredoka One', cursive;
}

.vet-container .tetris-header h2,
.vet-container .stat-card h4,
.vet-container .next-piece-card h4,
.vet-container .controls-card h4 {
  font-family: 'Fredoka One', cursive;
}

.dance-container .tetris-modal {
  color: #ff69b4;
  border-color: #ff69b4;
  font-family: 'Pacifico', cursive;
}

.dance-container .tetris-header h2,
.dance-container .stat-card h4,
.dance-container .next-piece-card h4,
.dance-container .controls-card h4 {
  font-family: 'Pacifico', cursive;
}

.chef-container .tetris-modal {
  color: #ffa500;
  border-color: #ffa500;
  font-family: 'Fredoka One', cursive;
}

.chef-container .tetris-header h2,
.chef-container .stat-card h4,
.chef-container .next-piece-card h4,
.chef-container .controls-card h4 {
  font-family: 'Fredoka One', cursive;
}

.marine-container .tetris-modal {
  color: #00bfff;
  border-color: #00bfff;
}

.gamer-container .tetris-modal {
  color: #9d4edd;
  border-color: #9d4edd;
  font-family: 'Russo One', monospace;
}

.gamer-container .tetris-header h2,
.gamer-container .stat-card h4,
.gamer-container .next-piece-card h4,
.gamer-container .controls-card h4 {
  font-family: 'Russo One', monospace;
}

.artist-container .tetris-modal {
  color: #dda0dd;
  border-color: #dda0dd;
  font-family: 'Pacifico', cursive;
}

.artist-container .tetris-header h2,
.artist-container .stat-card h4,
.artist-container .next-piece-card h4,
.artist-container .controls-card h4 {
  font-family: 'Pacifico', cursive;
}

.astronaut-container .tetris-modal {
  color: #c0c0c0;
  border-color: #c0c0c0;
}

.time-container .tetris-modal {
  color: #ffd700;
  border-color: #ffd700;
  font-family: 'Bungee', cursive;
}

.time-container .tetris-header h2,
.time-container .stat-card h4,
.time-container .next-piece-card h4,
.time-container .controls-card h4 {
  font-family: 'Bungee', cursive;
}

.dragon-container .tetris-modal {
  color: #ff4500;
  border-color: #ff4500;
  font-family: 'Metal Mania', cursive;
}

.dragon-container .tetris-header h2,
.dragon-container .stat-card h4,
.dragon-container .next-piece-card h4,
.dragon-container .controls-card h4 {
  font-family: 'Metal Mania', cursive;
}

.hero-container .tetris-modal {
  color: #1e90ff;
  border-color: #1e90ff;
  font-family: 'Russo One', sans-serif;
}

.hero-container .tetris-header h2,
.hero-container .stat-card h4,
.hero-container .next-piece-card h4,
.hero-container .controls-card h4 {
  font-family: 'Russo One', sans-serif;
}

.wizard-container .tetris-modal {
  color: #9300d3;
  border-color: #9300d3;
  font-family: 'Creepster', cursive;
}

.wizard-container .tetris-header h2,
.wizard-container .stat-card h4,
.wizard-container .next-piece-card h4,
.wizard-container .controls-card h4 {
  font-family: 'Creepster', cursive;
}

.ai-container .tetris-modal {
  color: #00ff00;
  border-color: #00ff00;
}

/* Special effects for different themes */
.gamer-container .game-canvas {
  animation: gamingGlow 3s ease-in-out infinite alternate;
}

@keyframes gamingGlow {
  0% { box-shadow: 0 0 30px #9d4edd; }
  100% { box-shadow: 0 0 50px #9d4edd, 0 0 80px #9d4edd; }
}

.wizard-container .control-btn:hover {
  animation: magicalSparkle 0.5s ease-in-out;
}

@keyframes magicalSparkle {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(180deg); }
}

.ai-container .stat-card {
  background-image: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 11px);
  animation: matrix 10s linear infinite;
}

@keyframes matrix {
  0% { background-position: 0 0; }
  100% { background-position: 100px 0; }
}
</style>