require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateSignup, validateLogin } = require('../validators/authValidators');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; 

exports.signup = async (req, res) => {
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.login = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role },  JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
