const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');

// Route pour récupérer toutes les archives
router.get('/', archiveController.getAllArchives);

// Route pour ajouter une archive
router.post('/', archiveController.addArchive);

// Route pour ajouter tous les élèves à une archive
router.post('/:year/all', archiveController.addAllElevesToArchive);

// Route pour récupérer les archives d’une année spécifique
router.get('/:year', archiveController.getArchivesByYear);

// Route pour récupérer les archives d’une année et d’un niveau spécifique
router.get('/:year/level/:niveau', archiveController.getArchivesByYearAndLevel);

module.exports = router;
