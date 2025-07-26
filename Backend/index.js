const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Autoriser le frontend React (port 3000) à accéder au backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Permet de lire le JSON envoyé depuis le frontend
app.use(express.json());

// Pour servir les images uploadées depuis le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importer les routes
const usersRouter = require('./Route/Users');
const hotelsRouter = require('./Route/Hotels');
const reportsRouter = require('./Route/Reports'); // Importer le routeur des rapports

app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/reports', reportsRouter); // Utiliser le routeur des rapports

// Route test simple
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Lancer le serveur backend sur le port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
  console.log('📝 Routes disponibles:');
  console.log('  - POST /api/users/login');
  console.log('  - GET /api/users/protected');
  console.log('  - GET /api/users/users');
  console.log('  - GET /api/users/users/:id');
  console.log('  - GET /api/hotels');
  console.log('  - POST /api/hotels');
  console.log('  - GET /api/reports'); // Ajoutez cette ligne
  console.log('  - POST /api/reports'); // Ajoutez cette ligne
  console.log('  - GET /api/test');
});
