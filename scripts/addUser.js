const User = require("../models/User");
const bcrypt = require('bcrypt');

const addUser = async(name, role, email="Default", niveau="Default") => {
    let userEmail = ""

    if (email === "Default") {
        userEmail = `${name.toLowerCase().replace(' ', '.')}@ecole.com`
    } else {
        userEmail = email
    }

    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
        return
    }
    const hashedPassword = await bcrypt.hash("Saint-Exupery", 10);
    user = new User({
        name: name,
        email: userEmail,
        password: hashedPassword,
        role: role,
        niveau: niveau
    });
    await user.save()
}

module.exports = addUser
