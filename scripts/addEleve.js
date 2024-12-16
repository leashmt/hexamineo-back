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
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Martin',
		prenom: 'Lucas',
		dateDeNaissance: '2018-06-05',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Bernard',
		prenom: 'Emma',
		dateDeNaissance: '2017-09-08',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Petit',
		prenom: 'Noah',
		dateDeNaissance: '2019-02-14',
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Robert',
		prenom: 'Chloé',
		dateDeNaissance: '2018-11-22',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Richard',
		prenom: 'Liam',
		dateDeNaissance: '2017-07-30',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Durand',
		prenom: 'Jade',
		dateDeNaissance: '2018-01-18',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Moreau',
		prenom: 'Ethan',
		dateDeNaissance: '2017-12-11',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Fournier',
		prenom: 'Mia',
		dateDeNaissance: '2019-06-25',
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Girard',
		prenom: 'Lucas',
		dateDeNaissance: '2018-09-15',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Lemoine',
		prenom: 'Louise',
		dateDeNaissance: '2017-10-05',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Simon',
		prenom: 'Nathan',
		dateDeNaissance: '2019-04-21',
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Michel',
		prenom: 'Zoé',
		dateDeNaissance: '2018-08-30',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Roux',
		prenom: 'Adam',
		dateDeNaissance: '2017-03-07',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Blanc',
		prenom: 'Léna',
		dateDeNaissance: '2019-05-12',
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Chevalier',
		prenom: 'Tom',
		dateDeNaissance: '2018-04-19',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Lopez',
		prenom: 'Alice',
		dateDeNaissance: '2017-06-16',
		niveau: '3ème section maternelle',
	},
	{
		nom: 'Muller',
		prenom: 'Gabriel',
		dateDeNaissance: '2019-09-10',
		niveau: '1ère section maternelle',
	},
	{
		nom: 'Garnier',
		prenom: 'Lola',
		dateDeNaissance: '2018-07-13',
		niveau: '2ème section maternelle',
	},
	{
		nom: 'Perrin',
		prenom: 'Hugo',
		dateDeNaissance: '2017-11-26',
		niveau: '3ème section maternelle',
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
