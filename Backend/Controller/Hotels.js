const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

// Config MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// Config multer pour upload d'images dans ./uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // assure-toi que ce dossier existe
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route pour récupérer tous les hôtels
router.get('/', async (req, res) => {
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

// Route pour ajouter un hôtel (avec upload d'images)
router.post('/', upload.array('images', 5), async (req, res) => {
  const { name, price, discount } = req.body;
  const images = req.files;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Préparer les noms des fichiers uploadés pour les stocker (par ex. séparés par virgule)
    const imagesNames = images.map(file => file.filename).join(',');

    // Insérer dans la table hotels
    const [result] = await connection.execute(
      'INSERT INTO hotels (name, price, discount, images, reservable) VALUES (?, ?, ?, ?)',
      [name, price, discount || 0, imagesNames]
    );

    res.status(201).json({ message: 'Hôtel ajouté', hotelId: result.insertId });
  } catch (err) {
    console.error('Erreur ajout hôtel:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
