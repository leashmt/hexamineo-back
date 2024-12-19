const yup = require('yup');

const signupSchema = yup.object({
    name: yup.string().required('Le nom est requis'),
    email: yup.string().email().required('Email est requis'),
    password: yup.string().min(10, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe est requis'),
});

const loginSchema = yup.object({
    email: yup.string().email().required('Email est requis'),
    password: yup.string().required('Mot de passe est requis'),
});

exports.validateSignup = (data) => signupSchema.validate(data, { abortEarly: false });
exports.validateLogin = (data) => loginSchema.validate(data, { abortEarly: false });
