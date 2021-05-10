const {Router} = require('express');
const { registerUser, getUser } = require('../controllers/user.controller');
/**
 * Router de express
 */
const router = Router();

/**
 * Rutas de la api
 */
router.post('/users/register', registerUser);
router.get('/users/:id', getUser);


module.exports = router;