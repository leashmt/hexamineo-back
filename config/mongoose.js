const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://lhurtaud:E^)eZaxnhV*sZ9kc%zt;@rosettadb.elkcmkt.mongodb.net/hexamineo?retryWrites=true&w=majority&appName=rosettadb';

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
