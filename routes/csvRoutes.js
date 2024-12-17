// routes/csvRoutes.js
const express = require('express');
const multer = require('multer');
const { importCSVHandler } = require('../controllers/csvController');

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

// Route pour l'importation du fichier CSV
router.post('/import-csv', upload.single('csvFile'), importCSVHandler);

module.exports = router;
