const mongoose = require('mongoose');
const Eleve = require('../models/Eleve');

mongoose
	.connect('mongodb://localhost:27017/hexamineo')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

const eleves = [
	{
		nom: 'Durand',
		prenom: 'Sophie',
		dateDeNaissance: '2018-03-12',
	},
	{
		nom: 'Martin',
		prenom: 'Lucas',
		dateDeNaissance: '2017-06-05',
	},
	{
		nom: 'Bernard',
		prenom: 'Emma',
		dateDeNaissance: '2016-09-08',
	},
	{
		nom: 'Petit',
		prenom: 'Noah',
		dateDeNaissance: '2019-02-14',
	},
	{
		nom: 'Robert',
		prenom: 'Chloé',
		dateDeNaissance: '2018-11-22',
	},
	{
		nom: 'Richard',
		prenom: 'Liam',
		dateDeNaissance: '2017-07-30',
	},
	{
		nom: 'Durand',
		prenom: 'Jade',
		dateDeNaissance: '2018-01-18',
	},
	{
		nom: 'Moreau',
		prenom: 'Ethan',
		dateDeNaissance: '2017-12-11',
	},
	{
		nom: 'Fournier',
		prenom: 'Mia',
		dateDeNaissance: '2019-06-25',
	},
	{
		nom: 'Girard',
		prenom: 'Lucas',
		dateDeNaissance: '2018-09-15',
	},
	{
		nom: 'Lemoine',
		prenom: 'Louise',
		dateDeNaissance: '2017-10-05',
	},
	{
		nom: 'Simon',
		prenom: 'Nathan',
		dateDeNaissance: '2019-04-21',
	},
	{
		nom: 'Michel',
		prenom: 'Zoé',
		dateDeNaissance: '2018-08-30',
	},
	{
		nom: 'Roux',
		prenom: 'Adam',
		dateDeNaissance: '2017-03-07',
	},
	{
		nom: 'Blanc',
		prenom: 'Léna',
		dateDeNaissance: '2019-05-12',
	},
	{
		nom: 'Chevalier',
		prenom: 'Tom',
		dateDeNaissance: '2018-04-19',
	},
	{
		nom: 'Lopez',
		prenom: 'Alice',
		dateDeNaissance: '2017-06-16',
	},
	{
		nom: 'Muller',
		prenom: 'Gabriel',
		dateDeNaissance: '2019-09-10',
	},
	{
		nom: 'Garnier',
		prenom: 'Lola',
		dateDeNaissance: '2018-07-13',
	},
	{
		nom: 'Perrin',
		prenom: 'Hugo',
		dateDeNaissance: '2017-11-26',
	},
	{
		nom: 'Jacques',
		prenom: 'Paul',
		dateDeNaissance: '2011-10-01',
	},
	{
		nom: 'Lemoine',
		prenom: 'Théo',
		dateDeNaissance: '2007-03-23',
	},
	{
		nom: 'Simon',
		prenom: 'Léo',
		dateDeNaissance: '2004-05-14',
	},
	{
		nom: 'Dubois',
		prenom: 'Julien',
		dateDeNaissance: '2009-11-17',
	},
	{
		nom: 'Thompson',
		prenom: 'Alicia',
		dateDeNaissance: '2010-07-30',
	},
];

const addEleves = async () => {
	try {
		await Eleve.insertMany(eleves);
		console.log('Les élèves ont été ajoutés avec succès !');
		mongoose.connection.close();
	} catch (error) {
		console.error("Erreur lors de l'ajout des élèves :", error);
		mongoose.connection.close();
	}
};

addEleves();
