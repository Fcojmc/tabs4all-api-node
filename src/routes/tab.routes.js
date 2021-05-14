const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { tabExists, tabExistsById } = require('../helpers/tab.validator');

const { createTab, 
        getAllTabs, 
        getTabById,
        updateTab,
        deleteTab } = require('../controllers/tab.controller');

const router = Router();

/**
 * Rutas de los metodos de tablaturas
 */
router.get('/tabs/all', getAllTabs);

router.get('/tabs/:id', [
    check('id').custom(tabExistsById),
    fieldValidator
], getTabById);

router.post('/tabs/create', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('name').custom(tabExists),
    check('content', 'Tab content must not be empty.'),
    fieldValidator
], createTab);

router.put('/tabs/update/:id', [
    check('id').custom(tabExistsById),
    check('name', 'Name of the tab must not be empty').not().isEmpty(),
    check('content', 'Tab content must not be empty.').not().isEmpty(),
    fieldValidator
], updateTab);

router.delete('/tabs/delete/:id', [
    check('id').custom(tabExistsById),
    fieldValidator
], deleteTab);

module.exports = router;