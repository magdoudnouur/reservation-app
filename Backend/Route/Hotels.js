const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET = 'ton_secret'; // même clé que pour users

// Config MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// Middleware JWT (idem users)
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

// Config multer upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET /api/hotels - liste hôtels (protégé)
router.get('/', verifyToken, async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM hotels');
    res.json(rows);
  } catch (err) {
    console.error('Erreur récupération hôtels:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
});

// POST /api/hotels - ajouter hôtel avec images (protégé)
router.post('/', verifyToken, upload.array('images', 5), async (req, res) => {
  const { name, price, discount } = req.body;
  const images = req.files || []; // Fix : req.files peut être undefined

  if (!name || !price) {
    return res.status(400).json({ message: 'Nom et prix obligatoires.' });
  }

  const priceFloat = parseFloat(price);
  const discountInt = discount ? parseInt(discount) : 0;

  const imagesNames = images.length > 0
    ? images.map(file => file.filename).join(',')
    : '';

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      'INSERT INTO hotels (name, price, discount, images, reservable) VALUES (?, ?, ?, ?)',
      [name, priceFloat, discountInt, imagesNames]
    );

    res.status(201).json({ message: 'Hôtel ajouté avec succès.' });
  } catch (err) {
    console.error('Erreur ajout hôtel:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
