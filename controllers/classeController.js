const Classe = require('../models/Classe');

exports.getAllClasses = async (req, res) => {
	try {
		const classes = await Classe.find();
		res.status(200).json(classes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getClasseById = async (req, res) => {
	try {
		const classe = await Classe.findById(req.params.id);
		if (!classe) {
			return res.status(404).json({ message: 'Classe non trouvée' });
		}
		res.status(200).json(classe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createClasse = async (req, res) => {
	const { nomClasse, nomProfesseur } = req.body;

	try {
		const nouvelleClasse = new Classe({
			nomClasse,
			nomProfesseur,
		});

		const classeEnregistree = await nouvelleClasse.save();
		res.status(201).json(classeEnregistree);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateClasse = async (req, res) => {
	try {
		const classe = await Classe.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!classe) {
			return res.status(404).json({ message: 'Classe non trouvée' });
		}
		res.status(200).json(classe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteClasse = async (req, res) => {
	try {
		const classe = await Classe.findByIdAndDelete(req.params.id);
		if (!classe) {
			return res.status(404).json({ message: 'Classe non trouvée' });
		}
		res.status(200).json({ message: 'Classe supprimée avec succès' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
