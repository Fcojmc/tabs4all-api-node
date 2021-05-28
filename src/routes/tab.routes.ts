import Router from 'express';
import { check } from 'express-validator';
import fieldValidator from '../middlewares/field-validator';
import { tabExists, tabExistsByUuid } from '../helpers/tab.validator';
import { createTab, 
         deleteTab,
         getAllTabs,
         getTabById,
         updateTab } from '../controllers/tab.controller';
import validateJWT from '../middlewares/jwt-validator';
import loginVerifier from '../middlewares/login-verifier';

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


export default router;