const User = require("../models/User");
const { validateSignup } = require("../validators/authValidators");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
};

exports.addUser = async (req, res) => {
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role, niveau } = req.body;
    try {
        let userEmail = email;
        if (!email || email === "Default") {
            userEmail = `${name.toLowerCase().replace(' ', '.')}@ecole.com`;
        }

        const existingUser = await User.findOne({ email: userEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password || "Saint-Exupery", 10);
        const newUser = new User({
            name,
            email: userEmail,
            password: hashedPassword,
            role,
            niveau: niveau || "Default"
        });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
  }
};
