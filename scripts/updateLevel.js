// services/levelService.js

const { LIST_LEVELS } = require('../constants');
const Eleve = require('../models/Eleve');

const promoteEleves = async () => {
	try {
		const eleves = await Eleve.find();

		for (let eleve of eleves) {
			let currentLevelIndex = LIST_LEVELS.indexOf(eleve.niveau);

			if (currentLevelIndex === -1) {
				console.error(
					`Le niveau de l'élève ${eleve.nom} ${eleve.prenom} est invalide.`
				);
				continue;
			}

			if (eleve.repeatGrade) {
				// redoublement
				continue;
			}

			if (eleve.skipGrade) {
				//saut de classe
				currentLevelIndex += 2;
				if (currentLevelIndex >= LIST_LEVELS.length - 1) {
					// saut de classe en CM1
					await Eleve.findByIdAndDelete(eleve._id);
					continue;
				}
			} else {
				// Normal
				currentLevelIndex++;
				if (currentLevelIndex >= LIST_LEVELS.length) {
					await Eleve.findByIdAndDelete(eleve._id);
					continue;
				}
			}

			const newLevel = LIST_LEVELS[currentLevelIndex];
			eleve.niveau = newLevel;
			await eleve.save();
		}
	} catch (error) {
		console.error('Erreur lors de la mise à jour des niveaux des élèves:', error);
	}
};

module.exports = { promoteEleves };
