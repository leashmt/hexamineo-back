// controllers/csvController.js
const { importCSV } = require('../scripts/importCSV');

const importCSVHandler = async (req, res) => {
	if (!req.file) {
		return res.status(400).send('Aucun fichier téléchargé');
	}

	try {
		await importCSV(req.file.path);
		res.status(200).send('Fichier CSV importé et traité avec succès');
	} catch (err) {
		console.error(err);
		res.status(500).send('Erreur lors du traitement du fichier CSV');
	}
};

module.exports = { importCSVHandler };
