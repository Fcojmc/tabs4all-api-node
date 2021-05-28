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