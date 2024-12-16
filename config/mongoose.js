const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/hexamineo';

const connectDB = () => {
	mongoose
		.connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
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
