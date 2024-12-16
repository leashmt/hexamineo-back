const express = require('express');
const app = express();
const PORT = 3001;

// Route par défaut
app.get('/', (req, res) => {
	res.send('Bienvenue sur le serveur back-end Hexamineo !');
});

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
