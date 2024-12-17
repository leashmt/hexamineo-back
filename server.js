const express = require('express');
const mongoose = require('mongoose');
const eleveRoutes = require('./routes/eleveRoutes');
const professeurRoutes = require('./routes/professeurRoutes');
const classeRoutes = require('./routes/classeRoutes');
const csvRoutes = require('./routes/csvRoutes');
const cors = require('cors');

const app = express();
const PORT = 3001;
const corsOptions = {
	origin: 'http://localhost:3000', // Autoriser seulement localhost:3000
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
	.connect('mongodb://localhost:27017/hexamineo')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

app.use('/api/eleves', eleveRoutes);
app.use('/api/professeurs', professeurRoutes);
app.use('/api/classes', classeRoutes);
app.use('/api', csvRoutes);

app.get('/', (req, res) => {
	res.send('Bienvenue sur le serveur back-end Hexamineo !');
});

app.listen(PORT, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
