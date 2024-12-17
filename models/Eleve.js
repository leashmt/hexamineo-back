const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	prenom: {
		type: String,
		required: true,
	},
	dateDeNaissance: {
		type: Date,
		required: true,
	},
	classe: {
		type: mongoose.Schema.Types.ObjectId, // référence à la classe
		ref: 'Classe',
	},
	niveau: {
		type: String,
		required: true,
	},
	prof: {
		type: mongoose.Schema.Types.ObjectId, // référence au professeur
		ref: 'Professeur',
	},
	nomProf: {
		type: String,
	},
	repeatingGrade: {
		type: Boolean,
		default: false,
	},
	skipGrade: {
		type: Boolean,
		default: false,
	},
});

const Eleve = mongoose.model('Eleve', eleveSchema);

module.exports = Eleve;
