import Router from 'express';
import { check } from 'express-validator';
import fieldValidator from '../middlewares/field-validator';
import { tabExists, tabExistsByUuid } from '../helpers/tab.validator';
import { createTab, 
         deleteTab,
         getAllTabs,
         getTabById,
         updateTab } from '../controllers/tab.controller';

const router = Router();

router.get('/tabs/all', getAllTabs);

router.get('/tabs/:uuid', [
    check('uuid').custom(tabExistsByUuid),
    fieldValidator
], getTabById);

router.post('/tabs/create', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('name').custom(tabExists),
    check('content', 'Tab content must not be empty.'),
    fieldValidator
], createTab);

router.put('/tabs/update/:uuid', [
    check('uuid').custom(tabExistsByUuid),
    fieldValidator
], updateTab);

router.delete('/tabs/delete/:uuid', [
    check('uuid').custom(tabExistsByUuid),
    fieldValidator
], deleteTab);

export default router;