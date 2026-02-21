const express = require('express');
const client = require('prom-client'); // Import the monitoring library

const app = express();
const port = 3000;

// --- PHASE 4: MONITORING CONFIGURATION ---
// This collects default metrics like CPU and Memory usage
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Add a custom counter to track how many people visit your site
const requestCounter = new client.Counter({
  name: 'node_app_requests_total',
  help: 'Total number of HTTP requests to the app',
  labelNames: ['method', 'route']
});

// --- ROUTES ---

// 1. The Metrics Endpoint (for Prometheus)
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// 2. Your Main App Page (Phase 2)
app.get('/', (req, res) => {
  // Increment the counter every time someone visits the home page
  requestCounter.inc({ method: 'GET', route: '/' });
  
  res.send(`
    <h1>DevOps Pipeline Works!</h1>
    <p>Phase 1 & 2: Jenkins + Docker (SUCCESS)</p>
    <p>Phase 4: Monitoring is now ACTIVE on /metrics</p>
  `);
});

// Start the Server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  console.log(`Metrics available at http://localhost:${port}/metrics`);
});
