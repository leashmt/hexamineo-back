const express = require('express');
const router = express.Router();
const professeurController = require('../controllers/professeurController');

// Route pour récupérer tous les professeurs
router.get('/', professeurController.getAllProfesseurs);

// Route pour mettre à jour les assignments
router.put('/assign', professeurController.updateAssignments);

// Route pour récupérer un professeur par ID
router.get('/:id', professeurController.getProfesseurById);

//Route pour mettre à jour les niveaux des profs
router.put('/update-levels', professeurController.updateLevels);

// Route pour ajouter un nouveau professeur
router.post('/', professeurController.createProfesseur);

// Route pour mettre à jour un professeur
router.put('/:id', professeurController.updateProfesseur);

// Route pour supprimer un professeur
router.delete('/:id', professeurController.deleteProfesseur);

module.exports = router;
