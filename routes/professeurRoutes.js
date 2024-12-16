const express = require('express');
const router = express.Router();
const professeurController = require('../controllers/professeurController');

// Route pour récupérer tous les professeurs
router.get('/', professeurController.getAllProfesseurs);

// Route pour récupérer un professeur par ID
router.get('/:id', professeurController.getProfesseurById);

// Route pour ajouter un nouveau professeur
router.post('/', professeurController.createProfesseur);

// Route pour mettre à jour un professeur
router.put('/:id', professeurController.updateProfesseur);

// Route pour supprimer un professeur
router.delete('/:id', professeurController.deleteProfesseur);

module.exports = router;
