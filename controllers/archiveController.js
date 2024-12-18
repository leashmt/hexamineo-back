const Archive = require('../models/archiveModel');

exports.addArchive = async (req, res) => {
	try {
		const newArchive = new Archive(req.body);
		const savedArchive = await newArchive.save();
		res.status(201).json(savedArchive);
	} catch (error) {
		console.error('Erreur lors de l’ajout d’une archive:', error);
		res.status(500).json({ message: 'Erreur interne du serveur' });
	}
};

exports.getAllArchives = async (req, res) => {
	try {
		const archives = await Archive.find();
		res.status(200).json(archives);
	} catch (error) {
		console.error('Erreur lors de la récupération des archives:', error);
		res.status(500).json({ message: 'Erreur interne du serveur' });
	}
};

exports.getArchivesByYear = async (req, res) => {
	try {
		const { year } = req.params;
		const archives = await Archive.find({ year });
		if (archives.length === 0) {
			return res
				.status(404)
				.json({ message: 'Aucune archive trouvée pour cette année' });
		}
		res.status(200).json(archives);
	} catch (error) {
		console.error('Erreur lors de la récupération des archives par année:', error);
		res.status(500).json({ message: 'Erreur interne du serveur' });
	}
};

exports.getArchivesByYearAndLevel = async (req, res) => {
	try {
		const { year, niveau } = req.params;
		const archives = await Archive.find({ year, niveau });
		if (archives.length === 0) {
			return res.status(404).json({
				message: 'Aucune archive trouvée pour cette année et ce niveau',
			});
		}
		res.status(200).json(archives);
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des archives par année et niveau:',
			error
		);
		res.status(500).json({ message: 'Erreur interne du serveur' });
	}
};
