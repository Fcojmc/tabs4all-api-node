const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { emailExists, userExistsById } = require('../helpers/user.validator');
const { registerUser, getUserInfo, updateUser } = require('../controllers/user.controller');

/**
 * Router de express
 */
const router = Router();

/**
 * Rutas de los metodos de usuario
 */
router.post('/users/register', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('password', 'Password must not be empty').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6}),
    check('email', 'Email must not be empty').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    fieldValidator
], registerUser);

router.get('/users/:id', [
    check('id').custom(userExistsById),
    fieldValidator
], getUserInfo);

router.put('/users/update/:id', [
    check('id').custom(userExistsById),
    check('name', 'Name must not be empty.').not().isEmpty(),
    fieldValidator
], updateUser);

module.exports = router;