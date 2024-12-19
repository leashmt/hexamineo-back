const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: false 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String,
        enum: ['ADMIN', 'MAIRIE', 'DIRECTRICE', 'PROFESSEUR'], 
        required: true 
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

