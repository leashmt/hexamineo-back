const mongoose = require('mongoose');
const Eleve = require('../models/Eleve');
const { LEVELS_BY_AGE } = require('../constants');

mongoose
	.connect('mongodb://localhost:27017/hexamineo')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

const getAge = date => {
	const today = new Date();
	const birthday = new Date(date);
	const age = today.getFullYear() - birthday.getFullYear();
	const m = today.getMonth() - birthday.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}
	return age;
};

const dispatchStudents = async () => {
	let count = 0;
	try {
		const eleves = await Eleve.find({ niveau: 'Non renseigné' });

		for (const eleve of eleves) {
			const age = getAge(eleve.dateDeNaissance);
			if (age > 10) {
				continue; // TODO: supprimer les élèves plus de 10 ans
				// const deleteEleve = await Eleve.findByIdAndDelete(eleve._id);
				// console.log('Élève supprimé :', deleteEleve);
			}
			const classe = LEVELS_BY_AGE[age];

			eleve.niveau = classe;
			console.log(eleve.nom, eleve.prenom, eleve.niveau);
			await eleve.save();
			count++;
		}

		console.log('Nombre d’élèves affectés :', count);
		mongoose.connection.close();
	} catch (error) {
		console.log('Error while dispatching students :', error);
		mongoose.connection.close();
	}
};

// dispatchStudents();
module.exports = dispatchStudents;
