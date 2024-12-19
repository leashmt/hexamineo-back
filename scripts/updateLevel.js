const { LIST_LEVELS } = require('../constants');
const { LEVELS_BY_AGE } = require('../constants');
const Eleve = require('../models/Eleve');

const getAgeNextSeptember = date => {
	const today = new Date();
	const birthday = new Date(date);

	const nextSeptember = new Date(today.getFullYear(), 9, 1);

	if (today > nextSeptember) {
		nextSeptember.setFullYear(nextSeptember.getFullYear() + 1);
	}

	let age = nextSeptember.getFullYear() - birthday.getFullYear();

	if (
		birthday.getMonth() > nextSeptember.getMonth() ||
		(birthday.getMonth() === nextSeptember.getMonth() &&
			birthday.getDate() > nextSeptember.getDate())
	) {
		age--;
	}

	return age;
};

const promoteEleves = async () => {
	try {
		const eleves = await Eleve.find();

		for (let eleve of eleves) {
			let currentLevelIndex = LIST_LEVELS.indexOf(eleve.niveau);
			let currentLevel = eleve.niveau;

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
				currentLevel = LIST_LEVELS[currentLevelIndex];
			} else {
				// Normal
				const age = getAgeNextSeptember(eleve.dateDeNaissance);
				if (age > 10) {
					await Eleve.findByIdAndDelete(eleve._id);
					continue;
				}
				currentLevelIndex++;
				if (currentLevelIndex >= LIST_LEVELS.length) {
					await Eleve.findByIdAndDelete(eleve._id);
					continue;
				}
				currentLevel = LEVELS_BY_AGE[age];
			}

			eleve.niveau = currentLevel;
			eleve.nomProf = '';
			await eleve.save();
		}
	} catch (error) {
		console.error('Erreur lors de la mise à jour des niveaux des élèves:', error);
	}
};

module.exports = { promoteEleves };
