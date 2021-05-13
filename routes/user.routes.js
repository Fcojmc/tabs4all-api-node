const { Router } = require('express');
const { registerUser, getUserInfo, updateUser } = require('../controllers/user.controller');

/**
 * Router de express
 */
const router = Router();

/**
 * Rutas de los metodos de usuario
 */
router.post('/users/register', registerUser);
router.get('/users/:id', getUserInfo);
router.put('/users/update/:id', updateUser);

module.exports = router;