const { signup, login , Language} = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const  ensureAuthenticated  = require('../Middlewares/Auth');
const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/language',ensureAuthenticated, Language);

module.exports = router;