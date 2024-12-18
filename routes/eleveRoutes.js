const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

// Route pour récupérer tous les élèves
router.get('/', eleveController.getAllEleves);

// Route pour sauter une classe
router.put('/:id/skip-grade', eleveController.skipGrade);

// Route pour redoubler une classe
router.put('/:id/repeat-grade', eleveController.repeatGrade);

// Route pour réinitialiser le grade
router.put('/:id/reset-grade', eleveController.resetGrade);

// Route pour récupérer un élève par ID
router.get('/:id', eleveController.getEleveById);

// Route pour récupérer tous les élèves d'un niveau spécifique
router.get('/niveau/:niveau', eleveController.getElevesByNiveau);

// Route pour récupérer tous les élèves sans niveau
router.get('/without-niveau', eleveController.getElevesWithoutNiveau);

// Route pour ajouter un nouvel élève
router.post('/', eleveController.createEleve);

// Route pour mettre à jour un élève
router.put('/:id', eleveController.updateEleve);

// Route pour supprimer un élève
router.delete('/:id', eleveController.deleteEleve);

module.exports = router;
