const { Router } = require('express');
const { createTab, getAllTabs} = require('../controllers/tab.controller');

const router = Router();

/**
 * Rutas de los metodos de tablaturas
 */
router.get('/tabs/all', getAllTabs);
router.post('/tabs/create', createTab);

module.exports = router;