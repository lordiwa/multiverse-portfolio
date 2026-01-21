const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Track app stats in memory (resets on cold start)
const appStats = {
  startTime: Date.now(),
  requestCount: 0,
  endpoints: {
    health: { calls: 0, lastCalled: null },
    leaderboard: { calls: 0, lastCalled: null },
    stats: { calls: 0, lastCalled: null }
  }
};

// ============ HEALTH CHECK ============
exports.health = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    appStats.endpoints.health.calls++;
    appStats.endpoints.health.lastCalled = new Date().toISOString();
    appStats.requestCount++;

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - appStats.startTime) / 1000),
      version: '1.0.0'
    });
  });
});

// ============ LEADERBOARD ============
exports.leaderboard = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    appStats.endpoints.leaderboard.calls++;
    appStats.endpoints.leaderboard.lastCalled = new Date().toISOString();
    appStats.requestCount++;

    try {
      if (req.method === 'GET') {
        // Get top 10 scores
        const snapshot = await db.collection('leaderboard')
          .orderBy('score', 'desc')
          .limit(10)
          .get();

        const scores = [];
        snapshot.forEach(doc => {
          scores.push({ id: doc.id, ...doc.data() });
        });

        res.json(scores);

      } else if (req.method === 'POST') {
        // Submit new score
        const { name, score, game } = req.body;

        if (!name || score === undefined) {
          return res.status(400).json({ error: 'Name and score are required' });
        }

        const docRef = await db.collection('leaderboard').add({
          name: name.substring(0, 20), // Limit name length
          score: Number(score),
          game: game || 'tetris',
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({
          success: true,
          id: docRef.id,
          message: 'Score submitted successfully'
        });

      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
    } catch (error) {
      console.error('Leaderboard error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ============ STATS ============
exports.stats = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    appStats.endpoints.stats.calls++;
    appStats.endpoints.stats.lastCalled = new Date().toISOString();
    appStats.requestCount++;

    try {
      // Get total scores count
      const countSnapshot = await db.collection('leaderboard').count().get();
      const totalScores = countSnapshot.data().count;

      // Get highest score
      const topSnapshot = await db.collection('leaderboard')
        .orderBy('score', 'desc')
        .limit(1)
        .get();

      let highestScore = 0;
      topSnapshot.forEach(doc => {
        highestScore = doc.data().score;
      });

      res.json({
        uptime: Math.floor((Date.now() - appStats.startTime) / 1000),
        requestCount: appStats.requestCount,
        endpoints: appStats.endpoints,
        leaderboard: {
          totalScores,
          highestScore
        },
        version: '1.0.0'
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ============ SEND EMAIL ============
// Note: Requires email config to be set via:
// firebase functions:config:set email.user="your@email.com" email.pass="your-app-password"
exports.sendEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method not allowed');
    }

    try {
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: functions.config().email?.user,
          pass: functions.config().email?.pass
        }
      });

      const { email, subject, message } = req.body;

      if (!email || !subject || !message) {
        return res.status(400).json({ error: 'Email, subject, and message are required' });
      }

      const mailOptions = {
        from: functions.config().email?.user,
        to: 'srparca@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: email
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });

    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });
});

// ============ API STATUS PAGE ============
exports.apiStatus = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const uptime = Math.floor((Date.now() - appStats.startTime) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;

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
      background: linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #2d1b4e 100%);
      color: #00fff9;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 2.5em; margin-bottom: 10px; text-shadow: 0 0 20px #00fff9; }
    .subtitle { opacity: 0.7; margin-bottom: 40px; }
    .status-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0, 255, 249, 0.2); border: 1px solid #00fff9;
      padding: 8px 16px; border-radius: 20px; margin-bottom: 30px;
    }
    .status-dot {
      width: 10px; height: 10px; background: #00fff9;
      border-radius: 50%; animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .card {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 255, 249, 0.2);
      border-radius: 12px; padding: 24px; margin-bottom: 20px;
    }
    .card h2 { font-size: 1.2em; margin-bottom: 16px; color: #ff00ff; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; }
    .stat-item { text-align: center; padding: 16px; background: rgba(0, 255, 249, 0.1); border-radius: 8px; }
    .stat-value { font-size: 1.5em; font-weight: bold; }
    .stat-label { font-size: 0.8em; opacity: 0.7; }
    .endpoint { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; gap: 8px; }
    .endpoint:last-child { border-bottom: none; }
    .method { font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 10px; }
    .method.get { background: #00fff9; color: #0d0221; }
    .method.post { background: #ff00ff; color: white; }
    .path { font-family: monospace; }
    .description { opacity: 0.6; font-size: 0.9em; }
    .back-link { display: inline-block; margin-top: 30px; color: #ff00ff; text-decoration: none; border: 1px solid #ff00ff; padding: 10px 20px; border-radius: 8px; }
    .back-link:hover { background: #ff00ff; color: #0d0221; }
    footer { margin-top: 40px; text-align: center; opacity: 0.5; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Multiverse API</h1>
    <p class="subtitle">Portfolio Backend Service</p>
    <div class="status-badge"><span class="status-dot"></span><span>All Systems Operational</span></div>
    <div class="card">
      <h2>System Stats</h2>
      <div class="stats-grid">
        <div class="stat-item"><div class="stat-value">${hours}h ${minutes}m ${seconds}s</div><div class="stat-label">Uptime</div></div>
        <div class="stat-item"><div class="stat-value">${appStats.requestCount}</div><div class="stat-label">Requests</div></div>
        <div class="stat-item"><div class="stat-value">v1.0.0</div><div class="stat-label">Version</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Endpoints</h2>
      <div class="endpoint"><div><span class="method get">GET</span><span class="path">/api/health</span></div><span class="description">Health check</span></div>
      <div class="endpoint"><div><span class="method get">GET</span><span class="path">/api/leaderboard</span></div><span class="description">Get scores</span></div>
      <div class="endpoint"><div><span class="method post">POST</span><span class="path">/api/leaderboard</span></div><span class="description">Submit score</span></div>
      <div class="endpoint"><div><span class="method get">GET</span><span class="path">/api/stats</span></div><span class="description">Statistics</span></div>
    </div>
    <a href="/" class="back-link">Back to Portfolio</a>
    <footer>Multiverse Portfolio API &copy; ${new Date().getFullYear()}</footer>
  </div>
</body>
</html>
    `);
  });
});
