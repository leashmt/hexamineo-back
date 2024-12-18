const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Professeur = require('../models/Professeur');
const Eleve = require('../models/Eleve');

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/hexamineo');
	} catch (err) {
		console.error('Erreur de connexion à MongoDB:', err);
		process.exit(1);
	}
};

let countProfesseurs = 0;
let countEleves = 0;

const processCSV = async filePath => {
	const readStream = fs.createReadStream(filePath).pipe(csv());

	// Détecter le format du CSV en inspectant les en-têtes
	let isSimpleFormat = false;
	let headers;

	for await (const row of readStream) {
		if (!headers) {
			headers = Object.keys(row);
			// Détecter si le format est simple (Nom, Prénom, Date de naissance)
			if (
				headers.includes('Nom') &&
				headers.includes('Prénom') &&
				headers.includes('Date de naissance')
			) {
				isSimpleFormat = true;
			}
		}

		// Traitement du fichier en fonction du format détecté
		try {
			const cleanedRow = Object.keys(row).reduce((acc, key) => {
				acc[key.replace(/^\ufeff/, '').trim()] = row[key];
				return acc;
			}, {});

			if (isSimpleFormat) {
				// Format simple (Nom, Prénom, Date de naissance)
				const { Nom, Prénom, 'Date de naissance': dateDeNaissance } = cleanedRow;

				// Vérifier si l'élève existe déjà
				const eleveExists = await Eleve.findOne({ nom: Nom, prenom: Prénom });

				if (eleveExists) {
					continue;
				}

				const eleve = new Eleve({
					nom: Nom,
					prenom: Prénom,
					dateDeNaissance: new Date(
						dateDeNaissance.split('/').reverse().join('-')
					), // Convertir le format de date DD/MM/YYYY en YYYY-MM-DD
					niveau: 'Non spécifié', // Ici, tu peux choisir de ne pas spécifier le niveau si non disponible
				});

				await eleve.save();
				countEleves++;
			} else {
				// Format avec niveau et professeur
				const {
					Niveau,
					'Nom Élève': nomEleve,
					'Prénom Élève': prenomEleve,
					'Date de Naissance': dateDeNaissance,
					'Nom Professeur': nomProfesseur,
				} = cleanedRow;

				const eleveExists = await Eleve.findOne({
					nom: nomEleve,
					prenom: prenomEleve,
				});

				if (eleveExists) {
					continue;
				}

				const eleve = new Eleve({
					nom: nomEleve,
					prenom: prenomEleve,
					dateDeNaissance: new Date(dateDeNaissance),
					niveau: Niveau,
				});

				let professeur = await Professeur.findOne({ nom: nomProfesseur });
				if (!professeur) {
					professeur = new Professeur({
						nom: nomProfesseur,
						email: `${nomProfesseur
							.toLowerCase()
							.replace(' ', '.')}@ecole.com`,
					});
					await professeur.save();
					countProfesseurs++;
				}

				eleve.prof = professeur._id;
				eleve.nomProf = professeur.nom;

				await eleve.save();
				countEleves++;
			}
		} catch (err) {
			console.error('Erreur lors de l’importation d’une ligne:', err);
		}
	}

	console.log('');
	console.log('Importation terminée.');
	console.log(`${countProfesseurs} professeurs ajoutés.`);
	console.log(`${countEleves} élèves ajoutés.`);
	mongoose.connection.close();
};

const importCSV = async filepath => {
	connectDB().then(() => {
		processCSV(filepath);
	});
};

// importCSV('preinscriptions_Saint_Ex.csv');
// importCSV('Effectif_2024_2025_Saint_Excopy.csv');
module.exports = { importCSV };
