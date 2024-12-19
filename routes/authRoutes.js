const express = require('express')
const {signup, login, changePassword} = require('../controllers/authController')
const { authenticate } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post("/changePassword", authenticate, changePassword)

module.exports = router