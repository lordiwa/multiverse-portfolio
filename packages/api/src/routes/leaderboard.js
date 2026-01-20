import { Router } from 'express'

const router = Router()

// In-memory leaderboard (mock database)
const leaderboard = [
  { id: 1, name: 'NeuralNinja', score: 15420, level: 12, lines: 89, timestamp: '2026-01-15T10:30:00Z' },
  { id: 2, name: 'QuantumQueen', score: 12850, level: 10, lines: 72, timestamp: '2026-01-14T18:45:00Z' },
  { id: 3, name: 'ByteBlaster', score: 11200, level: 9, lines: 65, timestamp: '2026-01-16T09:15:00Z' },
  { id: 4, name: 'PixelProwler', score: 9800, level: 8, lines: 58, timestamp: '2026-01-13T14:20:00Z' },
  { id: 5, name: 'CodeCrusher', score: 8500, level: 7, lines: 51, timestamp: '2026-01-12T22:00:00Z' },
  { id: 6, name: 'MatrixMaster', score: 7200, level: 6, lines: 44, timestamp: '2026-01-11T16:30:00Z' },
  { id: 7, name: 'GridGuru', score: 6100, level: 5, lines: 38, timestamp: '2026-01-10T11:45:00Z' },
  { id: 8, name: 'BlockBaron', score: 5400, level: 5, lines: 33, timestamp: '2026-01-09T20:15:00Z' },
  { id: 9, name: 'TetrisTerminator', score: 4800, level: 4, lines: 29, timestamp: '2026-01-08T08:00:00Z' },
  { id: 10, name: 'StackSensei', score: 4200, level: 4, lines: 25, timestamp: '2026-01-07T13:30:00Z' }
]

let nextId = 11

// GET /api/leaderboard - Get top scores
router.get('/', (req, res) => {
  req.appStats.endpoints.leaderboard.calls++
  req.appStats.endpoints.leaderboard.lastCalled = new Date().toISOString()

  const limit = Math.min(parseInt(req.query.limit) || 10, 100)
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score)

  // Simulate network delay for realism
  setTimeout(() => {
    res.json({
      success: true,
      data: sortedLeaderboard.slice(0, limit),
      meta: {
        total: leaderboard.length,
        limit,
        timestamp: new Date().toISOString()
      }
    })
  }, 100 + Math.random() * 200)
})

// GET /api/leaderboard/:id - Get specific score
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const entry = leaderboard.find(e => e.id === id)

  if (!entry) {
    return res.status(404).json({
      success: false,
      error: 'Score not found',
      message: `No leaderboard entry with id ${id}`
    })
  }

  res.json({
    success: true,
    data: entry
  })
})

// POST /api/leaderboard - Submit new score
router.post('/', (req, res) => {
  req.appStats.endpoints.leaderboard.calls++
  req.appStats.endpoints.leaderboard.lastCalled = new Date().toISOString()

  const { name, score, level, lines } = req.body

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Invalid name',
      message: 'Name must be at least 2 characters'
    })
  }

  if (!score || typeof score !== 'number' || score < 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid score',
      message: 'Score must be a positive number'
    })
  }

  // Create new entry
  const newEntry = {
    id: nextId++,
    name: name.trim().substring(0, 20),
    score: Math.floor(score),
    level: level || 1,
    lines: lines || 0,
    timestamp: new Date().toISOString()
  }

  leaderboard.push(newEntry)

  // Calculate rank
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score)
  const rank = sortedLeaderboard.findIndex(e => e.id === newEntry.id) + 1

  // Simulate network delay
  setTimeout(() => {
    res.status(201).json({
      success: true,
      data: newEntry,
      meta: {
        rank,
        totalPlayers: leaderboard.length,
        isTopTen: rank <= 10
      }
    })
  }, 150 + Math.random() * 150)
})

// DELETE /api/leaderboard/:id - Remove score (admin)
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = leaderboard.findIndex(e => e.id === id)

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Score not found'
    })
  }

  leaderboard.splice(index, 1)

  res.json({
    success: true,
    message: `Score ${id} deleted`
  })
})

export { router as leaderboardRouter }
