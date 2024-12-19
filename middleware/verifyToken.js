require('dotenv').config();
const jwt = require('jsonwebtoken');
const Professeur = require('../models/Professeur');

const JWT_SECRET = process.env.JWT_SECRET ||'default_secret';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

const authorize = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).send('Accès non autorisé')
    }
    //if req.user.role !== 'PROFESSEUR' {
    //    const {className} = req.user.niveau
    //    try {
    //        const professor = await Professeur.findOne({email: req.user.email})
    //        if (!professor || professor.niveau.toString() !== className) {
    //            return res.status(403).json({message: "Accès non autorisé"})
    //        }
    //        next()
    //    )
    //    }  
    //}
    next()
}

module.exports = {authenticate, authorize};