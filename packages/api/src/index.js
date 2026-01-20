import express from 'express'
import cors from 'cors'
import { leaderboardRouter } from './routes/leaderboard.js'
import { statsRouter } from './routes/stats.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`)
  next()
})

// Track stats
const appStats = {
  startTime: Date.now(),
  requestCount: 0,
  endpoints: {
    health: { calls: 0, lastCalled: null },
    leaderboard: { calls: 0, lastCalled: null },
    stats: { calls: 0, lastCalled: null }
  }
}

// Make stats available to routes
app.use((req, res, next) => {
  req.appStats = appStats
  appStats.requestCount++
  next()
})

// Routes
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/stats', statsRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
  appStats.endpoints.health.calls++
  appStats.endpoints.health.lastCalled = new Date().toISOString()

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - appStats.startTime) / 1000),
    version: '1.0.0'
  })
})

// API Status Page (HTML)
app.get('/api-status', (req, res) => {
  const uptime = Math.floor((Date.now() - appStats.startTime) / 1000)
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = uptime % 60

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multiverse API Status</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3460 100%);
      color: #00f5ff;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 0 0 20px #00f5ff;
    }
    .subtitle {
      opacity: 0.7;
      margin-bottom: 40px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid #22c55e;
      padding: 8px 16px;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      background: #22c55e;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
    }
    .card h2 {
      font-size: 1.2em;
      margin-bottom: 16px;
      opacity: 0.9;
    }
    .endpoint {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .endpoint:last-child { border-bottom: none; }
    .method {
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      margin-right: 10px;
    }
    .method.get { background: #22c55e; color: black; }
    .method.post { background: #3b82f6; color: white; }
    .path { font-family: monospace; }
    .description { opacity: 0.6; font-size: 0.9em; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }
    .stat-item {
      text-align: center;
      padding: 16px;
      background: rgba(0, 245, 255, 0.1);
      border-radius: 8px;
    }
    .stat-value {
      font-size: 2em;
      font-weight: bold;
    }
    .stat-label {
      font-size: 0.8em;
      opacity: 0.7;
      text-transform: uppercase;
    }
    footer {
      margin-top: 40px;
      text-align: center;
      opacity: 0.5;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Multiverse API</h1>
    <p class="subtitle">Portfolio Backend Service</p>

    <div class="status-badge">
      <span class="status-dot"></span>
      <span>All Systems Operational</span>
    </div>

    <div class="card">
      <h2>System Stats</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">${hours}h ${minutes}m ${seconds}s</div>
          <div class="stat-label">Uptime</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${appStats.requestCount}</div>
          <div class="stat-label">Total Requests</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">v1.0.0</div>
          <div class="stat-label">Version</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Available Endpoints</h2>

      <div class="endpoint">
        <div>
          <span class="method get">GET</span>
          <span class="path">/api/health</span>
        </div>
        <span class="description">Health check</span>
      </div>

      <div class="endpoint">
        <div>
          <span class="method get">GET</span>
          <span class="path">/api/leaderboard</span>
        </div>
        <span class="description">Get top scores</span>
      </div>

      <div class="endpoint">
        <div>
          <span class="method post">POST</span>
          <span class="path">/api/leaderboard</span>
        </div>
        <span class="description">Submit score</span>
      </div>

      <div class="endpoint">
        <div>
          <span class="method get">GET</span>
          <span class="path">/api/stats</span>
        </div>
        <span class="description">App statistics</span>
      </div>

      <div class="endpoint">
        <div>
          <span class="method get">GET</span>
          <span class="path">/api-status</span>
        </div>
        <span class="description">This page</span>
      </div>
    </div>

    <footer>
      Multiverse Portfolio API &copy; ${new Date().getFullYear()} Rafael Matovelle
    </footer>
  </div>
</body>
</html>
  `)
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/leaderboard',
      'POST /api/leaderboard',
      'GET /api/stats',
      'GET /api-status'
    ]
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║       MULTIVERSE API SERVER               ║
╠═══════════════════════════════════════════╣
║  Status:  🟢 Running                      ║
║  Port:    ${PORT}                            ║
║  Time:    ${new Date().toLocaleTimeString()}                       ║
╠═══════════════════════════════════════════╣
║  Endpoints:                               ║
║  • GET  /api/health                       ║
║  • GET  /api/leaderboard                  ║
║  • POST /api/leaderboard                  ║
║  • GET  /api/stats                        ║
║  • GET  /api-status                       ║
╚═══════════════════════════════════════════╝
  `)
})
