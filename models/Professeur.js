const mongoose = require('mongoose');

const professeurSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
	},
	niveau: {
		type: String,
		default: 'Non renseigné',
	},
});

const Professeur = mongoose.model('Professeur', professeurSchema);

module.exports = Professeur;
