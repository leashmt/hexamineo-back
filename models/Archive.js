const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
	year: {
		type: String,
		required: true,
	},
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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Classe',
	},
	niveau: {
		type: String,
		required: true,
	},
	prof: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Professeur',
	},
	nomProf: {
		type: String,
	},
	repeatGrade: {
		type: Boolean,
		default: false,
	},
	skipGrade: {
		type: Boolean,
		default: false,
	},
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
