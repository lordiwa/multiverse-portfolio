import { Router } from 'express'

const router = Router()

// Mock statistics data
const gameStats = {
  totalGamesPlayed: 1247,
  totalLinesCleared: 45892,
  totalScore: 2847593,
  averageScore: 2284,
  highestLevel: 15,
  activePlayersToday: 23,
  gamesPlayedToday: 89
}

// GET /api/stats - Get app statistics
router.get('/', (req, res) => {
  req.appStats.endpoints.stats.calls++
  req.appStats.endpoints.stats.lastCalled = new Date().toISOString()

  const uptime = Math.floor((Date.now() - req.appStats.startTime) / 1000)

  // Simulate slight variations in "live" stats
  const liveStats = {
    ...gameStats,
    totalGamesPlayed: gameStats.totalGamesPlayed + Math.floor(Math.random() * 5),
    activePlayersToday: gameStats.activePlayersToday + Math.floor(Math.random() * 3) - 1,
    gamesPlayedToday: gameStats.gamesPlayedToday + Math.floor(Math.random() * 3)
  }

  setTimeout(() => {
    res.json({
      success: true,
      data: {
        server: {
          status: 'operational',
          uptime,
          uptimeFormatted: formatUptime(uptime),
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          requestCount: req.appStats.requestCount
        },
        game: liveStats,
        endpoints: req.appStats.endpoints,
        timestamp: new Date().toISOString()
      }
    })
  }, 50 + Math.random() * 100)
})

// GET /api/stats/summary - Quick summary
router.get('/summary', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'operational',
      games: gameStats.totalGamesPlayed,
      players: gameStats.activePlayersToday,
      uptime: formatUptime(Math.floor((Date.now() - req.appStats.startTime) / 1000))
    }
  })
})

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  parts.push(`${secs}s`)

  return parts.join(' ')
}

export { router as statsRouter }
