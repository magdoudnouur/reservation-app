// Import
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Config MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// Clé secrète JWT
const SECRET = 'YOUR_SECRET_KEY';

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format: Bearer <token>

  if (!token) {
    return res.sendStatus(401); // Pas de token → 401 Unauthorized
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide → 403 Forbidden
    req.user = user; // On stocke l'user décodé
    next();
  });
}

// ==========================================
// ✅ ROUTE DE LOGIN
// ==========================================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentative de login:', { username, password });

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // On cherche l'utilisateur
    const [rows] = await connection.execute(
      'SELECT id, username, password, role FROM users WHERE username = ?',
      [username]
    );

    console.log('User rows:', rows);

    if (rows.length === 0) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = rows[0];
    console.log('Hash en DB:', user.password);

    // ⚠️ Ici compare le mot de passe en clair avec le hash stocké
    const match = await bcrypt.compare(password, user.password);
    console.log('Mot de passe correct ?', match);

    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Si le mot de passe est bon → on génère un token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ role: user.role, token }); // ✅ Réponse OK
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// ==========================================
// ✅ ROUTE PROTÉGÉE
// ==========================================
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Ceci est une route protégée.',
    user: req.user
  });
});

// Export
module.exports = router;
