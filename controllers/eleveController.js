const Eleve = require('../models/Eleve');

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
	console.log('posttttttt');
	const { nom, prenom, dateDeNaissance, classe, niveau, prof } = req.body;
	console.log('2');
	const newEleve = new Eleve({
		nom,
		prenom,
		dateDeNaissance,
		classe,
		niveau: niveau || 'Non spécifié',
		prof,
	});

	console.log(newEleve);

	try {
		const eleve = await newEleve.save();
		console.log(eleve);
		console.log('saved');
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
