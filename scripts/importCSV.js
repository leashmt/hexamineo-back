const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Professeur = require('../models/Professeur');
const Eleve = require('../models/Eleve');

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/hexamineo');
		console.log('Connexion à MongoDB réussie');
	} catch (err) {
		console.error('Erreur de connexion à MongoDB:', err);
		process.exit(1);
	}
};

let countProfesseurs = 0;
let countEleves = 0;

const addDataFromCSV = async filePath => {
	const students = [];

	fs.createReadStream(filePath)
		.pipe(csv())
		.on('data', async row => {
			const cleanedRow = Object.keys(row).reduce((acc, key) => {
				acc[key.replace(/^\ufeff/, '').trim()] = row[key];
				return acc;
			}, {});

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
				console.log(`L'élève ${nomEleve} ${prenomEleve} existe déjà.`);
			} else {
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
					console.log(`Professeur ${nomProfesseur} ajouté.`);
				}

				eleve.prof = professeur._id;
				await eleve.save();
				countEleves++;
				console.log(`Élève ${nomEleve} ${prenomEleve} ajouté.`);
				students.push(eleve);
			}
		})
		.on('end', () => {
			console.log('Importation terminée.');
			console.log(`${countProfesseurs} professeurs ajoutés.`);
			console.log(`${countEleves} élèves ajoutés.`);
			// mongoose.connection.close();
		});
};

connectDB().then(() => {
	addDataFromCSV('./Effectif_2024_2025_Saint_Ex.csv');
});