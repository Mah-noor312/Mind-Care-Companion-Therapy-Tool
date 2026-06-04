require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const sql = require('mssql');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server Config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Database connection pool
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Test Route
app.get('/api/test', authenticate, async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query('SELECT 1 AS test');
    res.json({ 
      message: 'SQL Server connection successful', 
      data: result.recordset,
      user: req.user.email 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`SQL Server: ${process.env.DB_SERVER}`);
  console.log(`Database: ${process.env.DB_NAME}`);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await pool.close();
  process.exit();
});