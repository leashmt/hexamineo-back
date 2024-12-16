const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
	nomClasse: {
		type: String,
		required: true,
	},
	nomProfesseur: {
		type: String,
		required: true,
	},
});

const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
