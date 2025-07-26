const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const SECRET = 'ton_secret'; // Utilisez la même clé secrète que pour les utilisateurs

// Configuration MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// Middleware JWT pour vérifier le token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET /api/reports - liste des rapports (protégé)
router.get('/', verifyToken, async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    console.error('Erreur récupération rapports:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
});

// POST /api/reports - ajouter un rapport (protégé)
router.post('/', verifyToken, async (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ message: 'user_id et message sont obligatoires.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'INSERT INTO reports (user_id, message) VALUES (?, ?)',
      [user_id, message]
    );
    res.status(201).json({ message: 'Rapport ajouté avec succès.' });
  } catch (err) {
    console.error('Erreur ajout rapport:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
