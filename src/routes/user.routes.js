const { Router } = require('express');
const { check } = require('express-validator');
const { emailExists, userExists } = require('../helpers/user.validator');

const { fieldValidator, 
        validateJWT, 
        loginVerifier } = require('../middlewares');

const { registerUser, 
        getUserInfo, 
        updateUser } = require('../controllers/user.controller');

const router = Router();

router.post('/users/register', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('password', 'Password must not be empty').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6}),
    check('email', 'Email must not be empty').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    fieldValidator
], registerUser);

router.get('/users/:uuid', [
    validateJWT,
    loginVerifier,
    check('uuid').custom(userExists),
    fieldValidator
], getUserInfo);

router.put('/users/update/:uuid', [
    validateJWT,
    loginVerifier,
    check('uuid').custom(userExists),
    check('name', 'Name must not be empty.').not().isEmpty(),
    fieldValidator
], updateUser);

module.exports = router;