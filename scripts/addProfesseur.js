const mongoose = require('mongoose');
const Professeur = require('../models/Professeur');
require('dotenv').config();

mongoose
	.connect(process.env.BDD_URL)
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

const professeurs = [
	{ nom: 'Dupont Jean', email: 'jean.dupont@example.com' },
	{ nom: 'Durand Sophie', email: 'sophie.durand@example.com' },
	{ nom: 'Morel Luc', email: 'luc.morel@example.com' },
	{ nom: 'Bernard Claire', email: 'claire.bernard@example.com' },
	{ nom: 'Martin Pierre', email: 'pierre.martin@example.com' },
	{ nom: 'Petit Marie', email: 'marie.petit@example.com' },
	{ nom: 'Garcia Ana', email: 'ana.garcia@example.com' },
	{ nom: 'Roux Julien', email: 'julien.roux@example.com' },
	{ nom: 'Lemoine Emma', email: 'emma.lemoine@example.com' },
	{ nom: 'Schmitt Paul', email: 'paul.schmitt@example.com' },
];

Professeur.insertMany(professeurs)
	.then(() => {
		console.log('Les professeurs ont été ajoutés avec succès !');
		mongoose.connection.close();
	})
	.catch(err => {
		console.error("Erreur lors de l'ajout des professeurs :", err);
		mongoose.connection.close();
	});
