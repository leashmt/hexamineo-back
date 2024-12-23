const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const csv = require('csv-parser');
const Professeur = require('../models/Professeur');
const Eleve = require('../models/Eleve');
const addUser = require('./addUser');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.BDD_URL);
	} catch (err) {
		console.error('Erreur de connexion à MongoDB:', err);
		process.exit(1);
	}
};

let countProfesseurs = 0;
let countEleves = 0;

const processCSV = async filePath => {
	const readStream = fs.createReadStream(filePath).pipe(csv());

	let isSimpleFormat = false;
	let headers;

	for await (const row of readStream) {
		if (!headers) {
			headers = Object.keys(row);
			console.log(headers);
			if (
				headers.includes('Nom') &&
				headers.includes('Prenom') &&
				headers.includes('Date de naissance')
			) {
				isSimpleFormat = true;
			}
		}

		try {
			const cleanedRow = Object.keys(row).reduce((acc, key) => {
				acc[key.replace(/^\ufeff/, '').trim()] = row[key];
				return acc;
			}, {});

			if (isSimpleFormat) {
				const { Nom, Prenom, 'Date de naissance': dateDeNaissance } = cleanedRow;

				const eleveExists = await Eleve.findOne({ nom: Nom, prenom: Prenom });

				if (eleveExists) {
					continue;
				}

				const eleve = new Eleve({
					nom: Nom,
					prenom: Prenom,
					dateDeNaissance: new Date(
						dateDeNaissance.split('/').reverse().join('-')
					),
					niveau: 'Non renseigné',
				});

				await eleve.save();
				countEleves++;
			} else {
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

				if (nomProfesseur) {
					let professeur = await Professeur.findOne({ nom: nomProfesseur });
					if (!professeur) {
						professeur = new Professeur({
							nom: nomProfesseur,
							email: `${nomProfesseur
								.toLowerCase()
								.replace(' ', '.')}@ecole.com`,
							niveau: eleve.niveau,
						});
						await professeur.save();
						addUser(nomProfesseur, 'PROFESSEUR', "Default", eleve.niveau)
						countProfesseurs++;
					}

					eleve.prof = professeur._id;
					eleve.nomProf = professeur.nom;
				}

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
};

const importCSV = async filepath => {
	connectDB().then(() => {
		processCSV(filepath);
	});
};

module.exports = { importCSV };
