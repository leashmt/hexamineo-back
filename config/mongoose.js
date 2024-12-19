const mongoose = require('mongoose');
require('dotenv').config();


const dbUri = process.env.BDD_URL

const connectDB = () => {
	mongoose
		.connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			family: 4
		})
		.then(() => {
			console.log('Connexion à MongoDB réussie !');
		})
		.catch(error => {
			console.error('Erreur de connexion à MongoDB:', error);
			process.exit(1);
		});
};

module.exports = connectDB;
