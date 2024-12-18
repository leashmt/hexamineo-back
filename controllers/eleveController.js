const Eleve = require('../models/Eleve');
const { promoteEleves } = require('../scripts/updateLevel');

exports.getAllEleves = async (req, res) => {
	try {
		const eleves = await Eleve.find();
		res.status(200).json(eleves);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getEleveById = async (req, res) => {
	try {
		const eleve = await Eleve.findById(req.params.id);
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json(eleve);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createEleve = async (req, res) => {
	const { nom, prenom, dateDeNaissance, classe, niveau, prof } = req.body;
	const newEleve = new Eleve({
		nom,
		prenom,
		dateDeNaissance,
		classe,
		niveau: niveau || 'Non spécifié',
		prof,
	});

	try {
		const eleve = await newEleve.save();
		res.status(201).json(eleve);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateEleve = async (req, res) => {
	try {
		const eleve = await Eleve.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json(eleve);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteEleve = async (req, res) => {
	try {
		const eleve = await Eleve.findByIdAndDelete(req.params.id);
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json({ message: 'Élève supprimé avec succès' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.skipGrade = async (req, res) => {
	try {
		const eleve = await Eleve.findByIdAndUpdate(req.params.id, {
			skipGrade: true,
		});
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json({ message: 'Élève saute une classe' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.repeatGrade = async (req, res) => {
	try {
		const eleve = await Eleve.findByIdAndUpdate(req.params.id, {
			repeatGrade: true,
		});
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json({ message: 'Élève redoublement une classe' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.resetGrade = async (req, res) => {
	try {
		const eleve = await Eleve.findByIdAndUpdate(req.params.id, {
			repeatGrade: false,
			skipGrade: false,
		});
		if (!eleve) return res.status(404).json({ message: 'Élève non trouvé' });
		res.status(200).json({ message: 'Élève réinitialisé' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.promoteEleves = async (req, res) => {
	try {
		await promoteEleves();
		res.status(200).json({ message: 'Les élèves ont été promus avec succès.' });
	} catch (error) {
		res.status(500).json({
			message: 'Erreur lors de la promotion des élèves',
			error: error.message,
		});
	}
};
