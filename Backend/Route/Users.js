const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'ton_secret'; // ⚠️ remplace par une vraie clé secrète

// Config MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// Middleware JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT id, username, password, role FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ role: user.role, token });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ message: 'Erreur serveur.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// ✅ Route protégée
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Ceci est une route protégée.',
    user: req.user
  });
});

// ✅ Liste tous les utilisateurs
router.get('/users', verifyToken, async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT id, username, role FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Erreur liste utilisateurs:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  } finally {
    if (connection) await connection.end();
  }
});

// ✅ Détail utilisateur par ID
router.get('/users/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT id, username, role FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erreur détail utilisateur:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
