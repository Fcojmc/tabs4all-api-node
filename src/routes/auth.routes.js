const { Router } = require('express');
const { check } = require('express-validator');
const { login, authCheck, adminCheck } = require('../controllers/auth.controller');
const { loginVerifier, validateJWT, isAdminRole } = require('../middlewares');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

/**
 * Ruta para login
 */
router.post('/auth/login', [
    check('email', 'Email is mandatory.').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldValidator
], login);

router.get('/auth/check', [
    validateJWT,
    loginVerifier
], authCheck);

router.get('/auth/admin-check', [
    validateJWT,
    loginVerifier
], adminCheck);
module.exports = router;