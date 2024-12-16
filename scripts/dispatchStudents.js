const mongoose = require('mongoose');
const Eleve = require('../models/Eleve');

mongoose
	.connect('mongodb://localhost:27017/hexamineo')
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(err => console.error('Erreur de connexion à MongoDB :', err));
const mongoose = require('mongoose');

const getEleve = async () => {
	try {
		const eleves = await Eleve.findAll();
		return eleves;
	} catch (error) {
		console.log('Error while getting the students :', error);
	}
};

const dispatchStudents = async () => {
	try {
		const eleves = await getEleve();

		// Dispatch students to different classes

		mongoose.connection.close();
	} catch (error) {
		console.log('Error while dispatching students :', error);
		mongoose.connection.close();
	}
};

dispatchStudents();
export default dispatchStudents;
