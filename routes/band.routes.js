const { Router } = require('express');
const { createBand, updateBand, deleteBand } = require('../controllers/band.controller');

/**
 * Router de express
 */
 const router = Router();

 /**
 * Rutas de los metodos de grupos
 */
router.post('/bands/create', createBand);
router.put('/bands/update/:id', updateBand);
router.delete('/users/delete/:id', deleteBand);

module.exports = router;