const mongoose = require('mongoose');
const Professeur = require('../models/Professeur');

mongoose
	.connect('mongodb://localhost:27017/hexamineo')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

const professeurs = [
	{ nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com' },
	{ nom: 'Durand', prenom: 'Sophie', email: 'sophie.durand@example.com' },
	{ nom: 'Morel', prenom: 'Luc', email: 'luc.morel@example.com' },
	{ nom: 'Bernard', prenom: 'Claire', email: 'claire.bernard@example.com' },
	{ nom: 'Martin', prenom: 'Pierre', email: 'pierre.martin@example.com' },
	{ nom: 'Petit', prenom: 'Marie', email: 'marie.petit@example.com' },
	{ nom: 'Garcia', prenom: 'Ana', email: 'ana.garcia@example.com' },
	{ nom: 'Roux', prenom: 'Julien', email: 'julien.roux@example.com' },
	{ nom: 'Lemoine', prenom: 'Emma', email: 'emma.lemoine@example.com' },
	{ nom: 'Schmitt', prenom: 'Paul', email: 'paul.schmitt@example.com' },
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
