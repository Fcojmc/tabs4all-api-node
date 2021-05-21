const { Router } = require('express');
const { check } = require('express-validator');
const { tabExists, tabExistsByUuid } = require('../helpers/tab.validator');

const { createTab, 
        getAllTabs, 
        getTabById, 
        updateTab, 
        deleteTab } = require('../controllers/tab.controller');

const { fieldValidator, 
        validateJWT, 
        loginVerifier } = require('../middlewares');

const router = Router();

router.get('/tabs/all', [
    validateJWT,
    loginVerifier
], getAllTabs);

router.get('/tabs/:uuid', [
    validateJWT,
    loginVerifier,
    check('uuid').custom(tabExistsByUuid),
    fieldValidator
], getTabById);

router.post('/tabs/create', [
    validateJWT,
    loginVerifier,
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('name').custom(tabExists),
    check('content', 'Tab content must not be empty.'),
    fieldValidator
], createTab);

router.put('/tabs/update/:uuid', [
    validateJWT,
    loginVerifier,
    check('uuid').custom(tabExistsByUuid),
    check('name', 'Name of the tab must not be empty').not().isEmpty(),
    check('content', 'Tab content must not be empty.').not().isEmpty(),
    fieldValidator
], updateTab);

router.delete('/tabs/delete/:uuid', [
    validateJWT,
    loginVerifier,
    check('uuid').custom(tabExistsByUuid),
    fieldValidator
], deleteTab);

module.exports = router;