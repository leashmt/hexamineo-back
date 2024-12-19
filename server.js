const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const eleveRoutes = require('./routes/eleveRoutes');
const professeurRoutes = require('./routes/professeurRoutes');
const classeRoutes = require('./routes/classeRoutes');
const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const {authenticate, authorize} = require('./middleware/verifyToken');

const app = express();
const PORT = 3001;
const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
	.connect('mongodb+srv://lhurtaud:QAgcyB6jMkqmFdkpHtUMWJt3RCY7H5@rosettadb.elkcmkt.mongodb.net/hexamineo?retryWrites=true&w=majority&appName=rosettadb')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

app.use('/api/auth', authRoutes)
app.use('/api/eleves', authenticate, authorize(['ADMIN', 'MAIRIE']), eleveRoutes);
app.use('/api/professeurs', authenticate, authorize(['ADMIN', 'MAIRIE']), professeurRoutes);
app.use('/api/classes', authenticate, authorize(['ADMIN', 'DIRECTRICE']), classeRoutes);
app.use('/api', authenticate, authorize(['ADMIN, MAIRIE']), csvRoutes);

app.get('/', (req, res) => {
	res.send('Bienvenue sur le serveur back-end Hexamineo !');
});

app.listen(PORT, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
