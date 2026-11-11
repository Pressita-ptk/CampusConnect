const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { answerStudentQuery, KNOWLEDGE_BASE } = require('./geminiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes

/**
 * Health check & configuration status
 */
app.get('/api/health', (req, res) => {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  res.json({
    status: 'healthy',
    app: 'CAMPUS CONNECT - AI Helpdesk Portal',
    university: 'Presidency University',
    department: 'School of Computer Science & Engineering',
    hasApiKey: hasEnvKey,
    activeModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    knowledgeBaseCategories: Object.keys(KNOWLEDGE_BASE).length,
    timestamp: new Date().toISOString()
  });
});

/**
 * Get all 8 official knowledge base categories
 */
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    total: Object.keys(KNOWLEDGE_BASE).length,
    categories: Object.values(KNOWLEDGE_BASE)
  });
});

/**
 * Main AI Query endpoint
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { query, history, apiKey } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid question or query.'
      });
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Query length exceeds the 500 character limit.'
      });
    }

    const result = await answerStudentQuery(trimmedQuery, history, apiKey);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('[API Chat Error]', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request.',
      details: error.message
    });
  }
});

/**
 * Endpoint to test an API key interactively
 */
app.post('/api/verify-key', async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || apiKey.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Invalid API key format.' });
  }

  try {
    const testResult = await answerStudentQuery(
      'Whom should I contact for academic problems?',
      [],
      apiKey.trim()
    );
    if (testResult.provider === 'gemini-api') {
      return res.json({ success: true, message: 'Gemini API Key verified successfully!', model: testResult.model });
    } else {
      return res.status(400).json({ success: false, message: testResult.fallbackReason || 'Verification failed.' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// Serve frontend build if available (production mode)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[Static] Serving frontend from ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 CAMPUS CONNECT Server running on port ${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`💡 Gemini Key configured: ${!!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)}`);
    console.log(`====================================================`);
  });
}

module.exports = app;

