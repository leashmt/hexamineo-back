const Professeur = require('../models/Professeur');
const { assignProfessorsToStudents } = require('../scripts/dispatchProf');

exports.getAllProfesseurs = async (req, res) => {
	try {
		const professeurs = await Professeur.find();
		res.status(200).json(professeurs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getProfesseurById = async (req, res) => {
	try {
		const professeur = await Professeur.findById(req.params.id);
		if (!professeur) {
			return res.status(404).json({ message: 'Professeur non trouvé' });
		}
		res.status(200).json(professeur);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createProfesseur = async (req, res) => {
	const { nom, prenom, email } = req.body;

	if (!nom || !prenom || !email) {
		return res.status(400).json({ message: 'Nom, prénom et email sont requis' });
	}

	try {
		const newProfesseur = new Professeur({
			nom: `${prenom} ${nom}`,
			email,
		});

		console.log(newProfesseur);

		await newProfesseur.save();
		res.status(201).json(newProfesseur);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateProfesseur = async (req, res) => {
	const { nom, prenom, email } = req.body;

	try {
		const updatedProfesseur = await Professeur.findByIdAndUpdate(
			req.params.id,
			{ nom, prenom, email },
			{ new: true }
		);

		if (!updatedProfesseur) {
			return res.status(404).json({ message: 'Professeur non trouvé' });
		}

		res.status(200).json(updatedProfesseur);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteProfesseur = async (req, res) => {
	try {
		const deletedProfesseur = await Professeur.findByIdAndDelete(req.params.id);

		if (!deletedProfesseur) {
			return res.status(404).json({ message: 'Professeur non trouvé' });
		}

		res.status(200).json({ message: 'Professeur supprimé avec succès' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateAssignments = async (req, res) => {
	try {
		const updatedAssignments = await assignProfessorsToStudents();
		res.status(200).send(updatedAssignments);
	} catch (error) {
		res.status(500).send({
			message: 'Erreur lors de la mise à jour des assignments',
			error,
		});
	}
};

exports.updateLevels = async (req, res) => {
	try {
		const updates = req.body; // Object with {niveau: "nom du professeur"}

		for (const niveau in updates) {
			const nomProfesseur = updates[niveau];

			if (!niveau || !nomProfesseur) {
				continue;
			}

			const professeur = await Professeur.findOne({ nom: nomProfesseur });
			if (!professeur) {
				console.warn(`Professeur ${nomProfesseur} introuvable`);
				continue;
			}

			professeur.niveau = niveau;
			await professeur.save();
		}

		res.status(200).json({ message: 'Niveaux mis à jour avec succès' });
	} catch (error) {
		console.error('Erreur lors de la mise à jour des niveaux :', error);
		res.status(500).json({ message: 'Erreur interne du serveur' });
	}
};
