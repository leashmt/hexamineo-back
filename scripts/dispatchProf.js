const Eleve = require('../models/Eleve');
const Professeur = require('../models/Professeur');
const mongoose = require('mongoose');
const { LEVELS_NAMES } = require('../constants');
require('dotenv').config();

mongoose
	.connect(process.env.BDD_URL)
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));

const profAssignments = {
	[LEVELS_NAMES.FIRST_SECTION]: '',
	[LEVELS_NAMES.SECOND_SECTION]: '',
	[LEVELS_NAMES.THRID_SECTION]: '',
	CP: '',
	CE1: '',
	CE2: '',
	CM1: '',
	CM2: '',
};

const updateProfAssignments = async profAssignments => {
	try {
		for (const niveau in profAssignments) {
			if (profAssignments.hasOwnProperty(niveau)) {
				const professeur = await Professeur.findOne({ niveau });
				if (professeur) {
					profAssignments[niveau] = professeur;
				} else {
					console.warn(`Aucun professeur trouvé pour le niveau ${niveau}`);
				}
			}
		}
		return profAssignments;
	} catch (error) {
		console.error('Erreur lors de la mise à jour des assignments:', error);
		throw error;
	}
};

const assignProfessorsToStudents = async () => {
	const profList = await updateProfAssignments(profAssignments);
	try {
		const eleves = await Eleve.find();

		for (let eleve of eleves) {
			const niveauEleve = eleve.niveau;

			if (niveauEleve === 'Non renseigné') {
				continue;
			}

			let professeur = profList[niveauEleve];

			if (professeur) {
				eleve.prof = professeur._id;
				eleve.nomProf = professeur.nom;
				await eleve.save();
			} else {
				console.log(
					`Aucun professeur trouvé pour le niveau ${niveauEleve} de l'élève ${eleve.nom}`
				);
			}
		}
	} catch (error) {
		console.error("Erreur lors de l'attribution des professeurs aux élèves", error);
	}
};

// assignProfessorsToStudents();
module.exports = { assignProfessorsToStudents };
