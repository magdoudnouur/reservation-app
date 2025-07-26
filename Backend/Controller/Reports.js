const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb',
};

// ➕ Créer un rapport
exports.createReport = async (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ message: 'user_id et message requis.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      'INSERT INTO reports (user_id, message) VALUES (?, ?)',
      [user_id, message]
    );

    res.status(201).json({ message: 'Rapport créé', reportId: result.insertId });
  } catch (err) {
    console.error('Erreur ajout rapport :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
};

// 📋 Lire tous les rapports
exports.getAllReports = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `SELECT r.id, r.message, r.created_at, u.username
       FROM reports r
       JOIN users u ON r.user_id = u.id
       ORDER BY r.id DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error('Erreur récupération rapports :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    if (connection) await connection.end();
  }
};
